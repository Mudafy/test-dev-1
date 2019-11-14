
import os

# uncomment the line below for postgres database url from environment variable
# postgres_local_base = os.environ['DATABASE_URL']

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_precious_secret_key')
    DEBUG = False
    JWT_TOKEN_LOCATION = ('headers', 'json')
    JWT_ERROR_MESSAGE_KEY = "message"
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'zekrit dont tell plz')
    JWT_ACCESS_TOKEN_EXPIRES = 60 * 24  # Minutes
    JWT_IDENTITY_CLAIM = 'sub'
    JWT_HEADER_TYPE = ''
    SWAGGER_UI_JSONEDITOR = True


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    DEBUG = True
    TESTING = True


class ProductionConfig(Config):
    DEBUG = False


config_by_name = dict(
    development=DevelopmentConfig,
    test=TestingConfig,
    production=ProductionConfig
)

key = Config.SECRET_KEY
