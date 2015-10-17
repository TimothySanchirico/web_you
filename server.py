from flask import Flask, render_template, request, url_for, jsonify
from test_func import peter_func
app = Flask(__name__)

@app.route('/tests/endpoint', methods=['POST'])
def get_bot_mission():
	if(request.method == 'POST'):
		data = request.form['test_field'] 
		return "post req recieved: " + peter_func(data)

   	return "Didn't receive shit"


if __name__ == '__main__':
    app.run()