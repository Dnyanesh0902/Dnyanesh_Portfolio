package services

import (
	"crypto/rand"
	"errors"
	"io"
	"net/smtp"
	"os"
	"time"
	"portfolio-backend/dtos"
	"portfolio-backend/models"
	"portfolio-backend/repositories"

	"github.com/golang-jwt/jwt/v5"
	"github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
)

var JwtKey = []byte("dnyanesh_portfolio_secure_secret_key_12345")

type Claims struct {
	UserID uint `json:"userId"`
	jwt.RegisteredClaims
}

type AuthService interface {
	Login(req dtos.LoginRequest) (*dtos.LoginResponse, error)
	RegisterUser(req dtos.RegisterUserDTO) error
	RequestPasswordResetOTP(req dtos.RequestResetOTPDTO) error
	VerifyOTPAndResetPassword(req dtos.VerifyOTPAndResetDTO) error
}

type authService struct {
	userRepo  repositories.UserRepository
	resetRepo repositories.PasswordResetRepository
}

func NewAuthService(userRepo repositories.UserRepository, resetRepo repositories.PasswordResetRepository) AuthService {
	return &authService{
		userRepo:  userRepo,
		resetRepo: resetRepo,
	}
}

func (s *authService) Login(req dtos.LoginRequest) (*dtos.LoginResponse, error) {
	user, err := s.userRepo.FindByEmailOrMobile(req.Identifier)
	if err != nil {
		return nil, errors.New("invalid identifier (email/mobile) or password")
	}

	// Compare bcrypt hashed password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		return nil, errors.New("invalid identifier (email/mobile) or password")
	}

	// Generate JWT claims
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		UserID: user.ID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(JwtKey)
	if err != nil {
		return nil, err
	}

	resp := &dtos.LoginResponse{
		Token: tokenString,
		User: struct {
			ID           uint   `json:"id"`
			Email        string `json:"email"`
			MobileNumber string `json:"mobileNumber"`
		}{
			ID:           user.ID,
			Email:        user.Email,
			MobileNumber: user.MobileNumber,
		},
	}
	return resp, nil
}

func (s *authService) RegisterUser(req dtos.RegisterUserDTO) error {
	// Check if user already exists
	existingUser, _ := s.userRepo.FindByEmailOrMobile(req.Email)
	if existingUser != nil {
		return errors.New("user with this email already exists")
	}

	existingUserMobile, _ := s.userRepo.FindByEmailOrMobile(req.MobileNumber)
	if existingUserMobile != nil {
		return errors.New("user with this mobile number already exists")
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	newUser := &models.User{
		MobileNumber: req.MobileNumber,
		Email:        req.Email,
		Password:     string(hashedPassword),
	}

	return s.userRepo.Create(newUser)
}

func (s *authService) RequestPasswordResetOTP(req dtos.RequestResetOTPDTO) error {
	// Check if email belongs to an existing user
	user, err := s.userRepo.FindByEmailOrMobile(req.Email)
	if err != nil || user == nil {
		return errors.New("no user registered with this email address")
	}

	// Generate OTP code
	otp := generateOTP()

	// Set validity to 10 minutes
	expiresAt := time.Now().Add(10 * time.Minute)

	// Clean up older OTPs for this email first
	_ = s.resetRepo.DeleteByEmail(req.Email)

	// Save reset entry
	resetEntry := &models.PasswordReset{
		Email:     req.Email,
		OTP:       otp,
		ExpiresAt: expiresAt,
		CreatedAt: time.Now(),
	}

	err = s.resetRepo.Create(resetEntry)
	if err != nil {
		return err
	}

	// Send OTP email
	return sendOTPEmail(req.Email, otp)
}

func (s *authService) VerifyOTPAndResetPassword(req dtos.VerifyOTPAndResetDTO) error {
	// Retrieve valid OTP
	resetEntry, err := s.resetRepo.FindLatestValid(req.Email)
	if err != nil || resetEntry == nil {
		return errors.New("invalid or expired OTP verification code")
	}

	// Verify matching OTP code
	if resetEntry.OTP != req.OTP {
		return errors.New("incorrect OTP verification code")
	}

	// Retrieve user profile
	user, err := s.userRepo.FindByEmailOrMobile(req.Email)
	if err != nil || user == nil {
		return errors.New("user not found")
	}

	// Hash new password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	// Update user password
	user.Password = string(hashedPassword)
	err = s.userRepo.Save(user)
	if err != nil {
		return err
	}

	// Invalidate OTP immediately
	_ = s.resetRepo.DeleteByEmail(req.Email)

	return nil
}

// Helpers
func generateOTP() string {
	var table = [...]byte{'1', '2', '3', '4', '5', '6', '7', '8', '9', '0'}
	b := make([]byte, 6)
	n, err := io.ReadAtLeast(rand.Reader, b, 6)
	if n != 6 || err != nil {
		panic(err)
	}
	for i := 0; i < len(b); i++ {
		b[i] = table[int(b[i])%len(table)]
	}
	return string(b)
}

func sendOTPEmail(toEmail, otp string) error {
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")
	smtpUser := os.Getenv("SMTP_USER")
	smtpPass := os.Getenv("SMTP_PASS")

	// If no SMTP settings are configured, print to log and skip sending
	if smtpHost == "" || smtpUser == "" {
		logrus.Infof("SMTP not configured. Generated OTP code for %s: %s (Check logs / environment variables)", toEmail, otp)
		return nil
	}

	auth := smtp.PlainAuth("", smtpUser, smtpPass, smtpHost)
	msg := []byte("To: " + toEmail + "\r\n" +
		"Subject: Dnyanesh Portfolio Password Reset OTP\r\n" +
		"Content-Type: text/plain; charset=UTF-8\r\n\r\n" +
		"Hello,\r\n\r\n" +
		"Your verification one-time password (OTP) is: " + otp + "\r\n" +
		"This OTP is valid for 10 minutes. Please do not share this with anyone.\r\n\r\n" +
		"Regards,\r\n" +
		"Dnyanesh Portfolio Admin Tool\r\n")

	addr := smtpHost + ":" + smtpPort
	err := smtp.SendMail(addr, auth, smtpUser, []string{toEmail}, msg)
	if err != nil {
		logrus.Errorf("Failed to send SMTP email to %s: %v", toEmail, err)
		return err
	}
	return nil
}
