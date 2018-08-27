var express = require('express');
var router = express.Router();
var sql = require('mssql');


// Connection string parameters.
var sqlConfig = {
    user: 'arulr1',
    password: 'P@ssw0rd',
    server: 'fthictsql04.ict.op.ac.nz',
    database: 'IN705_201802_arulr1'
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getQuestions', function(req, res, next) {
   sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        request.query('select * from Question', function(err, recordset) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordset)); // Result in JSON format
            sql.close();
        });
    });
});

router.get('/getstudent', function(req, res, next) {
   sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        request.query('select * from Student where studentId=1', function(err, recordsets) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordsets)); // Result in JSON format
            sql.close();
        });
    });
});


module.exports = router;
