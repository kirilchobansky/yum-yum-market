# 🛒 Yum-Yum Market

A full-stack, enterprise-structured food delivery web application built using **Angular (v20)**, **Node.js/Express**, and **MongoDB**. This project utilizes modular architectural design patterns (Core, Shared, and Feature modules) to ensure scalability, lazy-loading performance, and clean code separation.

---

## 🌟 Key Features

- **Dynamic Food Catalog:** Complete search indexing, custom tag filtering, and dynamic parameter-based routing for detailed recipe/food information.
- **State-Managed Cart & Checkout:** Integrated shopping cart mechanics with local storage persistence and automated price calculation.
- **Secure Authentication & Guarded Routes:** Robust sign-up and login workflows with secure JSON Web Tokens (JWT) handling, centralized user states, and active route guards.
- **Geographic Address Pinning:** Implemented open-source mapping with **Leaflet.js** allowing customers to visual-map their exact delivery coordinates.
- **Interactive Feedback:** Multi-user comments engine tied to active database records, as well as a like/dislike rating system.
- **Seamless Payments:** Full checkout integrations configured through the **PayPal Sandbox API**.
- **Modern User Experience:** Intercepted loading states with `ngx-spinner` and dynamic app notifications via `ngx-toastr`.

---

## 🛠️ Technology Stack

- **Frontend:** Angular 20, TypeScript, RxJS, HTML5, SCSS/CSS
- **Backend:** Node.js (v22), Express.js (REST API), TypeScript
- **Database:** MongoDB (via Mongoose ODM)
- **External Dependencies:** Leaflet.js, OpenStreetMap, PayPal SDK
- **Utilities:** `ngx-spinner`, `ngx-toastr`

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed locally:

- **Node.js:** v22.x
- **npm:** v11.x
- **Angular CLI:** v20.x (`npm install -g @angular/cli`)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/kirilchobansky/yum-yum-market.git](https://github.com/kirilchobansky/yum-yum-market.git)
   cd yum-yum-market
   ```
