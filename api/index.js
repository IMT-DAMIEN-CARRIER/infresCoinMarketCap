// CORS pour les autorisations sur les requêtes
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({
        path: './config/config.env'
    });
}

// view engine setup
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    const currency = 'USD';
    const page = '1';
    const order = 'rank_asc';

    axios.get('https://coinlib.io/api/v1/coinlist', {
        params: {
            key: process.env.API_KEY,
            pref: currency,
            page: page,
            order: order
        }
    })
        .then((results) => {
            const data = results.data;
            let crypto = [];

            data.coins.forEach(coin => {
                crypto.push({
                    symbol: coin.show_symbol,
                    name: coin.name,
                    rank: coin.rank,
                    price: coin.price,
                    delta_24h: coin.delta_24h
                });
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

    axios.get('https://coinlib.io/api/v1/coin', {params: {key: process.env.API_KEY, symbol: symbol}})
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

    axios.get('https://coinlib.io/api/v1/global', {params: {key: process.env.API_KEY, pref: currency}})
        .then((results) => {
            const data = results.data;

            res.send({
                coins: data.coins,
                markets: data.markets,
                total_market_cap: Number(data.total_market_cap).toFixed(2),
                total_volume_24h: Number(data.total_volume_24h).toFixed(2)
            });
        })
        .catch((error) => {
            console.error(error);
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});