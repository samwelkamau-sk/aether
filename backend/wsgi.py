import os
from app import create_app
from app.config import ProductionConfig
from app.utils.logging import setup_logging
from app.utils.security import setup_security_headers

app = create_app(ProductionConfig)
setup_logging(app)
setup_security_headers(app)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
