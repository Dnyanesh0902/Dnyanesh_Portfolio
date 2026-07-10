package dtos

type RegisterUserDTO struct {
	MobileNumber string `json:"mobileNumber" validate:"required"`
	Email        string `json:"email" validate:"required,email"`
	Password     string `json:"password" validate:"required,min=6"`
}
