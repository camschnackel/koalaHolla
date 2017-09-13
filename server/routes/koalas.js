var router = require('express').Router();
var pool = require('../modules/pool');

router.get('/', function(req, res) {
    console.log('in the getKoala route');
    pool.connect(function(connectError, client, done) {
        if (connectError){
            console.log(connectError);
            res.sendStatus(501);
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

router.post('/', function(req, res){
    var input = req.body
    console.log('in koala post with', input);
    pool.connect(function(err, client, done){
        if(err) {
            console.log('error is', err);
            res.sendStatus(500);
        } else {
            var queryString = 'INSERT INTO koalaholla (name, age, gender, notes, ready_for_transfer) VALUES ($1, $2, $3, $4, $5)';
            var values = [input.name, input.age, input.gender, input.notes, input.readyForTransfer];
            console.log('values ->', values);
            client.query(queryString, values, function(queryErr, resultObj){
                done();
                if (queryErr){
                    console.log('error:', queryErr);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });

});

module.exports = router