# Portfolio Backend API

Full Stack Portfolio Website এর জন্য সম্পূর্ণ Node.js + Express Backend with **PostgreSQL + Prisma**।

## 🚀 Features

### 1. Contact Form API
- POST `/api/contact` - Contact form submit
- Rate limiting: 5 মিনিটে max 3 requests
- PostgreSQL তে save + Email notification

### 2. Blog API (CRUD)
- GET `/api/blog` - সব published posts
- GET `/api/blog/:slug` - Single post by slug
- POST `/api/blog` - নতুন post (JWT protected)
- PUT `/api/blog/:id` - Update post (JWT protected)
- DELETE `/api/blog/:id` - Delete post (JWT protected)

### 3. Project Showcase API
- GET `/api/projects` - সব projects (filter/sort)
- GET `/api/projects?featured=true` - Featured projects
- GET `/api/projects?tag=nodejs` - Tag দিয়ে filter
- GET `/api/projects/:id` - Single project
- POST `/api/projects` - নতুন project (JWT protected)
- PUT `/api/projects/:id` - Update project (JWT protected)
- DELETE `/api/projects/:id` - Delete project (JWT protected)
- POST `/api/projects/:id/like` - Project like (public)
- POST `/api/projects/upload` - Image upload (JWT protected)

### 4. Resume Download API
- GET `/api/resume/download` - Resume PDF download
- GET `/api/resume/stats` - Download statistics (JWT protected)

### 5. Admin Authentication
- POST `/api/auth/login` - Admin login (JWT token)

## 📦 Installation

### 1. Dependencies Install করুন:
```bash
npm install
```

### 2. Environment Variables:
`.env` file already created আছে। Update করুন if needed।

### 3. PostgreSQL Setup:
```bash
# macOS
brew install postgresql@14
brew services start postgresql@14
createdb portfolio

# Linux
sudo apt install postgresql
sudo systemctl start postgresql
sudo -u postgres createdb portfolio
```

### 4. Prisma Setup:
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 5. Resume Upload:
```bash
mkdir -p uploads
# আপনার resume.pdf file টি uploads/ folder এ রাখুন
```

## 🏃 Run

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

Server: `http://localhost:5000`

## 📁 Module Pattern Structure

```
src/app/modules/
├── Auth/          (Login)
├── Blog/          (Blog CRUD)
├── Contact/       (Contact Form)
├── Project/       (Project Showcase)
└── Resume/        (Resume Download)
```

## 📝 Quick API Test

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"emtiaz@example.com","password":"admin123"}'

# Get Projects
curl http://localhost:5000/api/projects?featured=true

# Contact Form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Hello","message":"Test message"}'
```

## 🔒 Security

- Helmet.js
- CORS
- Rate limiting
- JWT authentication
- File upload validation
- Zod validation

## 📄 License

MIT
