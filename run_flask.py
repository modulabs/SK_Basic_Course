from flask import Flask
from flask import jsonify
from flask import render_template
from flask import request
from flask import Response
import urllib

import json

'''import sys
for place in sys.path:
    print (place)'''

app = Flask(__name__, static_folder='./web', static_url_path='', template_folder='./web/template')

@app.route('/')
def home():
    return app.send_static_file('index.html')


'''@app.route('/background_process')
def background_process():
	try:
		lang = app.request.args.get('proglang', 0, type=str)
		if lang.lower() == 'python':
			return jsonify(result='You are wise')
		else:
			return jsonify(result='Try again.')
	except Exception as e:
		return str(e)'''


@app.route('/login/<userid>', methods=['GET', 'POST'])
def login(userid):
    print(">>>login")
    #return "Say Login to my little friend: %s" % userid
    return render_template('train2.html', userid=userid)




@app.route('/echo/<thing>')
def echo(thing):
    return "Say hello to my little friend: %s" % thing



app.run(host='192.168.0.13', port=9999, debug=True)