import RaiseSquare from "./RaiseSquare.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const FPS = 120;
const frameInterval = 1000 / FPS;
const countSquares = 30;

let widthSquares;
let raiseSquares = [];
let lastFrame = 0;
let animationId = null;

function init() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  widthSquares = Math.floor(canvas.width / countSquares);
  const actualCount = Math.ceil(canvas.width / widthSquares);

  raiseSquares = [];

  for (let i = 0; i < actualCount; i++) {
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

  lastFrame = performance.now();
  animate();
}

function getColor(currentHeight) {
  const percent = (currentHeight * 100) / canvas.height;
  const hue = 120 * (percent / 100);

  const saturation = 100;

  const lightness = 30;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function animate(timeStamp) {
  animationId = requestAnimationFrame(animate);

  const deltaTime = timeStamp - lastFrame;

  if (deltaTime > 0) {
    draw();
  }

  if (deltaTime >= frameInterval) {
    lastFrame = timeStamp;
  }
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  raiseSquares.forEach((square) => {
    square.draw();
  });
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
