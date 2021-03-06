from flask import Flask, render_template, request, url_for, jsonify
from algo import relExtract, company_name, wiki_url, extract_text
app = Flask(__name__)

@app.route('/classify_url', methods=['POST'])
def classify_url():
	if(request.method == 'POST'):
		company = request.form['company']
		summary = request.form['summary']
		relations = relExtract(company, summary)
		rel_text =""
		for rel in relations:
			rel_text += rel + ":"
		return rel_text

   	return "Didn't receive shit"

@app.route('/get_url', methods = ['POST'])
def get_url():
	# Want to ignore new tabs #

	if(request.method == 'POST'):
		curr_url = request.form['current_domain']
		curr_company = company_name(curr_url)
		if(curr_url == None) or curr_url == 'newtab':
			return "None"
		relevant_url = wiki_url(curr_company)
		summary = extract_text(relevant_url)
		relations = relExtract(curr_company, summary)
		rel_text =""
		for rel in relations:
			rel_text += rel + ":"
		return rel_text
	return "nothing from get_url"


if __name__ == '__main__':
    app.run()