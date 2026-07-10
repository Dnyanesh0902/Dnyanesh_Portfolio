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

func (c *AuthController) Register(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			logrus.Errorf("Register Panic : %v", r)
			utils.InternalServerErrorResponse(ctx, fmt.Errorf("internal server error"))
		}
	}()

	var req dtos.RegisterUserDTO
	if err := json.NewDecoder(ctx.Request.Body).Decode(&req); err != nil {
		utils.BadRequestResponse(ctx, constant.ErrorConstants.InvalidRequestPayload)
		return
	}

	if validation := utils.ValidateRequest(ctx, req); validation != nil {
		utils.ValidationResponse(ctx, validation.(string))
		return
	}

	err := c.authService.RegisterUser(req)
	if err != nil {
		logrus.Errorf("Register Service Error : %v", err)
		utils.InternalServerErrorWithMessage(ctx, err.Error())
		return
	}

	utils.SuccessResponse(ctx, "User registered successfully.", nil)
}

func (c *AuthController) RequestPasswordResetOTP(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			logrus.Errorf("RequestPasswordResetOTP Panic : %v", r)
			utils.InternalServerErrorResponse(ctx, fmt.Errorf("internal server error"))
		}
	}()

	var req dtos.RequestResetOTPDTO
	if err := json.NewDecoder(ctx.Request.Body).Decode(&req); err != nil {
		utils.BadRequestResponse(ctx, constant.ErrorConstants.InvalidRequestPayload)
		return
	}

	if validation := utils.ValidateRequest(ctx, req); validation != nil {
		utils.ValidationResponse(ctx, validation.(string))
		return
	}

	err := c.authService.RequestPasswordResetOTP(req)
	if err != nil {
		logrus.Errorf("RequestPasswordResetOTP Service Error : %v", err)
		utils.InternalServerErrorWithMessage(ctx, err.Error())
		return
	}

	utils.SuccessResponse(ctx, "Verification code sent to your email.", nil)
}

func (c *AuthController) VerifyOTPAndResetPassword(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			logrus.Errorf("VerifyOTPAndResetPassword Panic : %v", r)
			utils.InternalServerErrorResponse(ctx, fmt.Errorf("internal server error"))
		}
	}()

	var req dtos.VerifyOTPAndResetDTO
	if err := json.NewDecoder(ctx.Request.Body).Decode(&req); err != nil {
		utils.BadRequestResponse(ctx, constant.ErrorConstants.InvalidRequestPayload)
		return
	}

	if validation := utils.ValidateRequest(ctx, req); validation != nil {
		utils.ValidationResponse(ctx, validation.(string))
		return
	}

	err := c.authService.VerifyOTPAndResetPassword(req)
	if err != nil {
		logrus.Errorf("VerifyOTPAndResetPassword Service Error : %v", err)
		utils.InternalServerErrorWithMessage(ctx, err.Error())
		return
	}

	utils.SuccessResponse(ctx, "Password updated successfully.", nil)
}
