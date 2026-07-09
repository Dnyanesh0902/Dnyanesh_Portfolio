package controllers

import (
	"encoding/json"
	"fmt"
	"portfolio-backend/constant"
	"portfolio-backend/dtos"
	"portfolio-backend/services"
	"portfolio-backend/utils"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type AuthController struct {
	authService services.AuthService
}

func NewAuthController(authService services.AuthService) *AuthController {
	return &AuthController{authService: authService}
}

func (c *AuthController) Login(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			logrus.Errorf("Login Panic : %v", r)
			utils.InternalServerErrorResponse(ctx, fmt.Errorf("internal server error"))
		}
	}()

	var req dtos.LoginRequest
	if err := json.NewDecoder(ctx.Request.Body).Decode(&req); err != nil {
		utils.BadRequestResponse(ctx, constant.ErrorConstants.InvalidRequestPayload)
		return
	}

	if validation := utils.ValidateRequest(ctx, req); validation != nil {
		utils.ValidationResponse(ctx, validation.(string))
		return
	}

	resp, err := c.authService.Login(req)
	if err != nil {
		logrus.Errorf("Login Service Error : %v", err)
		utils.InternalServerErrorWithMessage(ctx, err.Error())
		return
	}

	utils.SuccessResponse(ctx, "Login successful.", resp)
}
