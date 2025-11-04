# 📝 Note App (Node.js + Express + MongoDB)

A simple yet powerful **RESTful API** built with Node.js, Express.js, and MongoDB.
This project allows users to register, log in, manage notes, and securely reset their passwords.

---

## 🚀 Features

* User registration and authentication (JWT-based)
* Secure password hashing using **bcrypt**
* Password reset with **email verification link**
* Create, update, delete, and view notes
* Centralized error handling with custom `AppError` and `ErrorHelper`
* Environment variables managed with **dotenv**
* Protected `.env` and other sensitive files via `.gitignore`
* **System-level login logging** using **Winston**

---

## 🏗️ Project Architecture

```
note-app/
├── controllers/
│   └── userController.js
├── models/
│   ├── user.js
│   └── note.js
├── services/
│   └── userService.js
├── helpers/
│   ├── ErrorHelper.js
│   ├── AppError.js
│   └── emailHelper.js
├── middlewares/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── logs/
│   ├── login-success.log
│   └── login-failed.log
├── routes/
│   ├── userRoutes.js
│   └── noteRoutes.js
├── utils/
│   └── loginLogger.js
├── app.js
├── server.js
└── .env (ignored by Git)
```

---

## ⚙️ Technologies

| Technology             | Purpose                         |
| ---------------------- | ------------------------------- |
| **Node.js**            | Runtime environment             |
| **Express.js**         | Web framework                   |
| **MongoDB + Mongoose** | Database & ODM                  |
| **JWT (jsonwebtoken)** | Authentication                  |
| **Bcrypt.js**          | Password hashing                |
| **Nodemailer**         | Email delivery                  |
| **Winston**            | System-level logging            |
| **dotenv**             | Environment variable management |

---

## 🧩 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/kaderkaaya/note-app.git
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create your `.env` file**

   ```bash
   PORT=3000
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=your_secret_key
   EMAIL=your_email
   EMAIL_PASSWORD=your_email_password
   ```

4. **Run the app**

   ```bash
  node index.js
   ```

---

## 🧠 Developer Notes

* Winston is used strictly for **system-level logging**, keeping database operations clean.
* The app follows a **modular architecture**, ensuring scalability and maintainability.
* All errors are handled centrally via a custom `ErrorHelper` and `AppError` system.
* Future improvements may include analytics dashboards or login attempt tracking within the database.


## 👨‍💻 Developed by

**Kader Kaya**
[GitHub @kaderkaaya](https://github.com/kaderkaaya)
