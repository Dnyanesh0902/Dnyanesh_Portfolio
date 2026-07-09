package dtos

type CreateExperienceDTO struct {
	Title       string `json:"title" validate:"required"`
	Company     string `json:"company" validate:"required"`
	Location    string `json:"location"`
	Period      string `json:"period" validate:"required"`
	Description string `json:"description"`
	IsIntern    bool   `json:"isIntern"`
	Order       int    `json:"order"`
}
