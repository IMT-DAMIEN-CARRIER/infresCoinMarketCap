const express = require('express')
const app = express()
const port = 3000
const axios = require('axios').default;
const key = '0f3f5c279b7bfe4e'

app.get('/', async (req, res, next) => {
  let currency = 'USD'
  let page = '1'
  let order = 'rank_asc';
  try {
    let result = await axios.get('https://coinlib.io/api/v1/coinlist', { params: { key: key, pref: currency, page: page, order: order} });
    res.send(result.data);
  } catch (err) {
    next(err);
  }
});

app.get('/coin', (req, res, next) => {
  let reqSymbol = req.query.symbol;
  let symbol = (reqSymbol !== '') ? reqSymbol : 'BTC';

  axios.get('https://coinlib.io/api/v1/coin', { params: { key: key, symbol: symbol } })
      .then((data) => {
        return {
          symbol: data.symbol,
          nom: data.name,
          rang: data.rank,
          prix: data.price,
          volume_marche: data.market_cap,
          volume_marche_24h: data.total_volume_24h,
          prix_bas_24h: data.low_24h,
          prix_haut_24h: data.high_24h,
          delta_1h: data.delta_1h,
          delta_24h: data.delta_24h,
          delta_7d: data.delta_7d,
          delta_30d: data.delta_30d
        }
      })
      .catch((error) => {
        console.log(error);
      });
});

app.get('/global', async (req, res, next) => {
  let reqCurrency = req.query.currency;
  let currency = (reqCurrency !== '') ? reqCurrency : 'USD'

  axios.get('https://coinlib.io/api/v1/global', { params: { key: key, pref: currency} })
      .then((data) => {
        return {
          coins: data.coins,
          markets: data.markets,
          total_market_cap: data.total_market_cap,
          total_volume_24h: data.total_volume_24h
        };
      })
      .catch((error) => {
        console.error(error);
      })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});