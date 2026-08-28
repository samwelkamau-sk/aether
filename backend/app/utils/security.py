import os
from flask import request, jsonify
from functools import wraps
import time
import logging

logger = logging.getLogger(__name__)

def setup_security_headers(app):
    @app.after_request
    def add_security_headers(response):
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        response.headers['Permissions-Policy'] = 'geolocation=(), microphone=(), camera=()'
        return response

def rate_limit(max_requests=100, window=60):
    def decorator(f):
        requests = {}
        
        @wraps(f)
        def decorated(*args, **kwargs):
            ip = request.remote_addr
            now = time.time()
            
            if ip not in requests:
                requests[ip] = []
            
            requests[ip] = [req_time for req_time in requests[ip] if now - req_time < window]
            
            if len(requests[ip]) >= max_requests:
                logger.warning(f'Rate limit exceeded for IP: {ip}')
                return jsonify({'error': 'Too many requests. Please try again later.'}), 429
            
            requests[ip].append(now)
            return f(*args, **kwargs)
        return decorated
    return decorator
