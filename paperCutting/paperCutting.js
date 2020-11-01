const canvas = document.querySelector('#canvas');
const context = setupCanvas(canvas);

/**
 *
 * @param {*} x
 * @param {*} y
 * @param {*} w
 * @param {*} h
 * @param {*} direction true 逆时针 false 顺时针
 */
function rect(x, y, w, h, direction) {
  if (direction) {
    context.moveTo(x, y);
    context.lineTo(x, y + h);
    context.lineTo(x + w, y + h);
    context.lineTo(x + w, y);
  } else {
    context.moveTo(x, y);
    context.lineTo(x + w, y);
    context.lineTo(x + w, y + h);
    context.lineTo(x, y + h);
  }
  context.closePath();
}

function addTrianglePath() {
  context.moveTo(400, 200);
  context.lineTo(200, 115);
  context.lineTo(200, 200);
  context.closePath();
}

function drawTwoArcs() {
  context.beginPath();
  // 非0环绕规则
  context.arc(300, 190, 100, 0, Math.PI * 2, true);
  context.arc(300, 190, 150, 0, Math.PI * 2, false);
  context.fill();
  // context.shadowColor = undefined;
  // context.shadowOffsetX = 0;
  // context.shadowOffsetY = 0;
  context.stroke();
}

function draw() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.save();
  context.shadowColor = 'rgba(0,0,0,.8)';
  context.shadowOffsetX = 12;
  context.shadowOffsetY = 12;
  context.shadowBlur = 15;
  drawCutouts();
  // drawTwoArcs();
  context.restore();
}

function drawCutouts() {
  context.beginPath();
  // rect(310, 55, 70, 35, true);
  context.rect(110, 25, 375, 335);

  rect(310, 55, 70, 35, true);
  context.arc(300, 300, 40, 0, Math.PI * 2, true); // 逆时针
  addTrianglePath();
  context.fill();
}

context.fillStyle = 'rgba(100, 140, 230, 0.5)';
// context.strokeStyle = context.fillStyle;

draw();
