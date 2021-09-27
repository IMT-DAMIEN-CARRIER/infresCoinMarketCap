var axios = require('axios');
var assert = require('assert');

describe('Test endpoint \'/\'', async function() {
    describe('Verification generale', async function() {
        it('Doit contenir 100 elements', async function() {
            let data = await axios.get('http://localhost:3000/')
                .then((results) => {
                    return results.data;
                })
                .catch((error) => {
                    console.error(error);
                }).then((data) => {
                    return data;
                });
            
            assert.equal(data.length, 100);
        })
        it('Chaque element reçu doit avoir 5 champs', async function() {
            let data = await axios.get('http://localhost:3000/')
                .then((results) => {
                    return results.data;
                })
                .catch((error) => {
                    console.error(error);
                }).then((data) => {
                    return data;
                });

            assert.equal(Object.keys(data[0]).length, 5);
        })
        it('Le premier élément reçu contient les infos du Bitcoin', async function() {
            let data = await axios.get('http://localhost:3000/')
                .then((results) => {
                    return results.data;
                })
                .catch((error) => {
                    console.error(error);
                }).then((data) => {
                    return data;
                });

            assert.equal(data[0].rank, 1);
            assert.equal(data[0].symbol, 'BTC');
            assert.equal(data[0].name, 'Bitcoin');
        })
    })
})