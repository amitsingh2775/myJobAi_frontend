# myjobb AI - Full Stack Developer Intern Assignment (Frontend)

## Project Overview

This repository contains the frontend implementation for the myjobb AI Full Stack Developer Intern Assignment. Built with **Next.js**, **TailwindCSS**, and **shadcn/ui**, it provides a responsive dashboard with Email OTP-based authentication. The application is deployed on **Vercel** for production use.

### 🔗 Live Frontend URL

**Frontend:** https://products-eight-dun.vercel.app

---

## Features

### ✅ Authentication Interface

- **Register**: Sign up with email, name, and password to trigger an OTP email.
- **OTP Verification**: Enter 6-digit OTP with a "Resend OTP" option.
- **Login/Logout**: Secure login form and logout via sidebar.
- **User Feedback**: Toast notifications using `react-hot-toast`.
- **Responsive Design**: Authentication pages optimized for all devices using TailwindCSS.

### 📊 Dashboard Interface

- **Sidebar**: Built with `shadcn/ui` for navigation to Products and Analytics.
- **Products Tab**: Displays DummyJSON API data in a responsive table.

#### Data Presentation:
- Product details (title, price, category, rating) in a clean table.
- **Bonus Feature**: Analytics visualizations (e.g., category distribution, price ranges) if implemented.

- **Responsive UI**: Adapts to all device sizes.

---

## 🛠️ Technical Stack

- **Next.js**: For SSR, client-side navigation, and API route rewrites.
- **TailwindCSS**: For responsive styling.
- **shadcn/ui**: For reusable UI components.
- **Axios**: For API requests to the backend.
- **react-hot-toast**: For notifications.
- **jsonwebtoken**: For client-side JWT verification (if applicable).

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js: v16 or higher
- Backend API: Running at https://my-job-ai-backend.vercel.app/
- Vercel CLI: For local development and deployment

### Installation

```bash
https://github.com/amitsingh2775/myJobAi_frontend.git
cd myJobAi_frontend
```

```bash
npm install
```

Create a `.env.local` file:

```bash
touch .env.local
```

Add the following environment variables:

```bash
echo "NEXT_PUBLIC_BACKEND_URI=https://your-backend.vercel.app" >> .env.local
echo "JWT_SECRET=your-super-secret-key" >> .env.local
```

Start the development server:

```bash
npm run dev
```

The frontend runs on: `http://localhost:3000`

---

## ☁️ Deployment (Vercel)

Push the code to a GitHub repository:

```bash
git push origin main
```

Install Vercel CLI and deploy:

```bash
npm install -g vercel
vercel
```

Add environment variables in the Vercel dashboard:

- `NEXT_PUBLIC_BACKEND_URI=https://your-backend.vercel.app`
- `JWT_SECRET=your-super-secret-key`

Once deployed, the app is accessible at: **https://products-eight-dun.vercel.app**

---

## 📘 Usage Guide

- **Register**: Visit `/auth/register` to sign up and receive an OTP.
- **Verify OTP**: Visit `/auth/verify` to enter OTP. Use "Resend OTP" if needed.
- **Login**: Go to `/auth/login` to log in with email and password.
- **Dashboard**: Navigate to `/dashboard` to view products and analytics.
- **Logout**: Use the sidebar to logout securely.

---

## ✅ Code Quality

- **Modular Structure**: Organized components, utilities, and pages.
- **Responsive Design**: Built with TailwindCSS for full responsiveness.
- **Error Handling**: Robust API error handling and input validation.
- **UI/UX**: Intuitive experience using `shadcn/ui` and toast notifications.

---

## 🐞 Known Issues

- **Cookie Persistence**: Cookies may not persist in some browsers due to strict policies. This is mitigated using `sameSite: 'Lax'` and `secure: true`, but further testing is ongoing.
- **Debug Logs**: A "yes removed" log appears in development for debugging. Safe to ignore in production.

---

## 🔮 Future Improvements

- Add interactive filters for products table.
- Enhance analytics with better visualizations.
- Implement client-side form validation.
- Support dark mode.

---

