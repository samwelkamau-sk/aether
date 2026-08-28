import os
from app import create_app
from app.config import ProductionConfig, DevelopmentConfig

env = os.getenv('FLASK_ENV', 'development')
config = ProductionConfig if env == 'production' else DevelopmentConfig

app = create_app(config)

if __name__ == '__main__':
    app.run(debug=(env != 'production'))
