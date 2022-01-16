var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.cookies.user_id)
    res.render('index', { title: 'Express' });
  else 
    res.redirect('prijava');
});

module.exports = router;
