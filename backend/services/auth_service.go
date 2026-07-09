package services

import (
	"errors"
	"time"
	"portfolio-backend/dtos"
	"portfolio-backend/repositories"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var JwtKey = []byte("dnyanesh_portfolio_secure_secret_key_12345")

type Claims struct {
	UserID uint `json:"userId"`
	jwt.RegisteredClaims
}

type AuthService interface {
	Login(req dtos.LoginRequest) (*dtos.LoginResponse, error)
}

type authService struct {
	userRepo repositories.UserRepository
}

func NewAuthService(userRepo repositories.UserRepository) AuthService {
	return &authService{userRepo: userRepo}
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
	}
	resp.User.ID = user.ID
	resp.User.Email = user.Email
	resp.User.MobileNumber = user.MobileNumber

	return resp, nil
}
