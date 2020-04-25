import re
import string


def remove_punct(text):
    '''text = text.translate(string.maketrans('',''), string.punctuation)'''
    text = "".join([char for char in text if char not in string.punctuation])
    #text = re.sub('[0-9]+', '', text)
    text = re.sub('"', '', text)
    text = re.sub('“', '', text)
    text = re.sub('”', '', text)
    text = re.sub('—', '', text)
    text = re.sub('฿', '', text)
    text = re.sub(".⃣", '', text)
    text = re.sub("\n", '', text)
    text = re.sub("twitter", '', text)
    text = re.sub("instragram", '', text)
    text = re.sub("facebook", '', text)
    text = re.sub("Unknown", '', text)
    text = re.sub("website", '', text)
    return text


def remove_url(text):
    text = "".join([char for char in text if char not in string.punctuation])
    text = re.sub(r"http\S+", "", text)
    return text

# https://stackoverflow.com/questions/33404752/removing-emojis-from-a-string-in-python


def remove_emoji(text):
    emoji_pattern = re.compile("["
                               u"\U0001F600-\U0001F64F"  # emoticons
                               u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                               u"\U0001F680-\U0001F6FF"  # transport & map symbols
                               u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                               u"\U00002500-\U00002BEF"  # chinese char
                               u"\U00002702-\U000027B0"
                               u"\U00002702-\U000027B0"
                               u"\U000024C2-\U0001F251"
                               u"\U0001f926-\U0001f937"
                               u"\U00010000-\U0010ffff"
                               u"\u2640-\u2642"
                               u"\u2600-\u2B55"
                               u"\u200d"
                               u"\u23cf"
                               u"\u23e9"
                               u"\u231a"
                               u"\ufe0f"  # dingbats
                               u"\u3030"
                               "]+", flags=re.UNICODE)
    return emoji_pattern.sub(r'', text)
