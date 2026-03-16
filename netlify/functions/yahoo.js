exports.handler = async function(event, context) {
    // 1. Get the stock ticker we are asking for
    const ticker = event.queryStringParameters.ticker;
    
    if (!ticker) {
        return { statusCode: 400, body: "Missing ticker symbol" };
    }

    // 2. The Yahoo Finance URL
    const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=max`;

    try {
        // 3. Fetch the data. Servers don't care about CORS, so Yahoo lets us right in!
        const response = await fetch(targetUrl);
        const data = await response.json();

        // 4. Send the data back to your frontend website
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed fetching data from Yahoo' })
        };
    }
};