import numpy as np
import pandas as pd

from pythainlp.ulmfit import process_thai

from sklearn.feature_extraction.text import TfidfVectorizer
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

def isNewPredict(df);
    df["processed"] = df.text.map(lambda x: "|".join(process_thai(x)))
    df["wc"] = df.processed.map(lambda x: len(x.split("|")))
    df["uwc"] = df.processed.map(lambda x: len(set(x.split("|"))))

    tfidf_fit = joblib.load('tfidf.sav')

    text = tfidf_fit.transform(df["text"])


    scaler = StandardScaler()
    scaler_fit = scaler.fit(df[["wc","uwc"]].astype(float))

    num = scaler_fit.transform(df[["wc","uwc"]].astype(float))
    X = np.concatenate([num,text.toarray()],axis=1)

    loaded_model = joblib.load('isNews.sav')
    result = loaded_model.predict(X)

    df["result"] = result

    return df
