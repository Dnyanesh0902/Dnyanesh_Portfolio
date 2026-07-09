package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

var validate = validator.New()

type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

func SuccessResponse(c *gin.Context, message string, data interface{}) {
	c.JSON(http.StatusOK, APIResponse{
		Success: true,
		Message: message,
		Data:    data,
	})
}

func BadRequestResponse(c *gin.Context, errMsg string) {
	c.JSON(http.StatusBadRequest, APIResponse{
		Success: false,
		Error:   errMsg,
	})
}

func ValidationResponse(c *gin.Context, errMsg string) {
	c.JSON(http.StatusUnprocessableEntity, APIResponse{
		Success: false,
		Error:   errMsg,
	})
}

func InternalServerErrorResponse(c *gin.Context, err error) {
	c.JSON(http.StatusInternalServerError, APIResponse{
		Success: false,
		Error:   err.Error(),
	})
}

func InternalServerErrorWithMessage(c *gin.Context, errMsg string) {
	c.JSON(http.StatusInternalServerError, APIResponse{
		Success: false,
		Error:   errMsg,
	})
}

// ValidateRequest validates request DTO struct tags
func ValidateRequest(c *gin.Context, req interface{}) interface{} {
	err := validate.Struct(req)
	if err != nil {
		if validationErrors, ok := err.(validator.ValidationErrors); ok {
			for _, fieldErr := range validationErrors {
				// Return first human-readable validation error message
				return fieldErr.Field() + " is " + fieldErr.Tag()
			}
		}
		return err.Error()
	}
	return nil
}
