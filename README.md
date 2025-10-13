# User Auth + Notes App (Backend)

**Tech Stack:** Node.js, Express, MongoDB, JWT, bcrypt

---

## 🚀 Features

- User signup & login (email + password)
- JWT authentication
- Refresh token management (httpOnly cookie)
- Notes CRUD (owner-only access)
- Input validation & password hashing
- Error handling & logging
- Pagination & filtering

---

## 🗂 API Endpoints

**Auth**
- `POST /api/auth/signup` → Create user
- `POST /api/auth/login` → Login & generate tokens
- `POST /api/auth/refresh` → Refresh access token
- `POST /api/auth/logout` → Logout & invalidate token

**Notes**
- `GET /api/notes` → List notes
- `POST /api/notes` → Create note
- `GET /api/notes/:id` → Note details
- `PUT /api/notes/:id` → Update note
- `DELETE /api/notes/:id` → Delete note

---

## 🔐 Security

- Passwords hashed with bcrypt
- JWT access token short-lived, refresh token stored in httpOnly cookie
- Auth & owner checks via middleware

---

## 🛠 Setup

```bash
git clone <https://github.com/kaderkaaya/note-app.git>
cd project
npm install
npm run dev
