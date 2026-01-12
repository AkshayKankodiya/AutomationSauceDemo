# 🚀 SauceDemo Playwright Test Automation Framework

This repository contains a **Playwright-based test automation framework** for [SauceDemo](https://www.saucedemo.com/) to demonstrate:

* **✅ Authentication flows (login, invalid credentials, locked users)
* **✅ E-commerce flows (add to cart, checkout, remove items)
* **✅ Product sorting & filtering
* **✅ API Mocking Tests

---

## 📋 Overview

This framework showcases:

* **Clean architecture and Page Object Model (POM)** design for maintainability
* **Reusable fixtures and helpers**
* **API mocking & network interception**
* **Test data management & storage state reuse**
* **HTML reporting and screenshots** for failed tests

---

## 🌐 Test Site

[SauceDemo](https://www.saucedemo.com/)

### Test Users

* `standard_user` – valid login
* `locked_out_user` – login failure scenario
* `problem_user` – various UI edge cases

---

## ⚡ Prerequisites

* **Node.js** v20+

```bash
node -v
```

* **npm**

```bash
npm -v
```

* **Git** (for cloning repository)
* **VS Code** (recommended)
* VS Code extensions: Playwright Test, Playwright Test Runner

---

## 📥 Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/AkshayKankodiya/AutomationSauceDemo.git
cd AutomationSauceDemo
```

2. **Install dependencies**

```bash
npm install
```

3. **Install Playwright browsers**

```bash
npx playwright install
```

---

## 📁 Project Structure

```
project-root/tests
├── SauceTest.spec.ts
│   ├── auth/           # Login tests
│   ├── ecommerce/      # Cart & checkout tests
│   └── products/       # Product page & sorting tests
    │── tests/APIAutomationTest.spec.ts     

├── pages/              # POM classes (LoginPage, InventoryPage, CartPage, CheckoutPage)
├── fixtures/           # Custom Playwright fixtures          # Utilities, test data generators
├── config/             # Base URLs, timeouts, users
├── playwright.config.ts
├── package.json
└── README.md
```

---

## 🧪 Run Tests

**Run all tests:**

```bash
npx playwright test
```

**Run specific test file:**

```bash
npx playwright test AuthenticationTest.spec.ts
```



**Generate HTML report:**

```bash
npx playwright show-report
```

---

## 💡 Framework Highlights

* **Reusable POM classes** with helper methods
* **Custom fixtures** for authenticated sessions and test data setup
* **Network interception & API mocking** for edge case testing
* **Storage state reuse** for faster test execution
* **Assertions with detailed error messages**
* Optional **visual regression / accessibility testing**

---

## 📈 Future Improvements

* CI/CD integration with GitHub Actions
* Integration with test management tools

---

## 📚 Resources

* Playwright Documentation: [https://playwright.dev](https://playwright.dev/)
* SauceDemo Test Site: [https://www.saucedemo.com/](https://www.saucedemo.com/)

---

## 📧 Submission Notes

Include in your submission:

* GitHub repository link
* HTML test report & screenshots

