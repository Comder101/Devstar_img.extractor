import axios from 'axios';
import cheerio from 'cheerio';

const extractImages = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const images = [];

        $('img').each((index, element) => {
            images.push($(element).attr('src'));
        });

        return images;
    } catch (error) {
        throw new Error('Failed to extract images from the provided URL.');
    }
};

export default extractImages;
