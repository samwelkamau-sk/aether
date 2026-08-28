import google.generativeai as genai
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Task
from app import db
import os

ai_bp = Blueprint('ai', __name__)

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

@ai_bp.route('/suggest-priority', methods=['POST'])
@jwt_required()
def suggest_priority():
    data = request.get_json()
    title = data.get('title', '')
    description = data.get('description', '')
    
    prompt = f"""Given this task, suggest a priority level (high, medium, or low) and a brief reason.
    
Task Title: {title}
Description: {description}

Respond in JSON format: {{"priority": "...", "reason": "..."}}"""

    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(prompt)
        return jsonify({'suggestion': response.text}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/enhance-task', methods=['POST'])
@jwt_required()
def enhance_task():
    data = request.get_json()
    title = data.get('title', '')
    description = data.get('description', '')
    
    prompt = f"""Improve this task title and description to be more actionable and clear.
    
Original Title: {title}
Original Description: {description}

Respond in JSON format: {{"enhanced_title": "...", "enhanced_description": "..."}}"""

    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(prompt)
        return jsonify({'enhancement': response.text}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/productivity-tips', methods=['GET'])
@jwt_required()
def productivity_tips():
    user_id = int(get_jwt_identity())
    pending_tasks = Task.query.filter_by(user_id=user_id, status='pending').count()
    in_progress = Task.query.filter_by(user_id=user_id, status='in_progress').count()
    
    prompt = f"""Give 3 concise, actionable productivity tips for someone with {pending_tasks} pending tasks and {in_progress} tasks in progress. Keep tips under 20 words each."""

    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(prompt)
        return jsonify({'tips': response.text}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
