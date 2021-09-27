var axios = require('axios');
var assert = require('assert');

describe('Test endpoint \'/coin\'', async function() {
    describe('Verification generale', async function() {
        it('On doit recevoir 12 champs', async function() {
            const symbol = 'BTC';
            const data = await axios.get(`http://localhost:3000/coin?symbol=${symbol}`)
                .then((results) => {
                    return results.data;
                })
                .catch((error) => {
                    console.error(error);
                }).then((data) => {
                    return data;
                });
            
            assert.equal(Object.keys(data).length, 12);
            assert.ok(data.symbol);
            assert.ok(data.nom);
            assert.ok(data.rang);
            assert.ok(data.prix);
            assert.ok(data.volume_marche);
            assert.ok(data.volume_marche_24h);
            assert.ok(data.prix_bas_24h);
            assert.ok(data.prix_haut_24h);
            assert.ok(data.delta_1h);
            assert.ok(data.delta_24h);
            assert.ok(data.delta_7d);
            assert.ok(data.delta_30d);
        })
        it('On reçoit bien les informations de la crypto spécifié (BTC)', async function() {
            const symbol = 'BTC';
            const data = await axios.get(`http://localhost:3000/coin?symbol=${symbol}`)
                .then((results) => {
                    return results.data;
                })
                .catch((error) => {
                    console.error(error);
                }).then((data) => {
                    return data;
                });
            
            assert.equal(data.symbol, 'BTC');
            assert.equal(data.nom, 'Bitcoin');
            assert.equal(data.rang, 1);
        })
        it('On reçoit bien les informations de la crypto spécifié (ETH)', async function() {
            const symbol = 'ETH';
            const data = await axios.get(`http://localhost:3000/coin?symbol=${symbol}`)
                .then((results) => {
                    return results.data;
                })
                .catch((error) => {
                    console.error(error);
                }).then((data) => {
                    return data;
                });
            
            assert.equal(data.symbol, 'ETH');
            assert.equal(data.nom, 'Ethereum');
            assert.equal(data.rang, 2);
        })
    })
})