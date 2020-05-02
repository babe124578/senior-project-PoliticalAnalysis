import numpy as np
import pandas as pd

from pythainlp.ulmfit import process_thai

from sklearn.feature_extraction.text import TfidfVectorizer
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

def agreeGovPredict(df):
    df["processed"] = df.text.map(lambda x: "|".join(process_thai(x)))

    token_fit = joblib.load('token.sav')

    text = token_fit.transform(df["text"])

    X = text.toarray()

    loaded_model = joblib.load('agreeGov.sav')
    result = loaded_model.predict(X)

    df["isAgreeGov"] = result

    return df
