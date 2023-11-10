import requests
from bs4 import BeautifulSoup
import re

URL = "https://newsatlas24.onrender.com/"
img_ext = requests.get(URL)

img_soup = BeautifulSoup(img_ext.content, "html.parser")

img_ext_tag = img_soup.find_all('img', {'src':re.compile('.jpeg')}, src = True)


img_found_url = []

for images in img_ext_tag:

    img_found_url.append(images['src']+'\n')

print(img_found_url)



