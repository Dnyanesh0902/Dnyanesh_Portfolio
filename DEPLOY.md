# Deployment Guide: Go Backend & Next.js Frontend

This guide outlines the steps to deploy your portfolio application online.

---

## 1. Deploy Frontend on Vercel

Vercel is the recommended and easiest hosting service for Next.js applications.

### Steps to Deploy:
1. Create a free account at [Vercel](https://vercel.com).
2. Connect your GitHub account and click **Add New** -> **Project**.
3. Select your `DnyaneshPortFolio` repository.
4. Set the following project configurations:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
5. Expand the **Environment Variables** accordion and add:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-go-backend-url.onrender.com` *(The URL you get after deploying your backend in Step 2)*
6. Click **Deploy**. Vercel will build the app and give you a public URL (e.g. `https://your-portfolio.vercel.app`).

---

## 2. Deploy Go Backend on Render

Render is a developer-friendly cloud hosting platform that supports Go Web Services.

### Steps to Deploy:
1. Create a free account at [Render](https://render.com).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. Set the following configurations:
   - **Name**: `portfolio-backend`
   - **Environment**: `Go`
   - **Root Directory**: `backend`
   - **Build Command**: `go build -o server main.go`
   - **Start Command**: `./server`
   - **Instance Type**: Web Service (Free tier)
5. Expand the **Advanced** section to add Environment Variables:
   - **Key**: `PORT`
   - **Value**: `8081` *(Matches the port registered in Go)*
   - **Key**: `JWT_SECRET`
   - **Value**: `your_custom_secure_jwt_token_secret`
   - **Key**: `SMTP_HOST` *(Optional, e.g. smtp.gmail.com)*
   - **Value**: `smtp.gmail.com`
   - **Key**: `SMTP_PORT` *(Optional, e.g. 587)*
   - **Value**: `587`
   - **Key**: `SMTP_USER` *(Optional, e.g. yourAddress@gmail.com)*
   - **Value**: `yourAddress@gmail.com`
   - **Key**: `SMTP_PASS` *(Optional, your App Password)*
   - **Value**: `yourGmailAppPassword`
6. Click **Create Web Service**.

### ⚠️ Database Persistence (Preventing Data Wipes on Render)
Render's Free tier containers sleep after 15 minutes of inactivity and reset their local filesystem. By default, the app uses local SQLite (`portfolio.db`). If you use SQLite in production, **all your added projects, skills, and messages will be wiped when the container restarts or sleeps!**

#### How to Solve (Highly Recommended & Free):
We have built-in support for **PostgreSQL** in the backend. To persist your database permanently:
1. Go to **[Neon](https://neon.tech/)** and create a free PostgreSQL database.
2. Copy your connection string (Data Source Name / URI) from the Neon dashboard. It looks like:
   `postgres://username:password@some-host.neon.tech/neondb?sslmode=require`
3. Go to your **Render Dashboard** -> Select your `portfolio-backend` web service.
4. Click on **Environment** in the left menu.
5. Add a new Environment Variable:
   - **Key**: `DATABASE_URL`
   - **Value**: *Paste your Neon PostgreSQL connection string here*
6. Click **Save Changes**.

*Render will restart the backend server. The database GORM layer will automatically detect the `DATABASE_URL`, connect to your Neon Postgres database, and run migrations. Your data will now be kept permanently, even when the server goes to sleep!*
