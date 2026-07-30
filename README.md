<div align="center">

# 🍔 Yum Yum Market

**A full-stack food ordering platform — browse, cart, checkout, and track orders end to end.**

<a href="https://yum-yum-market.vercel.app" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Live%20Demo-yum--yum--market.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
</a>

<br />

[![Angular](https://img.shields.io/badge/Angular-000000?style=for-the-badge&logo=angular&logoColor=DD0031)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org)
[![SCSS](https://img.shields.io/badge/SCSS-000000?style=for-the-badge&logo=sass&logoColor=CC6699)](https://sass-lang.com)
[![Node.js](https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=node.js&logoColor=339933)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-000000?style=for-the-badge&logo=mongodb&logoColor=47A248)](https://www.mongodb.com/atlas)
[![PayPal](https://img.shields.io/badge/PayPal-000000?style=for-the-badge&logo=paypal&logoColor=00457C)](https://developer.paypal.com)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Render](https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white)](https://render.com)

</div>

---

## 📖 About

Yum Yum Market is a full-stack e-commerce application for browsing food, managing a live shopping cart, and completing secure checkouts. It's built as a decoupled Angular front end talking to a Node/Express REST API backed by MongoDB Atlas, with JWT-based auth and real PayPal payments.

## ✨ Features

- 📱 Full mobile-responsive UI across every page
- 🍕 Product browsing with a dynamic, real-time shopping cart
- 🔐 User authentication & authorization with JWT
- 💳 Secure checkout with live PayPal API integration
- 📦 Order history and user profile management

## 🛠️ Tech Stack

| Layer          | Stack                                           |
| -------------- | ----------------------------------------------- |
| **Frontend**   | Angular · TypeScript · SCSS (mobile responsive) |
| **Backend**    | Node.js · Express · TypeScript                  |
| **Database**   | MongoDB Atlas (Mongoose)                        |
| **Deployment** | Vercel (frontend) · Render (backend)            |

## 🚀 Local Development

### Prerequisites

- [Node.js](https://nodejs.org) v18+ and npm
- A [MongoDB Atlas](https://www.mongodb.com/atlas) connection string (or a local MongoDB instance)
- A [PayPal Developer](https://developer.paypal.com) sandbox/live Client ID

### 1. Clone the repository

```bash
git clone https://github.com/kirilchobansky/yum-yum-market.git
cd yum-yum-market
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (see the **Environment Variables** section below), then start the API:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

### 3. Frontend setup

```bash
cd frontend
npm install
```

Populate your PayPal Client ID for local development in `frontend/src/environments/environment.local.ts` (this file is gitignored):

```ts
export const environment = {
  production: false,
  apiBaseUrl: "http://localhost:3000",
  paypalClientId: "YOUR_PAYPAL_CLIENT_ID",
  paypalCurrency: "EUR",
};
```

Then start the dev server:

```bash
npm start
```

The app will be available at `http://localhost:4200`.

## 👑 Admin Credentials

| Field    | Value            |
| -------- | ---------------- |
| Email    | admin@gmail.com  |
| Password | 123asd           |

## 🔑 Environment Variables

**Backend** (`backend/.env`):

| Variable      | Description                                            |
| ------------- | ------------------------------------------------------ |
| `MONGO_URL`   | MongoDB Atlas (or local) connection string             |
| `JWT_SECRET`  | Secret used to sign JSON Web Tokens                    |
| `CORS_ORIGIN` | Allowed origin for CORS (e.g. `http://localhost:4200`) |

**Frontend** (production builds on Vercel):

| Variable           | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| `PAYPAL_CLIENT_ID` | PayPal Client ID, injected at build time via `scripts/set-env.js` |

## 👤 Author

**Kiril Chobansky**

[![GitHub](https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kirilchobansky)
[![Repo](https://img.shields.io/badge/Repository-yum--yum--market-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kirilchobansky/yum-yum-market)
