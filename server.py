from flask import Flask, render_template, request, url_for, jsonify
from algo import relExtract
app = Flask(__name__)

@app.route('/classify_url', methods=['POST'])
def get_bot_mission():
	if(request.method == 'POST'):
		company = request.form['company']
		summary = request.form['summary']
		relations = relExtract(company, summary)
		rel_text =""
		for rel in relations:
			rel_text += rel + ":"
		return rel_text

   	return "Didn't receive shit"


if __name__ == '__main__':
    app.run()