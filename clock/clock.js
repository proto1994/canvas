const canvas = document.querySelector('#canvas');
const context = setupCanvas(canvas);
const MARGIN = 105;
const NUMERAL_SPACING = 50;
const RADIUS = CANVAS_WIDTH / 2 - MARGIN;
const HAND_RADIUS = RADIUS - NUMERAL_SPACING;
const FONT_HEIGHT = 40;
const HAND_RADIUS_SECONS = RADIUS - 70;
const HAND_RADIUS_MINUTES = RADIUS - 30;
const HAND_RADIUS_HOURS = RADIUS - 90;
const OUT_CIRCLE_RADIUS = 30 + RADIUS;
const SCALE_LENGTH = 15;
const SMALL_SCALE_LENGTH = 10;

function drawCircle() {
  context.beginPath();
  context.save();
  var radial = context.createRadialGradient(
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2,
    RADIUS,
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2,
    OUT_CIRCLE_RADIUS,
  );
  radial.addColorStop(0, '#fff'); // 颜色值 #FF0188 == rgba(255,1,136,1)
  radial.addColorStop(1, 'blue');
  context.fillStyle = radial;

  context.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, RADIUS, 0, Math.PI * 2, true);
  context.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, OUT_CIRCLE_RADIUS, 0, Math.PI * 2, true);
  // context.fillRect(0 ,0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.fill();
  context.restore();
}

function drawScale() {
  context.save();
  for (let i = 0; i < 60; i++) {
    context.beginPath();
    let angle = Math.PI * 2 * (i / 60) - Math.PI / 2;
    let startX = CANVAS_WIDTH / 2 + Math.cos(angle) * (RADIUS - 3),
      startY = CANVAS_HEIGHT / 2 + Math.sin(angle) * (RADIUS - 3);

    let isNumberScale = i % 5 == 0;
    context.lineWidth = isNumberScale ? 3 : 1;
    context.lineCap = 'round';
    context.moveTo(startX, startY);
    context.lineTo(
      startX - Math.cos(angle) * (isNumberScale ? SCALE_LENGTH : SMALL_SCALE_LENGTH),
      startY - Math.sin(angle) * (isNumberScale ? SCALE_LENGTH : SMALL_SCALE_LENGTH),
    );
    context.stroke();
  }
  context.restore();
}

function drawCenter() {
  context.save();
  context.beginPath();
  context.fillStyle = '#fff';
  context.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 3, 0, Math.PI * 2, true);
  context.fill();
  context.lineWidth = 2;
  context.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 8, 0, Math.PI * 2, true);
  context.stroke();
  context.restore();
}

function drawNumberals() {
  context.beginPath();
  context.font = FONT_HEIGHT + 'px Arial';
  const numberals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let angle = 0,
    numberalWidth = 0;

  numberals.forEach(numberal => {
    // 规律得出这个结论
    angle = (Math.PI / 6) * (numberal - 3);
    numberalWidth = context.measureText(numberal).width;
    context.fillText(
      numberal,
      CANVAS_WIDTH / 2 + Math.cos(angle) * HAND_RADIUS - numberalWidth / 2,
      CANVAS_HEIGHT / 2 + Math.sin(angle) * HAND_RADIUS + FONT_HEIGHT / 3,
    );
  });
}

function drawHours(hours, minutes, seconds) {
  context.save();
  context.beginPath();
  context.lineWidth = 8;
  context.lineCap = 'round';
  let angle = Math.PI * 2 * ((hours * 3600 + minutes * 60 + seconds) / (3600 * 12)) - Math.PI / 2;
  context.moveTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  context.lineTo(
    CANVAS_WIDTH / 2 + Math.cos(angle) * HAND_RADIUS_HOURS,
    CANVAS_HEIGHT / 2 + Math.sin(angle) * HAND_RADIUS_HOURS,
  );
  context.stroke();
  context.restore();
}

/**
 * 分钟可分成 60 * 60 = 3600的刻度来算
 * @param {*} minutes
 * @param {*} seconds
 */
function drawMinutes(minutes, seconds) {
  context.save();
  context.beginPath();
  context.lineWidth = 4;
  context.lineCap = 'round';
  let angle = Math.PI * 2 * ((minutes * 60 + seconds) / 3600) - Math.PI / 2;
  context.moveTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  context.lineTo(
    CANVAS_WIDTH / 2 + Math.cos(angle) * HAND_RADIUS_MINUTES,
    CANVAS_HEIGHT / 2 + Math.sin(angle) * HAND_RADIUS_MINUTES,
  );
  context.stroke();
  context.restore();
}

function drawSeconds(seconds) {
  context.save();

  context.lineCap = 'round';
  let angle = Math.PI * 2 * (seconds / 60) - Math.PI / 2;
  context.save();
  context.beginPath();
  context.lineWidth = 3;
  context.moveTo(CANVAS_WIDTH / 2 - Math.cos(angle) * 40, CANVAS_HEIGHT / 2 - Math.sin(angle) * 40);
  context.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  context.stroke();
  context.restore();

  context.save();
  context.beginPath();
  context.lineWidth = 1;
  context.moveTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  context.lineTo(
    CANVAS_WIDTH / 2 + Math.cos(angle) * HAND_RADIUS_SECONS,
    CANVAS_HEIGHT / 2 + Math.sin(angle) * HAND_RADIUS_SECONS,
  );
  context.stroke();
  context.restore();
}

function drawHands() {
  let date = new Date();
  let hours = date.getHours();
  hours = hours > 12 ? hours - 12 : hours;
  let seconds = date.getSeconds(),
    minutes = date.getMinutes();

  drawHours(hours, minutes, seconds);
  drawMinutes(minutes, seconds);
  drawSeconds(seconds);
}

function drawTitle() {
  const title = 'Big Fly';
  let numberalWidth = context.measureText(title).width;
  context.save();
  context.font = '20px Arial';
  context.fillText(title, CANVAS_WIDTH / 2 - numberalWidth / 4, CANVAS_HEIGHT / 2 - 50);
  context.restore();
}

function drawClock() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawCircle();
  drawNumberals();
  drawHands();
  drawScale();
  drawCenter();
  drawTitle();
}

drawClock();
setInterval(() => {
  drawClock();
}, 1000);
