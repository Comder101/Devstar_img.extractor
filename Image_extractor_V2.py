import requests
from bs4 import BeautifulSoup
import re

def extract_image_urls(url):
    
    response = requests.get(url)
    
    
    if response.status_code == 200:
       
        soup = BeautifulSoup(response.text, 'html.parser')
        
        
        img_tags = soup.find_all('img', src=True)
        
        ##Extract URLs that end with .png, .jpeg, or .jpg
        image_urls = [img['src'] for img in img_tags if re.search(r'\.(png|jpeg|jpg|gif)$', img['src'])]

        return image_urls
    else:
        
        print(f"Error: Unable to fetch the webpage. Status code: {response.status_code}")
        return []

url_to_scrape_img = URL = "https://www.iitb.ac.in/"
image_urls = extract_image_urls(url_to_scrape_img)


for i, url in enumerate(image_urls, start=1):
    print(f"Image {i}: {url}")
