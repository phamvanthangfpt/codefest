const apiServer = "http://localhost/";

const socketClient = io.connect(apiServer, {
  reconnect: true,
  transports: ["websocket"],
});

var gameId = null;
var playerId = null;

var gameData = null;

// It it required to emit `join channel` event every time connection is happened
socketClient.on("connect", () => {
  document.getElementById("socket-status").innerHTML = "Connected";
  console.log("[Socket] connected to server");
});

socketClient.on("disconnect", () => {
  console.warn("[Socket] disconnected");
  document.getElementById("socket-status").innerHTML = "Disconnected";
});

socketClient.on("connect_failed", () => {
  console.warn("[Socket] connect_failed");
  document.getElementById("socket-status").innerHTML = "Connected Failed";
});

socketClient.on("error", (err) => {
  console.error("[Socket] error ", err);
  document.getElementById("socket-status").innerHTML = "Error!";
});

// SOCKET EVENTS

// API-1a
const joinGame = () => {
  gameId = document.getElementById("codefest-game-id").value;
  playerId = document.getElementById("codefest-player-id").value;
  socketClient.emit("join game", { game_id: gameId, player_id: playerId });
};

// API-1b
socketClient.on("join game", (res) => {
  console.log("[Socket] join-game responsed", res);
  document.getElementById("joingame-status").innerHTML = "ON";
});

// API-1b
socketClient.on("register character power", (res) => {
  console.log("[Socket] register character power responsed", res);
});

// API-4
// socketClient.emit("register character power", {
//   gameId: gameId,
//   type: 2,
// });

//API-2
socketClient.on("ticktack player", (res) => {
  gameData = res;
  if (gameData.tag == "start-game") {
    isStart = true;
  }
  console.log(res);

  auto();
  document.getElementById("ticktack-status").innerHTML = "ON";
});

// API-3a
document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft" || e.key == "a")
    socketClient.emit("drive player", { direction: DIR.LEFT });
  if (e.key == "ArrowRight" || e.key == "d")
    socketClient.emit("drive player", { direction: DIR.RIGHT });
  if (e.key == "ArrowUp" || e.key == "w")
    socketClient.emit("drive player", { direction: DIR.UP });
  if (e.key == "ArrowDown" || e.key == "s")
    socketClient.emit("drive player", { direction: DIR.DOWN });
  if (e.key == "x") socketClient.emit("drive player", { direction: DIR.STOP });
  if (e.key == "b" || e.key == " ")
    socketClient.emit("drive player", { direction: DIR.BOMB });
});

//API-3b
// socketClient.on("drive player", (res) => {

// });
// socketClient.emit("drive player", { direction: "1111333332222224444" });
// socketClient.on("drive player", (res) => {
//   if (res.direction == "b") next_bomb_stamp = Date.now() + mdelay;
//   // console.log('[Socket] drive-player responsed, res: ', res);
// });
