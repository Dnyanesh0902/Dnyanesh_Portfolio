package repositories

import (
	"time"
	"portfolio-backend/models"
	"gorm.io/gorm"
)

type PasswordResetRepository interface {
	Create(reset *models.PasswordReset) error
	FindLatestValid(email string) (*models.PasswordReset, error)
	DeleteByEmail(email string) error
}

type passwordResetRepository struct {
	db *gorm.DB
}

func NewPasswordResetRepository(db *gorm.DB) PasswordResetRepository {
	return &passwordResetRepository{db: db}
}

func (r *passwordResetRepository) Create(reset *models.PasswordReset) error {
	return r.db.Create(reset).Error
}

func (r *passwordResetRepository) FindLatestValid(email string) (*models.PasswordReset, error) {
	var reset models.PasswordReset
	err := r.db.Where("email = ? AND expires_at > ?", email, time.Now()).Order("created_at DESC").First(&reset).Error
	if err != nil {
		return nil, err
	}
	return &reset, nil
}

func (r *passwordResetRepository) DeleteByEmail(email string) error {
	return r.db.Where("email = ?", email).Delete(&models.PasswordReset{}).Error
}
