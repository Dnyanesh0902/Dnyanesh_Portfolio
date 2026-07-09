package dtos

type CreateSkillDTO struct {
	Name     string `json:"name" validate:"required"`
	Category string `json:"category" validate:"required"`
	Level    int    `json:"level" validate:"required,min=0,max=100"`
}
