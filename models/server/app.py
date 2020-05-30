from flask import Flask, jsonify, render_template, request
from decouple import config

from sentry_sdk.integrations.flask import FlaskIntegration

from server.sentry import integrate_sentry
from server.classes import ModelHandler

def create_app(settings_override=None):
    # sentry()

    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object('config.flask')

    @app.route('/')
    def index():
        return jsonify('Owen Burton brought the speed cow after the party.')

    @app.route('/predict', methods=['GET', 'POST'])
    def predict():
        try:
            payload = request.get_json(force=True)
        except:
            return jsonify('The speed cow requires json')
        else:
            start = time.time()
            output = ModelHandler.predict(payload)
            time_to_predict = time.time() - start

            return jsonify({
                "output": output,
                "time_to_predict": time_to_predict,
            })

    @app.route('/debug_sentry')
    def trigger_error():
        division_by_zero = 1 / 0

    return app


def sentry():
    integrate_sentry(FlaskIntegration)
    integrate_sentry(CeleryIntegration)
    integrate_sentry(RedisIntegration)
    integrate_sentry(SqlalchemyIntegration)
