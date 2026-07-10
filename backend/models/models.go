package models

import (
	"time"
)

type Project struct {
	ID              uint   `gorm:"primaryKey" json:"id"`
	Title           string `gorm:"not null" json:"title"`
	Description     string `gorm:"not null" json:"description"`
	LongDescription string `json:"longDescription"`
	Technologies    string `json:"technologies"` // Comma-separated values, e.g. "Go,Gin,GORM,MySQL"
	Category        string `json:"category"`     // E.g., "Go Backend", ".NET Backend", "Full Stack"
	GithubURL       string `json:"githubUrl"`
	LiveURL         string `json:"liveUrl"`
}

type Skill struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Name     string `gorm:"not null" json:"name"`
	Category string `gorm:"not null" json:"category"` // E.g., "Languages", "Frameworks", "Architecture", "Tools"
	Level    int    `json:"level"`                    // E.g., 1-5 or 0-100
}

type Experience struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Title       string `gorm:"not null" json:"title"`
	Company     string `gorm:"not null" json:"company"`
	Location    string `json:"location"`
	Period      string `gorm:"not null" json:"period"`
	Description string `gorm:"type:text" json:"description"` // HTML or newline-separated points
	IsIntern    bool   `json:"isIntern"`
	Order       int    `json:"order"`
}

type Message struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Name      string    `gorm:"not null" json:"name" binding:"required"`
	Email     string    `gorm:"not null" json:"email" binding:"required,email"`
	Subject   string    `json:"subject"`
	Content   string    `gorm:"not null;type:text" json:"content" binding:"required"`
	CreatedAt time.Time `json:"createdAt"`
}

type User struct {
	ID           uint   `gorm:"primaryKey" json:"id"`
	MobileNumber string `gorm:"unique;not null" json:"mobileNumber"`
	Email        string `gorm:"unique;not null" json:"email"`
	Password     string `gorm:"not null" json:"-"` // Hashed password using bcrypt
}

type PasswordReset struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Email     string    `gorm:"index;not null" json:"email"`
	OTP       string    `gorm:"not null" json:"otp"`
	ExpiresAt time.Time `gorm:"not null" json:"expiresAt"`
	CreatedAt time.Time `json:"createdAt"`
}
