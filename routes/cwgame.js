var express = require('express');
var router = express.Router();
var cwgame = require('../private/script/cwgame');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CWGAME' });
});

/* POST home page. */
router.post('/cwgame', function(req, res, next){
  var is  = '';
  var sz = '';
  var ite = '';
  if(req.body == {}){
    is  = req.query.initial_state;
    sz  = req.query.size;
    ite = req.query.it;
  }else{
    is  = req.body.initial_state;
    sz  = req.body.size;
    ite = req.body.it;
  }

  var response = cwgame.gotoIt(sz,ite,{"initial_life":is});
  var res_s = response.final_state.split(',').join('');



    res.render('cwgame', { title: 'CWGAME' ,initial_state: is , size:sz, it:ite, result:res_s });

});

module.exports = router;
