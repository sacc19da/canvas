// 繪圖相關變數和初始化
let canvas;
let ctx;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    // 設置canvas寬高
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 監聽事件：滑鼠與觸控事件
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mouseout', endDrawing);

    canvas.addEventListener('touchstart', startDrawingTouch);
    canvas.addEventListener('touchmove', drawTouch);
    canvas.addEventListener('touchend', endDrawing);
    canvas.addEventListener('touchcancel', endDrawing);

    window.addEventListener('resize', resizeCanvas);

    // 初始化工具區
    setupTools();
}

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];

    // 調整顏色
    hue++;
    if (hue >= 360) {
        hue = 0;
    }

    // 調整線條粗細
    if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

function startDrawingTouch(e) {
    e.preventDefault();
    isDrawing = true;
    let touch = e.touches[0];
    [lastX, lastY] = [touch.pageX - canvas.offsetLeft, touch.pageY - canvas.offsetTop];
}

function drawTouch(e) {
    e.preventDefault();
    if (!isDrawing) return;
    
    let touch = e.touches[0];
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(touch.pageX - canvas.offsetLeft, touch.pageY - canvas.offsetTop);
    ctx.stroke();

    [lastX, lastY] = [touch.pageX - canvas.offsetLeft, touch.pageY - canvas.offsetTop];

    // 調整顏色
    hue++;
    if (hue >= 360) {
        hue = 0;
    }

    // 調整線條粗細
    if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

function endDrawing() {
    isDrawing = false;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function setupTools() {
    // 在工具區動態生成工具按鈕，例如鉛筆、橡皮擦等，並添加相應的事件處理
    // 例如：鉛筆
    let pencilBtn = document.createElement('button');
    pencilBtn.textContent = '鉛筆';
    pencilBtn.addEventListener('click', () => {
        // 添加你的鉛筆功能處理代碼
        console.log('使用鉛筆');
    });
    document.querySelector('.tools-area').appendChild(pencilBtn);

    // 其他工具按鈕的生成和事件處理類似，根據需求自定義
}

// 初始化
init();
