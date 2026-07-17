package controllers

import (
	"fmt"
	"io"
	"net/http"
	"portfolio-backend/services"
	"portfolio-backend/utils"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type ResumeController struct {
	resumeService services.ResumeService
}

func NewResumeController(resumeService services.ResumeService) *ResumeController {
	return &ResumeController{resumeService: resumeService}
}

func (c *ResumeController) GetResume(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			logrus.Errorf("GetResume Panic : %v", r)
			utils.InternalServerErrorResponse(ctx, fmt.Errorf("internal server error"))
		}
	}()

	res, err := c.resumeService.GetLatestResume()
	if err != nil {
		logrus.Errorf("GetResume Service Error : %v", err)
		ctx.JSON(http.StatusNotFound, gin.H{"error": "No resume found"})
		return
	}

	// Serve the PDF raw binary file directly
	ctx.Header("Content-Disposition", fmt.Sprintf("inline; filename=\"%s\"", res.FileName))
	ctx.Data(http.StatusOK, "application/pdf", res.FileData)
}

func (c *ResumeController) UploadResume(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			logrus.Errorf("UploadResume Panic : %v", r)
			utils.InternalServerErrorResponse(ctx, fmt.Errorf("internal server error"))
		}
	}()

	// Parse file from form request
	file, header, err := ctx.Request.FormFile("file")
	if err != nil {
		utils.BadRequestResponse(ctx, "Failed to parse uploaded file from request")
		return
	}
	defer file.Close()

	// Check if file is PDF
	if header.Header.Get("Content-Type") != "application/pdf" {
		utils.BadRequestResponse(ctx, "Invalid file format. Only PDF files are allowed.")
		return
	}

	// Read file contents into byte array
	fileBytes, err := io.ReadAll(file)
	if err != nil {
		utils.InternalServerErrorWithMessage(ctx, "Failed to read uploaded file")
		return
	}

	err = c.resumeService.UploadResume(header.Filename, fileBytes)
	if err != nil {
		logrus.Errorf("UploadResume Service Error : %v", err)
		utils.InternalServerErrorWithMessage(ctx, err.Error())
		return
	}

	utils.SuccessResponse(ctx, "Resume PDF uploaded successfully.", nil)
}
