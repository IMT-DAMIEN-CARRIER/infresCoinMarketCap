const express = require('express')
const app = express()
const port = 3000
const axios = require('axios').default;
const key = '0f3f5c279b7bfe4e'

app.get('/', (req, res) => {
  res.send('Welcome on board !')
});

app.get(`/getinfoscoin`, async (req, res, next) => {
  try {
    let reqSymbol = req.query.symbol;
    let symbol = (reqSymbol !== '') ? reqSymbol : 'BTC';
    let res = await axios.get('https://coinlib.io/api/v1/coin', { params: { key: key, symbol: symbol } });
    let data = res.data;

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
  }
  catch (err) {
    next(err)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});