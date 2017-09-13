var router = require('express').Router();
var pool = require('../modules/pool');

router.get('/', function(req, res) {
    console.log('in the getKoala route');
    pool.connect(function(connectError, client, done) {
        if (connectError){
            console.log(connectError);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM koalaholla', function(queryError, resultObj) {
                done();
                if (queryError) {
                    console.log(queryError);
                    res.sendStatus(500);
                } else {
                    console.log('resultsObject -->', resultObj);
                    res.send(resultObj.rows);
                }
            });
        }
    });
});

module.exports = router