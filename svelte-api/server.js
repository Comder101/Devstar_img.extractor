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
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
