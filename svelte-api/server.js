const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeImages(url) {
  try {
    // Fetch HTML content of the page
    const response = await axios.get(url);
    const html = response.data;

    // Parse HTML using Cheerio
    const $ = cheerio.load(html);

    // Select image elements (adjust the selector based on the structure of the HTML)
    const imageElements = $('img');

    // Extract image source URLs
    const imageUrls = imageElements.map((_, element) => $(element).attr('src')).get();

    // Filter URLs by extension (e.g., only include '.jpg' and '.png' images)
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const filteredUrls = imageUrls.filter(url => allowedExtensions.some(ext => url.endsWith(ext)));

    return filteredUrls;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example usage
const url = 'https://www.iitb.ac.in/';
scrapeImages(url).then(filteredUrls => {
  console.log('Filtered Image URLs:', filteredUrls);
});
