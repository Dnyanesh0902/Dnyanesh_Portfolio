# Developer Portfolio CMS (Full-Stack Engine)

A professional, high-fidelity developer portfolio website coupled with a secure content management system (CMS) dashboard.

---

## 🛠️ Technology Stack

- **Frontend**: [Next.js (App Router)](https://nextjs.org/) • TypeScript • CSS Modules • Lucide Icons
- **Backend**: [Go (Golang)](https://go.dev/) • [Gin Web Framework](https://gin-gonic.dev/) • [GORM](https://gorm.io/) • SQLite
- **Security**: JWT Authentication • Bcrypt Password Hashing • CORS Middleware

---

## 📂 Project Structure

This project is organized as a unified full-stack monorepo:

```
DnyaneshPortFolio/
├── backend/        # Go REST API (GORM Database, JWT Controllers)
├── frontend/       # Next.js App Router (Showcase, Admin Dashboard)
├── DEPLOY.md       # Step-by-step production hosting guidelines
└── README.md       # Full-stack architectural overview
```

For detailed setup instructions and architectural blueprints, read the sub-directory documentation:
- 🗺️ **[Backend REST API (Go)](file:///Users/dnyaneshwarkokate/Dnyaneshwar_Personal/DnyaneshPortFolio/backend/README.md)**
- 🎨 **[Frontend Web App (Next.js)](file:///Users/dnyaneshwarkokate/Dnyaneshwar_Personal/DnyaneshPortFolio/frontend/README.md)**

---

## 🚀 Quick Local Launch

To run the entire stack locally in development mode:

### 1. Start the Go Backend
```bash
cd backend
go run main.go
```
*Backend server runs on port `8081`.*

### 2. Start the Next.js Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend app runs on port `3000`.*
