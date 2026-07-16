package config

import (
	"log"
	"os"
	"portfolio-backend/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var err error
	dbURL := os.Getenv("DATABASE_URL")

	if dbURL != "" {
		log.Println("DATABASE_URL detected. Connecting to PostgreSQL database...")
		DB, err = gorm.Open(postgres.Open(dbURL), &gorm.Config{})
	} else {
		log.Println("No DATABASE_URL detected. Connecting to local SQLite database...")
		DB, err = gorm.Open(sqlite.Open("portfolio.db"), &gorm.Config{})
	}

	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	log.Println("Database connection established")

	// Run Migrations
	err = DB.AutoMigrate(&models.Project{}, &models.Skill{}, &models.Experience{}, &models.Message{}, &models.User{}, &models.PasswordReset{})
	if err != nil {
		log.Fatalf("Failed to auto migrate: %v", err)
	}

	log.Println("Database migration completed")

	// Seed Initial Data
	seedData()
}

func seedData() {
	// Seed Admin User if not exists
	var userCount int64
	DB.Model(&models.User{}).Count(&userCount)
	if userCount == 0 {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte("admin"), bcrypt.DefaultCost)
		if err != nil {
			log.Fatalf("Failed to encrypt default password: %v", err)
		}

		adminUser := models.User{
			Email:        "dnyaneshwarkokatevip@gmail.com",
			MobileNumber: "+91-9021852833",
			Password:     string(hashedPassword),
		}

		if err := DB.Create(&adminUser).Error; err != nil {
			log.Fatalf("Failed to seed default admin user: %v", err)
		}
		log.Println("Default Admin User seeded successfully (Email: dnyaneshwarkokatevip@gmail.com, Mobile: +91-9021852833, Pwd: admin)")
	}

	// Seed Projects if database is empty
	var projectCount int64
	DB.Model(&models.Project{}).Count(&projectCount)
	if projectCount == 0 {
		projects := []models.Project{
			{
				Title:           "Dynamic Project Workflow",
				Description:     "Engineered a workflow automation backend utilizing Go (Golang), Gin, GORM, and MySQL.",
				LongDescription: "A robust workflow automation backend system built for enterprise process management. Integrated AWS S3 storage services for document uploads, implemented custom rate limiters to protect endpoints, and set up automated wkhtmltopdf PDF report exports for generation of work order reports.",
				Technologies:    "Go, Gin, GORM, MySQL, AWS S3, wkhtmltopdf",
				Category:        "Go Backend",
				GithubURL:       "https://github.com/dnyaneshwarkokate/dynamic-project-workflow",
				LiveURL:         "",
			},
			{
				Title:           "Go Student Management API",
				Description:     "Developed a high-performance Student Management REST API using Go (Golang), Gin, and SQL Server.",
				LongDescription: "A high-performance student registration and records API designed using Clean Architecture directory guidelines. Utilized GORM hooks for entity lifecycle management and implemented the Repository Pattern to separate business logic from the database layer.",
				Technologies:    "Go, Gin, GORM, SQL Server, Clean Architecture, Repository Pattern",
				Category:        "Go Backend",
				GithubURL:       "https://github.com/dnyaneshwarkokate/go-student-management-api",
				LiveURL:         "",
			},
			{
				Title:           "Employee Management System",
				Description:     "Engineered a secure, full-stack Employee Management System utilizing ASP.NET Core Web API and Angular.",
				LongDescription: "A secure, enterprise-grade human resources portal. Implemented secure JWT authentication and granular Role-Based Access Control (RBAC) to restrict admin settings. Structured using Repository Pattern and Dependency Injection for highly testable code.",
				Technologies:    "ASP.NET Core Web API, C#, Angular, JWT Security, RBAC, Repository Pattern, Dependency Injection",
				Category:        "Full Stack",
				GithubURL:       "https://github.com/dnyaneshwarkokate/employee-management-system",
				LiveURL:         "",
			},
			{
				Title:           "Student Management System",
				Description:     "Developed a robust Student Management REST API using ASP.NET Core, Entity Framework Core, and SQL Server.",
				LongDescription: "A comprehensive student management API structured with Clean Architecture guidelines. Decoupled internal data models from presentation models using Data Transfer Objects (DTOs) and AutoMapper. Documented API endpoints with Swagger/OpenAPI.",
				Technologies:    "ASP.NET Core, Entity Framework Core, SQL Server, AutoMapper, DTOs, Swagger, Postman",
				Category:        ".NET Backend",
				GithubURL:       "https://github.com/dnyaneshwarkokate/student-management-system",
				LiveURL:         "",
			},
		}

		for _, p := range projects {
			DB.Create(&p)
		}
		log.Println("Projects seeded successfully")
	}

	// Seed Experiences if database is empty
	var experienceCount int64
	DB.Model(&models.Experience{}).Count(&experienceCount)
	if experienceCount == 0 {
		experiences := []models.Experience{
			{
				Title:       "Go Developer",
				Company:     "Choice Tech Lab",
				Location:    "Pune, India",
				Period:      "Jun 2026 – Present",
				Description: "Architect and develop high-performance backend systems and RESTful APIs using Go (Golang), Gin, and GORM.\nIntegrate AWS S3 storage services and implement multi-role approval engines for business workflow automation.\nSecure API endpoints using custom authentication middleware, JWT, and Bcrypt hashing.\nManage MySQL/SQL Server databases, including query tuning and structuring database access layers.",
				IsIntern:    false,
				Order:       1,
			},
			{
				Title:       "Dot Net Developer",
				Company:     "Electropneumatics",
				Location:    "Pune, India",
				Period:      "May 2025 – May 2026",
				Description: "Developed and maintained scalable enterprise web applications utilizing ASP.NET Core, C#, and SQL Server.\nImplemented MVC and Clean Architecture patterns to build modular, maintainable, and testable codebases.\nDesigned secure, high-throughput REST APIs and integrated Entity Framework Core query tracking for database optimization.\nLed collaborative code reviews, debugging activities, and established development guidelines.",
				IsIntern:    false,
				Order:       2,
			},
			{
				Title:       "Dot Net Core Developer Intern",
				Company:     "Intern Choice",
				Location:    "Pune, India",
				Period:      "Nov 2024 – Apr 2025",
				Description: "Developed and optimized backend features for web applications using ASP.NET MVC and Entity Framework.\nWrote clean, maintainable C# code adhering to SOLID design principles and OOP standards.\nCollaborated with cross-functional development teams to build features and resolve database query bottlenecks.",
				IsIntern:    true,
				Order:       3,
			},
		}

		for _, e := range experiences {
			DB.Create(&e)
		}
		log.Println("Experiences seeded successfully")
	}

	// Seed Skills if database is empty
	var skillCount int64
	DB.Model(&models.Skill{}).Count(&skillCount)
	if skillCount == 0 {
		skills := []models.Skill{
			// Languages
			{Name: "Go (Golang)", Category: "Languages", Level: 90},
			{Name: "C# (.NET)", Category: "Languages", Level: 85},
			{Name: "HTML5 / CSS3", Category: "Languages", Level: 80},
			{Name: "JavaScript / ES6", Category: "Languages", Level: 80},
			{Name: "SQL Server / MySQL", Category: "Languages", Level: 85},

			// Frameworks/Libraries
			{Name: "Gin (Go Framework)", Category: "Frameworks/Libraries", Level: 90},
			{Name: "GORM (Go ORM)", Category: "Frameworks/Libraries", Level: 88},
			{Name: "ASP.NET Core Web API", Category: "Frameworks/Libraries", Level: 85},
			{Name: "ASP.NET MVC", Category: "Frameworks/Libraries", Level: 80},
			{Name: "Entity Framework", Category: "Frameworks/Libraries", Level: 82},
			{Name: "Angular", Category: "Frameworks/Libraries", Level: 75},

			// Architecture & Patterns
			{Name: "Clean Architecture", Category: "Architecture", Level: 90},
			{Name: "Repository Pattern", Category: "Architecture", Level: 90},
			{Name: "MVC Pattern", Category: "Architecture", Level: 85},
			{Name: "Dependency Injection", Category: "Architecture", Level: 90},
			{Name: "SOLID Principles", Category: "Architecture", Level: 85},

			// Tools & Security
			{Name: "Git / GitHub", Category: "Tools & Security", Level: 85},
			{Name: "Swagger / OpenAPI", Category: "Tools & Security", Level: 90},
			{Name: "Postman", Category: "Tools & Security", Level: 90},
			{Name: "JWT Security", Category: "Tools & Security", Level: 85},
			{Name: "Bcrypt Hashing", Category: "Tools & Security", Level: 85},
			{Name: "AWS S3", Category: "Tools & Security", Level: 80},
			{Name: "CI/CD Pipelines", Category: "Tools & Security", Level: 75},
		}

		for _, s := range skills {
			DB.Create(&s)
		}
		log.Println("Skills seeded successfully")
	}
}
