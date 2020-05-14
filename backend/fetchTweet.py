import io
import tweepy
import json
import collections
import pandas as pd

from flask_cors import CORS, cross_origin
from flask import Flask, Response, request

from auth import access_key
from clean import remove_emoji, remove_punct, remove_url
from tweepy import OAuthHandler
from model.isAgendaPredict import isAgendaPredict
from model.isNewsPredict import isNewPredict
from model.agreeGovPredict import agreeGovPredict
from model.agreeOpPredict import agreeOpPredict
from model.disAgreeGovPredict import disAgreeGovPredict
from model.disAgreeOpPredict import disAgreeOpPredict

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#key and secret store in auth.py same directory of this file 
#in auth.py have structure like this ... 

#copy 4 lines below to auth.py then remove "#" and use your own key and secret
# access_key = {'consumer_key':'<your-consumer-key>',
# 'consumer_secret':'<your-consumer-secret>',
# 'access_token':'<your-access-token>',
# 'access_secret':'<your-access-secret>'}

consumer_key = access_key['consumer_key']
consumer_secret = access_key['consumer_secret']
access_token = access_key['access_token']
access_secret = access_key['access_secret']
auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)
API = tweepy.API(auth)

# get tweet


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

# wordcloud part


def get_list_of_text(list_):
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

# predict part


def getDf(list_):
    return pd.DataFrame(list_)


def predict(df,fnName):
    df = fnName(df)
    try:
        df = df.drop(['processed'], axis=1)
    except:
        pass
    try:
        df = df.drop(['wc'], axis=1)
    except:
        pass
    try:
        df = df.drop(['uwc'], axis=1)
    except:
        pass
    return df


@cross_origin()
@app.route('/test')
def test():
    return 'test'


@app.route('/tweetExample')
def fetchAPI():
    data = request.args.get('keyword')
    mixData = pullData(data, None, None, 'mixed', 50)

    if len(mixData) > 0:
        predNew = predict(getDf(mixData),isNewPredict)
        predAgn = predict(predNew,isAgendaPredict)
        predGov = predict(predAgn,agreeGovPredict)
        predDgv = predict(predGov,agreeOpPredict)
        predOp = predict(predDgv,disAgreeGovPredict)
        predDO = predict(predOp,disAgreeOpPredict)
        predFinal = predDO.to_dict('result')

        news_, agenda_, agreeGov_, agreeOp_, disAgreeGov_, disAgreeOp_ = [],[],[],[],[],[]
        for i in predFinal:
            if i['isNews'] == 1:
                news_.append(i)
            if i['isAgenda'] == 1:
                agenda_.append(i)
            if i['isAgreeGov'] == 1:
                agreeGov_.append(i)
            if i['isAgreeOp'] == 1:
                agreeOp_.append(i)
            if i['isDisagreeGov'] == 1:
                disAgreeGov_.append(i)
            if i['isDisagreeOp'] == 1:
                disAgreeOp_.append(i)

        text = get_list_of_text(mixData)
        return {'popular': predFinal, 'agenda': agenda_, 'new': news_, 'agreeGov': agreeGov_, 'agreeOp': agreeOp_, 'disAgreeGov': disAgreeGov_, 'disAgreeOp': disAgreeOp_, 'wordcloud': get_100_most_freq(cleanandcount(text))}
    else:
        return {'popular': [], 'agenda': [], 'new': [], 'agreeGov': [], 'agreeOp': [], 'disAgreeGov': [], 'disAgreeOp': [], 'wordcloud': []}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, use_reloader=True)
