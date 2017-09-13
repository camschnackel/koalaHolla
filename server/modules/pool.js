var Pool = require('pg').Pool;

var config = {
    host: 'localhost',
    port: 5432,
    database: 'SQL_practice',
    max: 20
};

var pool = new Pool(config);
module.exports = pool;