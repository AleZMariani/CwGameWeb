var cwgame = require("./cwgame");

var main = function(num){

  //NEW API
  var res = cwgame.gotoIt(11,10,{"initial_life":"XOOOOOOOOOXOXOOOOOOOXOOOXOOOOOXOOOOOXOOOXOOOOOOOXOXOOOOOOOOOXOOOOOOOOOXOXOOOOOOOXOOOXOOOOOXOOOOOXOOOXOOOOOOOXOXOOOOOOOOOX"});
  var res_s = res.final_state.split(',').join('');
  cwgame.printOX(res_s);
  }

if (require.main === module) {
  main();
}
