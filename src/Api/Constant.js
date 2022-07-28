export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

//b2797ff764f84d479c904d0aad5008d4
export const Allnews = (topic = "Cryptocurrency") =>
  `https://newsapi.org/v2/everything?q=${topic}&from=2022-06-28&sortBy=popularity&apiKey=b2797ff764f84d479c904d0aad5008d4`;

export const cryptoName = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const chartDetails = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
