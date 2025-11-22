---

# 📝 Note App (Node.js + Express + MongoDB)

A powerful and secure **RESTful API** built with Node.js, Express.js, and MongoDB.
This application provides user authentication, secure password reset, note management, advanced validation, brute-force protection, file uploads, and structured logging.

---

## 🚀 Features

* User registration & login (JWT-based authentication)
* Secure password hashing using **bcrypt**
* Email verification & password reset (via **Nodemailer**)
* Create, update, delete, and retrieve notes
* Request validation with **express-validator** & **Joi**
* Brute-force protection with **rate limiting**
* File upload handling using **Multer**
* Centralized helpers, services, controllers, and schemas
* Detailed logging using **Winston**
* Secure environment variables using **dotenv**
* Full Postman collection included

---

## 🏗️ Project Structure

```
note-app/
├── controllers/
│   ├── note.js
│   ├── token.js
│   └── user.js
├── data/
│   ├── note.js
│   ├── token.js
│   └── user.js
├── helpers/
│   ├── apiHelper.js
│   ├── bruteforceHelper.js
│   ├── db.js
│   ├── errorHelper.js
│   ├── logHelper.js
│   └── schemaHelper.js
├── models/
│   ├── note.js
│   ├── token.js
│   └── user.js
├── postman/
│   └──collection.json
├── routes/
│   ├── note.js
│   ├── token.js
│   └── user.js
├── schemas/
│   ├── noteSchema.js
│   ├── tokenSchema.js
│   └── userSchema.js
├── services/
│   ├── note.js
│   ├── token.js
│   └── user.js
├── utils/
│   ├── uploads/
│   ├── constant.js
│   ├── errors.js
│   ├── logger.js
│   └── mail.js
├── index.js
└── .env
```

---

## ⚙️ Technologies Used

| Technology / Package      | Purpose                         |
| ------------------------- | ------------------------------- |
| **Node.js**               | Runtime environment             |
| **Express.js**            | Backend framework               |
| **MongoDB + Mongoose**    | Database & ODM                  |
| **jsonwebtoken**          | JWT authentication              |
| **bcrypt**                | Password hashing                |
| **nodemailer**            | Email sending                   |
| **winston**               | Advanced logging                |
| **dotenv**                | Environment variable management |
| **cors**                  | CORS configuration              |
| **helmet**                | Security headers                |
| **multer**                | File uploads                    |
| **express-validator**     | Request validation              |
| **joi**                   | Schema validation               |
| **express-rate-limit**    | Brute-force protection          |
| **express-async-handler** | Async error handling            |

---

## 🔑 Environment Variables (`.env`)

Create a `.env` file in the project root:

```
PORT=3000
JWT_SECRET=your_jwt_secret_key
MONGO_URI=your_mongodb_connection_string
SEND_EMAIL=your_email_address
SEND_PASSWORD=your_email_password
```

---

## 📬 Postman Collection

A Postman collection is included for easy testing:

```
/postman/collection.json
```

To import:

**Postman → Import → File → collection.json**

---

## 🧩 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/kaderkaaya/note-app.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your `.env` file

(Use the variables shown above.)

### 4. Start the server

```bash
node index.js
```

---

## 👨‍💻 Developed by

**Kader Kaya**
GitHub: [@kaderkaaya](https://github.com/kaderkaaya)

---