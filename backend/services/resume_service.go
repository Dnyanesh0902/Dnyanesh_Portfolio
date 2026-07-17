package services

import (
	"time"
	"portfolio-backend/models"
	"portfolio-backend/repositories"
)

type ResumeService interface {
	GetLatestResume() (*models.Resume, error)
	UploadResume(fileName string, fileData []byte) error
}

type resumeService struct {
	repo repositories.ResumeRepository
}

func NewResumeService(repo repositories.ResumeRepository) ResumeService {
	return &resumeService{repo: repo}
}

func (s *resumeService) GetLatestResume() (*models.Resume, error) {
	return s.repo.GetLatest()
}

func (s *resumeService) UploadResume(fileName string, fileData []byte) error {
	// Attempt to get the latest record to overwrite it, keeping only 1 active CV in DB
	existing, err := s.repo.GetLatest()
	if err == nil && existing != nil {
		existing.FileName = fileName
		existing.FileData = fileData
		existing.UpdatedAt = time.Now()
		return s.repo.Save(existing)
	}

	// Create new record
	newResume := &models.Resume{
		FileName:  fileName,
		FileData:  fileData,
		UpdatedAt: time.Now(),
	}
	return s.repo.Save(newResume)
}
