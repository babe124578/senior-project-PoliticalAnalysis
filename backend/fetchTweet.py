from flask_cors import CORS, cross_origin
from flask import Flask, Response, request
import io
from auth import access_key
from clean import remove_emoji, remove_punct, remove_url
from tweepy import OAuthHandler
import tweepy
import json
import collections

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
                               q=keyword+' -filter:retweets',
                               g=ge,
                               lang=lang,
                               tweet_mode='extended',
                               result_type=typo).items(c):
        counter += 1
        dict_ = {'text': tweet.full_text,
                 'favC': tweet.favorite_count,
                 'retw': tweet.retweet_count,
                 'sum': tweet.favorite_count+tweet.retweet_count
                 }
        list_.append(dict_)
    return sorted(list_, key=lambda i: i['sum'], reverse=True)


def list_of_dict_to_pd(list_):
    newlist = []
    for i in list_:
        newlist.append(i['text'])
    return newlist


def cleanandcount(newlist):
    newerlist = []
    for i in newlist:
        i = remove_punct(i)
        i = remove_url(i)
        i = remove_emoji(i)
        newerlist.append(i)
    joinlist = ' '.join(text for text in newerlist)
    filtered_word = [word for word in joinlist.split()]
    counted_words = collections.Counter(filtered_word)
    tmp = []
    for letter, count in counted_words.most_common():
        tmp.append([letter, count])
    return tmp

def get_100_most_freq(temp):
    tmp = []
    for i in temp:
        if len(tmp) == 100:
            break
        if i[1] > 1:
            tmp.append({'text': i[0], 'value': i[1]})
    return tmp

@cross_origin()
@app.route('/test')
def test():
    return 'test'


@app.route('/tweetExample')
def fetchAPI():
    data = request.args.get('keyword')
    mixData = pullData(data, None, None, 'mixed', 50)
    df = list_of_dict_to_pd(mixData)
    return {'popular': mixData, 'agenda': mixData, 'new': mixData,'wordcloud': get_100_most_freq(cleanandcount(df))}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, use_reloader=True)
