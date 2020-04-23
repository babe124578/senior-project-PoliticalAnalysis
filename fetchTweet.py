from flask_cors import CORS, cross_origin
from flask import Flask, Response, request
import io
from auth import access_key
from tweepy import OAuthHandler
import tweepy
import json

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

consumer_key = access_key['consumer_key']
consumer_secret = access_key['consumer_secret']
access_token = access_key['access_token']
access_secret = access_key['access_secret']
auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)
API = tweepy.API(auth)

def pullData(keyword, ge, lang, typo, c):
    list_ = []
    counter = 0
    for tweet in tweepy.Cursor(API.search,
                               q=keyword,
                               g=ge,
                               lang=lang,
                               tweet_mode='extended',
                               result_type=typo).items(c):
        counter += 1
        dict_ = {'text': tweet.full_text,
                 'favC': tweet.favorite_count
                 }
        list_.append(dict_)
    return sorted(list_, key=lambda i: i['favC'], reverse=True)


@cross_origin()
@app.route('/test')
def test():
    return 'test'


@app.route('/popular')
def popular():
    data = request.args.get('keyword')
    pulldata = pullData(data,None,None,'popular',5)
    return {'popular':pulldata}


@app.route('/agenda')
def agenda():
    data = request.args.get('keyword')
    return str('agenda'+data)


@app.route('/news')
def news():
    data = request.args.get('keyword')
    return str('news'+data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, use_reloader=True)
