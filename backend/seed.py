import os
import sys
from datetime import datetime, timedelta, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app, db
from app.models import User, Project, Task

os.environ['DATABASE_URL'] = 'sqlite:///taskflow.db'
app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    users = [
        User(username='alice', email='alice@example.com'),
        User(username='bob', email='bob@example.com'),
        User(username='carol', email='carol@example.com'),
    ]

    for user in users:
        user.set_password('password123')

    db.session.add_all(users)
    db.session.commit()

    projects_data = [
        ('Website Redesign', 'Overhaul the company marketing website with new branding', 'active', 1),
        ('Mobile App Launch', 'Launch the iOS and Android mobile applications', 'active', 1),
        ('Brand Identity System', 'Create a comprehensive brand identity package', 'completed', 2),
        ('E-commerce Platform', 'Build a scalable online store with payment integration', 'active', 2),
        ('Data Analytics Dashboard', 'Develop real-time analytics and reporting dashboard', 'active', 3),
    ]

    projects = []
    for name, description, status, user_id in projects_data:
        project = Project(name=name, description=description, status=status, user_id=user_id)
        projects.append(project)

    db.session.add_all(projects)
    db.session.commit()

    tasks_data = [
        ('Design homepage mockup', 'Create high-fidelity mockup for the new homepage', 'completed', 'high', 1, 1),
        ('Implement responsive navigation', 'Build mobile-friendly navigation component', 'in_progress', 'medium', 2, 1),
        ('Set up CI/CD pipeline', 'Configure GitHub Actions for automated deployment', 'pending', 'high', 2, 1),
        ('Design logo variations', 'Generate primary, secondary, and icon logo versions', 'completed', 'medium', 3, 2),
        ('Create brand style guide', 'Document colors, typography, and usage rules', 'in_progress', 'high', 3, 2),
        ('Set up payment gateway', 'Integrate Stripe for payment processing', 'pending', 'high', 4, 2),
        ('Build product catalog', 'Create product listing pages with filters', 'in_progress', 'medium', 4, 2),
        ('Design dashboard wireframes', 'Create low-fidelity wireframes for analytics views', 'completed', 'medium', 5, 3),
        ('Implement chart components', 'Build reusable chart components with D3.js', 'in_progress', 'high', 5, 3),
        ('Set up WebSocket connections', 'Enable real-time data streaming for dashboard', 'pending', 'low', 5, 3),
    ]

    tasks = []
    for title, description, status, priority, project_id, user_id in tasks_data:
        due = datetime.now(timezone.utc) + timedelta(days=(7 if status == 'pending' else -3))
        task = Task(
            title=title,
            description=description,
            status=status,
            priority=priority,
            project_id=project_id,
            user_id=user_id,
            due_date=due,
        )
        tasks.append(task)

    db.session.add_all(tasks)
    db.session.commit()

    print('Database seeded successfully!')
    print(f'Users: {len(users)}')
    print(f'Projects: {len(projects)}')
    print(f'Tasks: {len(tasks)}')
