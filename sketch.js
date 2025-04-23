let circles = [];
let points = [[-3, 5], [3, 7], [1, 5], [2, 4], [4, 3], [5, 2], [6, 2], [8, 4], [8, -1], [6, 0], [0, -3], [2, -6], [-2, -3], [-4, -2], [-5, -1], [-6, 1], [-6, 2]];
let shapes = [];
let song;
let amplitude;

function preload() {
  song = loadSound('midnight-quirk-255361.mp3');  // Replace with the path to your music file
}

function setup() {  //設定
  //一個充滿視窗的畫布
  createCanvas(windowWidth, windowHeight);  //建立畫布，畫布寬為視窗寬，高為視窗高
  //createCanvas(400, 400);  //建立畫布，畫布寬為400，高為400

  // 初始化10個圖案
  for (let i = 0; i < 10; i++) {
    shapes.push({
      x: random(width),
      y: random(height),
      dx: random(-2, 2),
      dy: random(-2, 2),
      size: random(10, 30),  // 隨機大小
      speed: random(0.5, 2),  // 隨機速度
      color: color(random(255), random(255), random(255))  // 隨機顏色
    });
  }

  song.loop();
  amplitude = new p5.Amplitude();
}

function draw() {  //畫圖
  background("#f5ebe0");  //背景色為灰色，只有一個參數，表示灰色的深淺

  let level = amplitude.getLevel();
  let sizeFactor = map(level, 0, 1, 0.5, 2);  // 根據音樂的振幅調整大小

  // 更新並畫出每個圖案
  for (let shape of shapes) {
    push();
    translate(shape.x, shape.y);
    stroke(255, 0, 255);
    strokeWeight(5);
    fill(shape.color);  // 使用隨機顏色
    beginShape();
    for (let i = 0; i < points.length; i++) {
      let x = points[i][0] * shape.size * sizeFactor;  // 使用隨機大小並根據振幅調整
      let y = points[i][1] * shape.size * sizeFactor;  // 使用隨機大小並根據振幅調整
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();

    // 更新圖案的位置
    shape.x += shape.dx * shape.speed;  // 使用隨機速度
    shape.y += shape.dy * shape.speed;  // 使用隨機速度

    // 檢查圖案是否超出畫布邊界，並反轉方向
    if (shape.x < 0 || shape.x > width) {
      shape.dx *= -1;
    }
    if (shape.y < 0 || shape.y > height) {
      shape.dy *= -1;
    }
  }
}

