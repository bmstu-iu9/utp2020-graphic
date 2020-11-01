let abs = Math.abs;
let pow = Math.pow;
let sqrt = Math.sqrt;
let exp = Math.exp;
let ln = Math.log;
let sin = Math.sin;
let cos = Math.cos;
let tg = Math.tan;
function ctg(x) { return 1 / tg(x) }
let arcsin = Math.asin;
let arccos = Math.acos;
let arctg = Math.atan;
function arcctg(x) { return Math.PI * .5 - arctg(x) }

let canvas = document.getElementById('gr');
let ctx = canvas.getContext('2d');

let minX, maxX, minY, maxY
let w, h, x0, y0, d, r

function coordSyst() {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    // стрелка вверх
    ctx.moveTo(x0, 0);
    ctx.lineTo(x0 - 5, 25);
    ctx.lineTo(x0 + 5, 25);

    // стрелка вправо
    ctx.moveTo(w, y0);
    ctx.lineTo(w - 25, y0 - 5);
    ctx.lineTo(w - 25, y0 + 5);
    ctx.fill();

    // оси x, y
    ctx.fillRect(x0 - 2, 25, 4, h - 25);
    ctx.fillRect(0, y0 - 2, w - 25, 4);

    // клетки
    ctx.fillStyle = 'grey';
    for (let i = -d * 10; i <= d * 10; i++) {
        ctx.fillRect(x0 + r * i, 0, 1, h)
        ctx.fillRect(0, y0 + r * i, w, 1)
    }

    // обозначение осей
    ctx.fillStyle = 'blue';
    ctx.font = "25px Roman";
    ctx.fillText("Y", x0 + 10, 25);
    ctx.fillText("X", w - 25, y0 - 17);

    ctx.font = "20px Roman";
    ctx.fillText("0", x0 + 5, y0 + 25);
    for (let i = -d; i <= d; i++) {
        if (i !== 0) {
            ctx.fillText(String(i), x0 + r * i, x0 + 25);
            ctx.fillText(String(i), x0 + 10, y0 - r * i + 8);
        }
    }
}

function scale() {
    canvas.width = canvas.height = getElVal('scale')
    document.getElementById('scVal').innerText = canvas.width + ' x ' + canvas.height
}

function init() {
    w = h = getElVal('scale')
    x0 = w / 2
    y0 = h / 2
    minX = Number(getElVal('minX'))
    maxX = Number(getElVal('maxX'))
    minY = Number(getElVal('minY'))
    maxY = Number(getElVal('maxY'))
    d = Math.max(abs(minX), abs(maxX)) // координаты x ∈ [-d ; d]
    r = w / (2 * d) // масштаб графика
}

function getElVal(id) {
    return document.getElementById(id).value
}

function clear() {
    ctx.clearRect(0,0, w, h);
}

function draw() {
    ctx.fillStyle = ctx.strokeStyle = getElVal('color-select');

    let f = Function('x', 'return ' + getElVal('func'))
    ctx.beginPath();
    ctx.moveTo(x0 + r * minX, y0 - Math.round(r * f(minX)));
    for (let i = minX; i < maxX; i += 0.001) {
        let x = x0 + r * i
        let y = y0 - Math.round(r * f(i))
        if (y < 0 || y > h) { // для tg(x), чтоб не все точки соединять
            ctx.stroke()
            ctx.beginPath();
        }
        ctx.fillRect(x, y, 1, 1);
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    // убрать лишний диапазон y
    if (!document.getElementById('autoDiap').checked) {
        ctx.clearRect(0, 0, w, y0 - r * maxY);
        ctx.clearRect(0,y0 - r * minY, w, h);
    }

    coordSyst()
}

function buttonOnClick() {
    try {
        clear()
        scale()
        init()
        draw()
    } catch (er) {
        alert('НЕВЕРНЫЕ ВХОДНЫЕ ДАННЫЕ!')
    }
}

function rangeOnMoveGr() {
    clear()
    r = getElVal('scaleGr')
    draw()
    document.getElementById('scValGr').innerText = ' x ' + getElVal('scaleGr') / 50
}