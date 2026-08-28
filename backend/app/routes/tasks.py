from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Task, Project

tasks_bp = Blueprint('tasks', __name__)

def task_ownership_required(task_id):
    user_id = int(get_jwt_identity())
    task = Task.query.get(task_id)
    if not task or task.user_id != user_id:
        return None
    return task

@tasks_bp.route('', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = int(get_jwt_identity())
    project_id = request.args.get('project_id')
    
    query = Task.query.filter_by(user_id=user_id)
    if project_id:
        query = query.filter_by(project_id=project_id)
    
    tasks = query.all()
    return jsonify({'tasks': [t.to_dict() for t in tasks]}), 200

@tasks_bp.route('', methods=['POST'])
@jwt_required()
def create_task():
    data = request.get_json()
    user_id = int(get_jwt_identity())
    
    if not data or not data.get('title') or not data.get('project_id'):
        return jsonify({'error': 'Title and project_id are required'}), 400
    
    project = Project.query.get(data['project_id'])
    if not project or project.user_id != int(get_jwt_identity()):
        return jsonify({'error': 'Invalid project'}), 404
    
    task = Task(
        title=data['title'],
        description=data.get('description', ''),
        status=data.get('status', 'pending'),
        priority=data.get('priority', 'medium'),
        project_id=data['project_id'],
        user_id=user_id
    )
    
    db.session.add(task)
    db.session.commit()
    
    return jsonify({'message': 'Task created', 'task': task.to_dict()}), 201

@tasks_bp.route('/<int:task_id>', methods=['GET'])
@jwt_required()
def get_task(task_id):
    task = task_ownership_required(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    return jsonify({'task': task.to_dict()}), 200

@tasks_bp.route('/<int:task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    task = task_ownership_required(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    data = request.get_json()
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.status = data.get('status', task.status)
    task.priority = data.get('priority', task.priority)
    
    if 'due_date' in data:
        from datetime import datetime
        task.due_date = datetime.fromisoformat(data['due_date']) if data['due_date'] else None
    
    if 'project_id' in data:
        project = Project.query.get(data['project_id'])
        if not project or project.user_id != int(get_jwt_identity()):
            return jsonify({'error': 'Invalid project'}), 404
        task.project_id = data['project_id']
    
    db.session.commit()
    
    return jsonify({'message': 'Task updated', 'task': task.to_dict()}), 200

@tasks_bp.route('/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    task = task_ownership_required(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    db.session.delete(task)
    db.session.commit()
    
    return jsonify({'message': 'Task deleted'}), 200
