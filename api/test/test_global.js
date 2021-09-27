var axios = require('axios');
var assert = require('assert');

describe('Test endpoint \'/global\'', async function() {
    describe('Verification generale', async function() {
        it('On doit recevoir 4 champs', async function() {
            const data = await axios.get('http://localhost:3000/global')
                .then((results) => {
                    return results.data;
                })
                .catch((error) => {
                    console.error(error);
                }).then((data) => {
                    return data;
                });
            
            assert.equal(Object.keys(data).length, 4);
            assert.ok(data.coins);
            assert.ok(data.markets);
            assert.ok(data.total_market_cap);
            assert.ok(data.total_volume_24h);
        })
        it('Par défaut, les infos reçues sont en US Dollars', async function() {
            const data_default_request = await axios.get('http://localhost:3000/global')
                .then((results) => {
                    return results.data;
                })
                .catch((error) => {
                    console.error(error);
                }).then((data) => {
                    return data;
                });
            const data_specified_usd = await axios.get('http://localhost:3000/global?currency=USD')
                .then((results) => {
                    return results.data;
                })
                .catch((error) => {
                    console.error(error);
                }).then((data) => {
                    return data;
                });

            assert.equal(data_default_request.coins, data_specified_usd.coins);
            assert.equal(data_default_request.markets, data_specified_usd.markets);
            assert.equal(data_default_request.total_market_cap, data_specified_usd.total_market_cap);
            assert.equal(data_default_request.total_volume_24h, data_specified_usd.total_volume_24h);
        })
    })
})