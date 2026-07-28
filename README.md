<<<<<<< HEAD
# Frontend
=======
# 🛒 Yum-Yum Market

A full-stack, enterprise-structured food delivery web application built using **Angular (v16)**, **Node.js/Express**, and **MongoDB**. This project utilizes modular architectural design patterns (Core, Shared, and Feature modules) to ensure scalability and clean code separation.

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

- **Frontend:** Angular 16, TypeScript, RxJS, HTML5, SCSS/CSS
- **Backend:** Node.js, Express.js (REST API), TypeScript
- **Database:** MongoDB (via Mongoose ODM)
- **External Dependencies:** Leaflet.js, OpenStreetMap, PayPal SDK
- **Utilities:** `ngx-spinner`, `ngx-toastr` (notifications)

---
>>>>>>> fdbfcb92039ecd6a1074855ee60b104f23d88f86

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
