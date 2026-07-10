package dtos

type RequestResetOTPDTO struct {
	Email string `json:"email" validate:"required,email"`
}

type VerifyOTPAndResetDTO struct {
	Email       string `json:"email" validate:"required,email"`
	OTP         string `json:"otp" validate:"required,len=6"`
	NewPassword string `json:"newPassword" validate:"required,min=6"`
}
