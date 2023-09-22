//--------------------------------------------------------------------------------------//
//                                 Section 6: News API                                  //
//--------------------------------------------------------------------------------------//

// listener for the DOMContentLoaded event to ensure the page is fully loaded before fetching news
document.addEventListener('DOMContentLoaded', function() {
    fetchNews();
});

// function to fetch news articles from the NewsAPI
function fetchNews() {
    const endpoint = "/.netlify/functions/fetchData";

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching news: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.articles && data.articles.length > 0) {
                displayNews(data.articles);
            } else {
                console.error("No articles found");
            }
        })
        .catch(error => {
            console.error("Error fetching news:", error);
        });
}


// function to display news articles on the page
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    let newsHTML = '';

    // loop through each article and create a news card
    articles.forEach(article => {
        newsHTML += `
            <div class="news-card">
                <img src="${article.urlToImage}" alt="${article.title}">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            </div>
        `;
    });

    newsContainer.innerHTML = newsHTML; // display the news cards on the page
}
