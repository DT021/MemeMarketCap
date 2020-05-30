import json, requests, os, io

from flask import Blueprint, jsonify, request, render_template

from controller.extensions import db
from controller.imgflip.schema import Template

database = Blueprint('database', __name__)

@database.route('/get_templates', methods=['GET'])
def get_templates():
    return jsonify(
        [
            (
                'https://'+template.imgflip_page+'?page={}',
                template.name
            ) for template in db.session.query(Template).all()
        ]
    )
