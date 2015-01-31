var DEFAULT_DIM_TABLE_SIDE = 5;
var DEFAULT_NUM_IT = 256;
var table = [];

function init_empty(){
  for(var x=0;x<DIM_TABLE_SIDE;x++){
    table[x] = [];
    for(var y=0;y<DIM_TABLE_SIDE;y++){
      table[x][y] = 0;
    }
  }
};


function clone (existingArray) {
  var newObj = (existingArray instanceof Array) ? [] : {};
  for (i in existingArray) {
    if (i == 'clone') continue;
    if (existingArray[i] && typeof existingArray[i] == "object") {
      newObj[i] = clone(existingArray[i]);
    } else {
      newObj[i] = existingArray[i]
    }
  }
  return newObj;
};

function checkNumNeighAlive(x,y){

  var num_alive = 0;
  if(table[x-1] && table[y-1] && table[x-1][y-1]){
    if(table[x-1][y-1] == 1){
      num_alive += 1;
    }
  }
  if(table[x-1] && table[x-1][y]){
    if(table[x-1][y] == 1){
      num_alive += 1;
    }
  }
  if(table[x-1] && table[y+1] && table[x-1][y+1]){
    if(table[x-1][y+1] == 1){
      num_alive += 1;
    }
  }
  if(table[y-1] && table[x][y-1]){
    if(table[x][y-1] == 1){
      num_alive += 1;
    }
  }
  if(table[y+1] && table[y+1] &&  table[x][y+1]){
    if(table[x][y+1] == 1){
      num_alive += 1;
    }
  }
  if(table[x+1] && table[y-1] && table[x+1][y-1]){
    if(table[x+1][y-1] == 1){
      num_alive += 1;
    }
  }
  if(table[x+1] && table[x+1][y]){
    if(table[x+1][y] == 1){
      num_alive += 1;
    }
  }
  if(table[x+1] && table[y+1] && table[x+1][y+1]){
    if(table[x+1][y+1] == 1){
      num_alive += 1;
    }
  }
  return num_alive;

};

/*
Any live cell with fewer than two live neighbours dies, as if caused by under-population.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overcrowding.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/
function rules(na,current_life)
{
  var new_life_status = 0;

  if((na<2) && (current_life==1)){
    new_life_status= 0;
  }
  if(((na==2)||(na==3)) && (current_life==1)){
    new_life_status= 1;
  }
  if((na==3) && (current_life==0)){
    new_life_status= 1;
  }
  if((na>3) && (current_life==1)){
    new_life_status= 0;
  }
  return new_life_status;
}

function update_life_status(x,y,nxt_life_status,table){
    table[x][y] = nxt_life_status;
}

function tick(){
  var new_table = clone(table);
  for(var x=0;x<DIM_TABLE_SIDE;x++){
    for(var y=0;y<DIM_TABLE_SIDE;y++){

      var num_alive_neigh = checkNumNeighAlive(x,y);
      var nxt_life_status = rules(num_alive_neigh,table[x][y]);
      update_life_status(x,y,nxt_life_status,new_table);

    }
  }
  table = clone(new_table);

};


function init_size(size){
  DIM_TABLE_SIDE = size || DEFAULT_DIM_TABLE_SIDE;
  init_empty();

}

function start(num_iteration){
  NUM_IT         = num_iteration || DEFAULT_NUM_IT;
  for(var i=0;i<NUM_IT;i++){
    tick();
  }
}

function load_init_life(data){
    var jsonData = JSON.parse(JSON.stringify(data));
    var initial_life = jsonData.initial_life || [];

    for(var i=0; i<initial_life.length; i++){
        if(initial_life[i]==1 || initial_life[i]=='X')
        {
          table[Math.floor(i/DIM_TABLE_SIDE)][i%DIM_TABLE_SIDE]=1;
        }

    }
}

exports.printOX = function (data){
  x = 0;
  while(x<data.length){
    console.log(data.slice(x,x+DIM_TABLE_SIDE));
    x+=DIM_TABLE_SIDE;
  }
};

exports.gotoIt = function(size,it,initial_life){
  init_size(size);
  load_init_life(initial_life);
  start(it);
  return JSON.parse( '{"final_state":"'+table.join(',')+"\"}"  );
}
