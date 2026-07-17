package repositories

import (
	"portfolio-backend/models"
	"gorm.io/gorm"
)

type ResumeRepository interface {
	GetLatest() (*models.Resume, error)
	Save(resume *models.Resume) error
}

type resumeRepository struct {
	db *gorm.DB
}

func NewResumeRepository(db *gorm.DB) ResumeRepository {
	return &resumeRepository{db: db}
}

func (r *resumeRepository) GetLatest() (*models.Resume, error) {
	var res models.Resume
	err := r.db.Order("updated_at DESC").First(&res).Error
	if err != nil {
		return nil, err
	}
	return &res, nil
}

func (r *resumeRepository) Save(resume *models.Resume) error {
	return r.db.Save(resume).Error
}
