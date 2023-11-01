const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const https = require('https');


const app = express();
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 5000;


    // Parse HTML using Cheerio
    const $ = cheerio.load(html);

    // Select image elements (adjust the selector based on the structure of the HTML)
    const imageElements = $('img');


  try {
    const response = await axios.get(url, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    const $ = cheerio.load(response.data);


    // Filter URLs by extension (e.g., only include '.jpg' and '.png' images)
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const filteredUrls = imageUrls.filter(url => allowedExtensions.some(ext => url.endsWith(ext)));

    return filteredUrls;
  } catch (error) {
    console.error('Error:', error.message);
  }
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

});
