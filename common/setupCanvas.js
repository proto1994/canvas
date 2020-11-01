const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = CANVAS_WIDTH * dpr;
  canvas.height = CANVAS_HEIGHT * dpr;

  let ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  ctx.save();
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#000';

  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.restore();
  // ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  return ctx;
}
