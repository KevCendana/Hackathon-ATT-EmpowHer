
require('dotenv').config();
const axios = require('axios');

exports.handler = async function(event, context) {
    const apiKey = process.env.NEWS_API_KEY; // get api key from netlify environment variables    
    const API_ENDPOINT = `https://newsapi.org/v2/everything?q=5G&pageSize=5&sortBy=relevance&language=en&apiKey=${apiKey}`;
    console.log("API Key:", apiKey);

    try {
        const response = await axios.get(API_ENDPOINT);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: error.response.status,
            body: JSON.stringify(error.response.data)
        };
    }
};
