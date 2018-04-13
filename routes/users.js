var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/user/:userid', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous  l\'user avec l\'id ' + req.params.userid);
});

module.exports = router;
