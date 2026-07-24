<div align="center">

# 🚀 BlogHub

### A Modern Full-Stack MERN Blogging Platform

Create, publish, and explore blogs with a rich text editor, secure authentication, image uploads, and interactive social features.

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge)

</p>

<p align="center">

<a href="https://blogging-platform-tau-sand.vercel.app">
<img src="https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge">
</a>

<a href="https://blogging-platform-zbnp.onrender.com">
<img src="https://img.shields.io/badge/Backend-API-success?style=for-the-badge">
</a>

</p>

</div>

---

# 📖 Overview

**BlogHub** is a full-stack blogging platform built using the **MERN Stack** that enables users to create, edit, and manage blogs with a modern writing experience.

It provides secure authentication, rich text editing, cloud image uploads, likes, bookmarks, comments, search, pagination, and a responsive dashboard.

The project is deployed using **Vercel**, **Render**, **MongoDB Atlas**, and **Cloudinary**.

---

# ✨ Features

## 🔐 Authentication

- JWT Authentication
- Secure Login & Registration
- Protected Routes
- Password Encryption

## ✍️ Blogging

- Rich Text Editor (Tiptap)
- Create Blogs
- Edit Blogs
- Delete Blogs
- Upload Cover Images

## 🌐 Social Features

- Like Blogs
- Comment System
- Bookmark Blogs
- Search Blogs
- Pagination

## 👤 User Dashboard

- My Blogs
- Profile Management
- Dashboard Overview

## ☁️ Deployment

- MongoDB Atlas
- Cloudinary Image Storage
- Vercel Deployment
- Render Backend

---

# 🛠 Tech Stack

| Category | Technologies |
|------------|-----------------------------|
| Frontend | React.js, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT, bcryptjs |
| Image Storage | Cloudinary |
| Rich Text Editor | Tiptap |
| Deployment | Vercel, Render |
| Version Control | Git, GitHub |

---

# 🏗 Architecture

```
                React + Vite
                     │
                  Axios
                     │
          Node.js + Express.js
                     │
        JWT Authentication Layer
                     │
            MongoDB Atlas Database
                     │
               Cloudinary Storage
```

---

# 📸 Screenshots

| Home | Dashboard |
|------|-----------|
| ![](assets/screenshots/home.png) | ![](assets/screenshots/dashboard.png) |

| Login | Register |
|------|-----------|
| ![](assets/screenshots/login.png) | ![](assets/screenshots/register.png) |

| Create Blog | Bookmarks |
|------|-----------|
| ![](assets/screenshots/create-blog.png) | ![](assets/screenshots/bookmarks.png) |

| Profile |
|---------|
| ![](assets/screenshots/profile.png) |

---

# 📂 Folder Structure

```
blogging-platform
│
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── server.js
│   └── package.json
│
├── assets
│   └── screenshots
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Isha4002/blogging-platform.git
cd blogging-platform
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the **server** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run the backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# 🌐 Live Demo

## Frontend

https://blogging-platform-tau-sand.vercel.app

## Backend API

https://blogging-platform-zbnp.onrender.com

---

# 📡 API Overview

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/blogs | Get All Blogs |
| POST | /api/blogs | Create Blog |
| PUT | /api/blogs/:id | Update Blog |
| DELETE | /api/blogs/:id | Delete Blog |
| POST | /api/comments | Add Comment |

---

# 🚀 Future Enhancements

- 🌙 Dark Mode
- 🤖 AI Blog Assistant
- 🔔 Push Notifications
- 👥 Follow Authors
- 📊 Analytics Dashboard
- 📧 Email Verification
- 🔍 Advanced Filters

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

**Isha Pal**

- GitHub: https://github.com/Isha4002
- LinkedIn: https://www.linkedin.com/in/isha-pal-76724a2a4

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

It helps the project reach more developers and encourages future improvements.

---

<div align="center">

### Made with ❤️ using the MERN Stack

</div>
