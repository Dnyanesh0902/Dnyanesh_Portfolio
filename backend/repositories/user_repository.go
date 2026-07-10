package repositories

import (
	"portfolio-backend/models"
	"gorm.io/gorm"
)

type UserRepository interface {
	FindByEmailOrMobile(identifier string) (*models.User, error)
	Create(user *models.User) error
	Save(user *models.User) error
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) FindByEmailOrMobile(identifier string) (*models.User, error) {
	var user models.User
	err := r.db.Where("email = ? OR mobile_number = ?", identifier, identifier).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *userRepository) Create(user *models.User) error {
	return r.db.Create(user).Error
}

func (r *userRepository) Save(user *models.User) error {
	return r.db.Save(user).Error
}
