"""The main webserver for the project"""

import json
from flask import Flask, render_template, request
from flask_cors import CORS
import calendar_read
import user_add
import calendar_algor
app = Flask(__name__)
CORS(app)

@app.route("/get_timetable", methods=["GET"])
def get_timetable():
    """Handles the get_stock_price API call"""
    response_data = calendar_read.read_calendar()
    return json.dumps(response_data)


@app.route("/user_input", methods=["POST"])
def user_input():
    """For when the user makes a mistake that needs to be logged"""
    data = json.loads(json.dumps(request.json))
    user_add.event_add("ctest.csv", data['title'],data['time'],data['duration'] ,request.json)
    return json.dumps(1)

@app.route("/generate_timetable", methods=["GET"])
def generate_timetable():
    calendar = calendar_algor.output_calendar()
    return json.dumps(calendar)

@app.route("/generate_final_report", methods=["POST"])
def final_report():
    """Sends the final failure report for the client through email"""
    results_email.send()

    return json.dumps(1)

if __name__ == ("__main__"):
    app.run(debug=True, port = '3001')
