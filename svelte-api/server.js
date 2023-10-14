const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = 3001;

app.use(express.json());

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const imgUrls = $('img').map((_, img) => $(img).attr('src')).get();
    res.json({ success: true, imgUrls });
    
    // const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    // const separatedUrls = {
    //   jpg: [],
    //   jpeg: [],
    //   png: [],
    //   other: [],
    // };

    // imgUrls.forEach(url => {
    //   const ext = url.slice(((url.lastIndexOf(".") - 1) >>> 0) + 2);
    //   if (allowedExtensions.includes('.' + ext.toLowerCase())) {
    //     separatedUrls[ext.toLowerCase()].push(url);
    //   } else {
    //     separatedUrls.other.push(url);
    //   }
    // });

    // res.json({ success: true, separatedUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
