const express = require('express')
const app = express()
const port = 3000
const axios = require("axios").default;
const key = '0f3f5c279b7bfe4e'

app.get(`/getinfoscoin`, async (req, res, next) => {
  try {
    if(req.query.symbol != "") {
      let symbol = req.query.symbol;
    }
    else {
      let symbol = "BTC";
    }
    const res = await axios.get("https://coinlib.io/api/v1/coin", { params: { key: key, symbol: symbol } });
    const data = res.data;
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
