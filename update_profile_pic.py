import os
import requests

USERNAME = os.environ.get("IG_USERNAME", "davishaden_")

# Public endpoint that doesn't require authentication
API_ENDPOINT = f"https://www.instagram.com/{USERNAME}/?__a=1&__d=dis"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118 Safari/537.36",
    "Accept": "application/json",
}


def update_profile_pic():
    """Download the user's current Instagram profile picture."""
    try:
        response = requests.get(API_ENDPOINT, headers=HEADERS, timeout=10)
        response.raise_for_status()
        data = response.json()
        pic_url = data["graphql"]["user"]["profile_pic_url_hd"]
        img_resp = requests.get(pic_url, headers=HEADERS, timeout=10)
        img_resp.raise_for_status()
        os.makedirs("Assets", exist_ok=True)
        with open("Assets/me.jpg", "wb") as fh:
            fh.write(img_resp.content)
        print("Profile picture updated.")
    except Exception as exc:
        print(f"Failed to update profile picture: {exc}")


if __name__ == "__main__":
    update_profile_pic()
