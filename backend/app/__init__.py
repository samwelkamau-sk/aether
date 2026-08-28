from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config=None):
    app = Flask(__name__)
    
    if config:
        app.config.from_object(config)
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///taskflow.db')
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
        app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key')
        app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600
    
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    if os.getenv('CORS_ORIGINS'):
        cors_origins = os.getenv('CORS_ORIGINS').split(',')
    else:
        cors_origins = [os.getenv('FRONTEND_URL', 'http://localhost:5173')]
    
    CORS(app, origins=cors_origins)
    
    from app.routes.auth import auth_bp
    from app.routes.projects import projects_bp
    from app.routes.tasks import tasks_bp
    from app.routes.ai import ai_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(projects_bp, url_prefix='/api/projects')
    app.register_blueprint(tasks_bp, url_prefix='/api/tasks')
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
    
    @app.route('/api/health')
    def health():
        return {'status': 'healthy', 'service': 'taskflow-api'}
    
    return app
