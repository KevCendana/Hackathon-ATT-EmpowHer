const axios = require('axios');

exports.handler = async function(event, context) {
    const apiKey = 'c21b6e7e48d84f10868639ab29956485';
    const API_ENDPOINT = "https://newsapi.org/v2/everything?q=5G&pageSize=5&sortBy=relevance&language=en&apiKey=${apiKey}"; // Replace with your API endpoint
    try {
        const response = await axios.get(API_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
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
