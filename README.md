# TaskFlow - Full-Stack Productivity Application

A modern productivity application built with React and Flask, featuring user authentication, project management, task tracking, and AI-powered productivity insights.

## Tech Stack

### Backend
- **Flask** - Python web framework
- **PostgreSQL** - Database
- **SQLAlchemy** - ORM
- **Flask-JWT-Extended** - JWT authentication
- **Flask-Migrate** - Database migrations
- **Flask-CORS** - Cross-origin resource sharing
- **Google Generative AI (Gemini)** - AI-powered task suggestions

### Frontend
- **React 19** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling (via CDN)

## Features

- **User Authentication**: Register, login, JWT-based session management
- **Projects**: Create, read, update, delete projects
- **Tasks**: Full CRUD operations on tasks with project association
- **Ownership-based Access**: Users can only access their own projects and tasks
- **AI Integration**: Smart task priority suggestions, task enhancement, and productivity tips powered by Gemini
- **Responsive Design**: Mobile-first UI with Emerald Aether dark theme
- **Dashboard**: Overview of projects, tasks, and AI insights

## Project Structure

```
aether/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Flask app factory
│   │   ├── extensions.py        # Flask extensions
│   │   ├── models.py            # SQLAlchemy models
│   │   ├── routes/
│   │   │   ├── auth.py          # Authentication routes
│   │   │   ├── projects.py      # Project CRUD routes
│   │   │   ├── tasks.py         # Task CRUD routes
│   │   │   └── ai.py            # AI integration routes
│   │   └── utils/
│   │       └── ai.py
│   ├── migrations/
│   ├── .env
│   ├── .env.example
│   ├── requirements.txt
│   └── run.py
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Projects.jsx
    │   │   ├── ProjectDetail.jsx
    │   │   └── Tasks.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── vite.config.js
```

## Database Schema

### Users
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email
- `password_hash` - Hashed password
- `created_at` - Timestamp

### Projects
- `id` - Primary key
- `name` - Project name
- `description` - Project description
- `status` - Project status (active/completed)
- `user_id` - Foreign key to Users (owner)
- `created_at` - Timestamp
- `updated_at` - Timestamp

### Tasks
- `id` - Primary key
- `title` - Task title
- `description` - Task description
- `status` - Task status (pending/in_progress/completed)
- `priority` - Task priority (low/medium/high)
- `due_date` - Optional due date
- `project_id` - Foreign key to Projects
- `user_id` - Foreign key to Users (owner)
- `created_at` - Timestamp
- `updated_at` - Timestamp

## Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your PostgreSQL credentials and Gemini API key
   ```

5. Initialize the database:
   ```bash
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   ```

6. Run the Flask server:
   ```bash
   flask run
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info

### Projects
- `GET /api/projects` - Get all projects for current user
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get a specific project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project
- `GET /api/projects/:id/tasks` - Get tasks for a project

### Tasks
- `GET /api/tasks` - Get all tasks for current user (optional `project_id` filter)
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### AI Features
- `POST /api/ai/suggest-priority` - Get AI suggestion for task priority
- `POST /api/ai/enhance-task` - Get AI-enhanced task title and description
- `GET /api/ai/productivity-tips` - Get personalized productivity tips

## Security

- JWT-based authentication with secure tokens
- Password hashing using Werkzeug
- Ownership checks on all project and task mutations
- CORS configured for frontend origin only
- Input validation on all endpoints
- Security headers (X-Content-Type-Options, X-Frame-Options, HSTS, etc.)
- Rate limiting support
- Structured logging with file rotation

## Production Deployment

### Environment Setup

1. Set production environment variables:
   ```bash
   cp .env.example .env
   # Update DATABASE_URL to your PostgreSQL connection string
   # Update SECRET_KEY and JWT_SECRET_KEY to strong random values
   # Update CORS_ORIGINS to your production frontend URL
   ```

2. Install production dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run database migrations:
   ```bash
   flask db migrate -m "Production migration"
   flask db upgrade
   ```

4. Seed the database (optional):
   ```bash
   python seed.py
   ```

### Running with Gunicorn

```bash
# Basic gunicorn command
gunicorn wsgi:app --bind 0.0.0.0:5000 --workers 4 --timeout 120

# Or use the Procfile for Heroku/Render/etc
# Procfile content: web: gunicorn wsgi:app --bind 0.0.0.0:$PORT --workers 4 --timeout 120
```

### Production Checklist

- [ ] Set strong `SECRET_KEY` and `JWT_SECRET_KEY` values
- [ ] Configure PostgreSQL database URL
- [ ] Set `CORS_ORIGINS` to your production frontend domain(s)
- [ ] Enable HTTPS with valid SSL certificates
- [ ] Set up reverse proxy (Nginx/Apache) if needed
- [ ] Configure logging to external service (e.g., Sentry, LogRocket)
- [ ] Set up database backups
- [ ] Configure `WORKERS` based on CPU cores (typically 2-4 per core)

### Docker Deployment

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["gunicorn", "wsgi:app", "--bind", "0.0.0.0:5000", "--workers", "4"]
```

## AI Integration

The application uses Google's Gemini API to provide:
- **Smart Priority Suggestions**: Analyzes task content and suggests appropriate priority levels
- **Task Enhancement**: Rewrites task titles and descriptions for better clarity
- **Productivity Tips**: Generates personalized tips based on user's current task load

## License

MIT
