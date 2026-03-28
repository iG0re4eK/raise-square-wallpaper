import RaiseSquare from "./RaiseSquare.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const countSquares = 100;

let widthSquares;
let raiseSquares = [];

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  widthSquares = canvas.width / countSquares;

  raiseSquares = [];

  for (let i = 0; i < countSquares; i++) {
    raiseSquares.push(
      new RaiseSquare(
        i * widthSquares,
        canvas.height,
        widthSquares,
        0,
        "gray",
        context,
      ),
    );
  }

  draw();
}

function getColor(currentHeight) {
  const percent = (currentHeight * 100) / canvas.height;
  const hue = 120 * (percent / 100);

  const saturation = 100;

  const lightness = 50;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  raiseSquares.forEach((square) => {
    square.draw();
  });

  requestAnimationFrame(draw);
}

window.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const maxHeight = canvas.height;
  const radius = 500;

  raiseSquares.forEach((el) => {
    const squareCenterX = el.x + el.width / 2;
    const distance = Math.abs(mouseX - squareCenterX);

    let influence = 0;

    if (distance < radius) {
      influence = (Math.cos((Math.PI * distance) / radius) + 1) / 2;
    }

    const heightMultiplier = (canvas.height - mouseY) / canvas.height;
    let newHeight = maxHeight * influence * heightMultiplier;

    el.height = el.height * 0.9 + newHeight * 0.1;

    el.color = getColor(el.height);
  });
});

window.addEventListener("load", init);
window.addEventListener("resize", init);
