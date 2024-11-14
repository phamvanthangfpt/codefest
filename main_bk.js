const apiServer = "http://localhost/";
// const apiServer = 'https://codefest.techover.io/';
// const apiServer = 'http://localhost:5000/';
const socket = io.connect(apiServer, {
  reconnect: true,
  transports: ["websocket"],
});

var gameId = null;
var playerId = null;

// GAME VARS
const DIR = {
  LEFT: "1",
  RIGHT: "2",
  UP: "3",
  DOWN: "4",
  STOP: "x",
  BOMB: "b",
};

const SPOIL = {
  BOMB_POW: 3,
  TIME: 4,
  PILL: 5,
};

const MAP = {
  ROAD: 0,
  WALL: 1,
  BOX: 2,
  TELEPORT: 3,
  QUARANTINE: 4,
  EGG: 5,
};

var gameData = null;

// LISTEN SOCKET.IO EVENTS

// It it required to emit `join channel` event every time connection is happened
socket.on("connect", () => {
  document.getElementById("socket-status").innerHTML = "Connected";
  console.log("[Socket] connected to server");
});

socket.on("disconnect", () => {
  console.warn("[Socket] disconnected");
  document.getElementById("socket-status").innerHTML = "Disconnected";
});

socket.on("connect_failed", () => {
  console.warn("[Socket] connect_failed");
  document.getElementById("socket-status").innerHTML = "Connected Failed";
});

socket.on("error", (err) => {
  console.error("[Socket] error ", err);
  document.getElementById("socket-status").innerHTML = "Error!";
});

// SOCKET EVENTS

// API-1a
function joinGame() {
  gameId = document.getElementById("codefest-game-id").value;
  playerId = document.getElementById("codefest-player-id").value;
  socket.emit("join game", { game_id: gameId, player_id: playerId });
  // API-4
  // socketClient.emit("register character power", {
  //   gameId: gameId,
  //   type: 2,
  // });
}

// API-1b
socket.on("join game", (res) => {
  console.log("[Socket] join-game responsed", res);
  document.getElementById("joingame-status").innerHTML = "ON";
});

// API-1b
socket.on("register character power", (res) => {
  console.log("[Socket] register character power responsed", res);
});

// API-4
// socketClient.emit("register character power", {
//   gameId: gameId,
//   type: 2,
// });

//API-2
socket.on("ticktack player", (res) => {
  console.log("res", res);

  gameData = res;
  if (gameData.tag == "start-game") {
    start_game_stamp = Date.now();
    is_moving = false;
    bomb_expolosed = false;
  }
  if (
    gameData.tag == "player:stop-moving" &&
    playerId.startsWith(gameData.player_id)
  ) {
    is_moving = false;
  }
  if (gameData.tag == "bomb:setup" && playerId.startsWith(gameData.player_id)) {
    is_moving = false;
  }
  if (
    gameData.tag == "player:back-to-playground" &&
    playerId.startsWith(gameData.player_id)
  ) {
    is_moving = false;
  }
  if (gameData.tag == "player:moving-banned") {
    is_moving = false;
    console.log(gameData);
  }
  console.log("======");

  update_game();
  auto();
  document.getElementById("ticktack-status").innerHTML = "ON";
});

// API-3a
document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft" || e.key == "a")
    socket.emit("drive player", { direction: DIR.LEFT });
  if (e.key == "ArrowRight" || e.key == "d")
    socket.emit("drive player", { direction: DIR.RIGHT });
  if (e.key == "ArrowUp" || e.key == "w")
    socket.emit("drive player", { direction: DIR.UP });
  if (e.key == "ArrowDown" || e.key == "s")
    socket.emit("drive player", { direction: DIR.DOWN });
  if (e.key == "x") socket.emit("drive player", { direction: DIR.STOP });
  if (e.key == "b" || e.key == " ")
    socket.emit("drive player", { direction: DIR.BOMB });
});

//API-3b
// socket.on("drive player", (res) => {

// });
// socket.emit("drive player", { direction: "1111333332222224444" });
// socket.on("drive player", (res) => {
//   if (res.direction == "b") next_bomb_stamp = Date.now() + mdelay;
//   // console.log('[Socket] drive-player responsed, res: ', res);
// });
