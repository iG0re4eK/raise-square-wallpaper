export default class RaiseSquare {
  constructor(x, y, width, height, color, context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.context = context;
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(
      this.x,
      this.y - this.height,
      this.width,
      this.height,
    );
  }

  update() {}
}
