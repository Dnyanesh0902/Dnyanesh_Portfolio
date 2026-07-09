package dtos

type CreateProjectDTO struct {
	Title           string `json:"title" validate:"required"`
	Description     string `json:"description" validate:"required"`
	LongDescription string `json:"longDescription"`
	Technologies    string `json:"technologies"`
	Category        string `json:"category" validate:"required"`
	GithubURL       string `json:"githubUrl"`
	LiveURL         string `json:"liveUrl"`
}
