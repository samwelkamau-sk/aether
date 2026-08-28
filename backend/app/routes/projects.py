from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Project, Task

projects_bp = Blueprint('projects', __name__)

def ownership_required(project_id):
    user_id = int(get_jwt_identity())
    project = Project.query.get(project_id)
    if not project or project.user_id != user_id:
        return None
    return project

@projects_bp.route('', methods=['GET'])
@jwt_required()
def get_projects():
    user_id = int(get_jwt_identity())
    projects = Project.query.filter_by(user_id=user_id).all()
    return jsonify({'projects': [p.to_dict() for p in projects]}), 200

@projects_bp.route('', methods=['POST'])
@jwt_required()
def create_project():
    data = request.get_json()
    user_id = int(get_jwt_identity())
    
    if not data or not data.get('name'):
        return jsonify({'error': 'Project name is required'}), 400
    
    project = Project(
        name=data['name'],
        description=data.get('description', ''),
        user_id=user_id
    )
    
    db.session.add(project)
    db.session.commit()
    
    return jsonify({'message': 'Project created', 'project': project.to_dict()}), 201

@projects_bp.route('/<int:project_id>', methods=['GET'])
@jwt_required()
def get_project(project_id):
    project = ownership_required(project_id)
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    return jsonify({'project': project.to_dict()}), 200

@projects_bp.route('/<int:project_id>', methods=['PUT'])
@jwt_required()
def update_project(project_id):
    project = ownership_required(project_id)
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    data = request.get_json()
    project.name = data.get('name', project.name)
    project.description = data.get('description', project.description)
    project.status = data.get('status', project.status)
    
    db.session.commit()
    
    return jsonify({'message': 'Project updated', 'project': project.to_dict()}), 200

@projects_bp.route('/<int:project_id>', methods=['DELETE'])
@jwt_required()
def delete_project(project_id):
    project = ownership_required(project_id)
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    db.session.delete(project)
    db.session.commit()
    
    return jsonify({'message': 'Project deleted'}), 200

@projects_bp.route('/<int:project_id>/tasks', methods=['GET'])
@jwt_required()
def get_project_tasks(project_id):
    project = ownership_required(project_id)
    if not project:
        return jsonify({'error': 'Project not found'}), 404
    
    tasks = Task.query.filter_by(project_id=project_id, user_id=int(get_jwt_identity())).all()
    return jsonify({'tasks': [t.to_dict() for t in tasks]}), 200
