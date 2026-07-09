package dtos

type CreateMessageDTO struct {
	Name    string `json:"name" validate:"required"`
	Email   string `json:"email" validate:"required,email"`
	Subject string `json:"subject"`
	Content string `json:"content" validate:"required"`
}
