export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

//b2797ff764f84d479c904d0aad5008d4
export const Allnews =()=>
  `http://api.mediastack.com/v1/news?access_key=60b260b866e714f6b4b12fa4a98077e3&&categories=technology&languages=en&keywords=crypto&sort=published_desc& offset=0&limit=40`;

export const cryptoName = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const chartDetails = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
