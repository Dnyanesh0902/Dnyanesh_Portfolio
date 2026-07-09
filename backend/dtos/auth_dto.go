package dtos

type LoginRequest struct {
	Identifier string `json:"identifier" validate:"required"` // Can be Email or Mobile Number
	Password   string `json:"password" validate:"required"`
}

type LoginResponse struct {
	Token string `json:"token"`
	User  struct {
		ID           uint   `json:"id"`
		Email        string `json:"email"`
		MobileNumber string `json:"mobileNumber"`
	} `json:"user"`
}
