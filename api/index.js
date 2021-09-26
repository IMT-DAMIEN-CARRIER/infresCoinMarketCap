const express = require('express')
const app = express()
const port = 3000
const axios = require('axios').default;
const key = '0f3f5c279b7bfe4e'

app.get('/', (req, res) => {
    const currency = 'USD';
    const page = '1';
    const order = 'rank_asc';

    axios.get('https://coinlib.io/api/v1/coinlist', { params: { key: key, pref: currency, page: page, order: order} })
        .then((results) => {
            const data = results.data;
            let crypto = [];

            data.coins.forEach(coin => {
              crypto.push( {symbol: coin.show_symbol, name: coin.name, rank: coin.rank, price: coin.price, delta_24h: coin.delta_24h } );
            });

            res.send(crypto);
        })
        .catch((error) => {
            console.error(error);
        });
});

app.get('/coin', (req, res) => {
    const reqSymbol = req.query.symbol;
    const symbol = (reqSymbol !== '') ? reqSymbol : 'BTC';

    axios.get('https://coinlib.io/api/v1/coin', {params: {key: key, symbol: symbol}})
        .then((results) => {
            const data = results.data;

            res.send({
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
            });
        })
        .catch((error) => {
            console.error(error);
        });
});

app.get('/global', (req, res) => {
    const reqCurrency = req.query.currency;
    const currency = (reqCurrency !== '') ? reqCurrency : 'USD'

    axios.get('https://coinlib.io/api/v1/global', {params: {key: key, pref: currency}})
        .then((results) => {
            const data = results.data;

            res.send({
                coins: data.coins,
                markets: data.markets,
                total_market_cap: data.total_market_cap,
                total_volume_24h: data.total_volume_24h
            });
        })
        .catch((error) => {
            console.error(error);
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});