let isStart = false;

const auto = () => {
  if (!isStart) return;
  console.log("auto");
  socketClient.emit("drive player", {
    direction: generateDirectionString(),
  });
};

function generateDirectionString() {
  let directionString = "";

  let i = 0;
  while (i < 10) {
    const randomDirection = Math.floor(Math.random() * 4) + 1;

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
