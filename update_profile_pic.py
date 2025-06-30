import os
import requests

USERNAME = os.environ.get('IG_USERNAME', 'davishaden_')
PASSWORD = os.environ.get('IG_PASSWORD')  # optional
SESSIONID = os.environ.get('IG_SESSIONID')  # cookie session id if already logged in

API_ENDPOINT = f"https://i.instagram.com/api/v1/users/web_profile_info/?username={USERNAME}"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0 Safari/537.36",
    "Accept": "application/json",
}

session = requests.Session()

if SESSIONID:
    session.cookies.set("sessionid", SESSIONID)

try:
    response = session.get(API_ENDPOINT, headers=HEADERS, timeout=10)
    response.raise_for_status()
    data = response.json()
    pic_url = data["data"]["user"]["profile_pic_url_hd"]
    img_data = session.get(pic_url, headers=HEADERS, timeout=10).content
    with open("Assets/me.jpg", "wb") as f:
        f.write(img_data)
    print("Profile picture updated.")
except Exception as e:
    print(f"Failed to update profile picture: {e}")
