import express from 'express';
import extractImages from './imageExtractor.js'; // Import the extractImages function

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    res.send('Send a POST request to /api/extractImages with the URL to extract images.');
});

app.post('/api/extractImages', async (req, res) => {
    const { url } = req.body;

    try {
        const images = await extractImages(url); // Use the extractImages function
        res.json({ images });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default app;
