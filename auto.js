// =====ALGO VARS=====
const box_cost = 5;
const road_cost = 1;
const max_loops = 1000;
const bomb_time = 3500;
const radius = 1;
const surround_factor = 0.5;
const enable_v2 = false;
const low_box_factor = 1;
const high_box_factor = 1.5;
const bomb_explosion_duration = 1000;

var slice_factor = 2;
var box_factor = high_box_factor;

// =====DEBUG=====
var prev_pos = null;
var prev_count = 0;
var pause = false;
var prev_bomb = null;

// =====HANDLE GAME VARS=====
var current_state = null;
var next_bomb_stamp = null;
var is_moving = false;
var start_game_stamp = null;

var mprofile = null;
var oprofile = null;
var mpower = null;
var mspeed = null;
var mdelay = null;
var mlives = null;
var mloc = null;
var opower = null;
var ospeed = null;
var odelay = null;
var olives = null;
var oloc = null;

const auto = (gameData) => {
  // if (!isStart) return;
  console.log("auto", playerId);
  socketClient.emit("drive player", {
    direction: generateDirectionString(gameData),
  });
};

function generateDirectionString(gameData) {
  let directionString = "";
  console.log("data", gameData);

  let i = 0;
  while (i < 10) {
    const randomDirection = Math.floor(Math.random() * 4) + 1;
    console.log("random", randomDirection);

    if (randomDirection === 0) {
      directionString += "b0";
    } else if (randomDirection === 1) {
      directionString += "b1";
    } else if (randomDirection === 2) {
      directionString += "b2";
    } else if (randomDirection === 3) {
      directionString += "b3";
    } else {
      directionString += randomDirection.toString();
    }

    i++;
  }

  return directionString;
}

function update_game() {
  if (playerId.startsWith(gameData.map_info.players[0].id)) {
    mprofile = gameData.map_info.players[0];
    oprofile = gameData.map_info.players[1];
  } else {
    mprofile = gameData.map_info.players[1];
    oprofile = gameData.map_info.players[0];
  }

  mpower = mprofile.power;
  mspeed = mprofile.speed / 60;
  mdelay = mprofile.delay;
  mlives = mprofile.lives;
  mloc = [mprofile.currentPosition.col, mprofile.currentPosition.row];

  opower = oprofile.power;
  ospeed = oprofile.speed / 60;
  odelay = oprofile.delay;
  olives = oprofile.lives;
  oloc = [oprofile.currentPosition.col, oprofile.currentPosition.row];
}
