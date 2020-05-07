import numpy as np
import pandas as pd

from pythainlp.ulmfit import process_thai

from sklearn.feature_extraction.text import TfidfVectorizer
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

def disAgreeGovPredict(df):

    tfidf_fit = joblib.load('disAgreeGovtfidf.sav')

    text = tfidf_fit.transform(df["text"])

    X = text.toarray()

    loaded_model = joblib.load('disAgreeGov.sav')
    result = loaded_model.predict(X)

    df["isDisagreeGov"] = result

    return df
