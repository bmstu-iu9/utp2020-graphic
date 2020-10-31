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

let w = Number(document.getElementById('gr').width);
let h = Number(document.getElementById('gr').height);
let x0 = w / 2
let y0 = h / 2
let r = 124 // масштаб
let d = 6 // координаты x ∈ [-d ; d]
let b

var canvas = document.getElementById('gr');
if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
}

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
    for (let i = 0; i < 2 * d; i++) {
        // создать
        ctx.fillRect(r * i, 0, 1, h)
        ctx.fillRect(0, r * i, w, 1)
    }

    // обозначение осей
    ctx.fillStyle = 'blue';
    ctx.font = "25px Roman";
    ctx.fillText("Y", 385, 25);
    ctx.fillText("X", 720, 355);

    ctx.font = "20px Roman";
    ctx.fillText("0", x0 + 5, 400);
    for (let i = -d; i < d; i++) {
        if (i !== 0) {
            ctx.fillText(String(i), x0 + r * i, 400);
            ctx.fillText(String(i), 380, y0 - r * i + 12);
        }
    }
}

function getElVal(id) {
    return document.getElementById(id).value
}

function clear() {
    ctx.clearRect(0,0, w, h); //стирает canvas
}
function draw() {
    let minX = Number(getElVal('minX'))
    let maxX = Number(getElVal('maxX'))
    let minY = Number(getElVal('minY'))
    let maxY = Number(getElVal('maxY'))
    ctx.fillStyle = ctx.strokeStyle = getElVal('color-select');

    let f = Function('x', 'return ' + getElVal('func'))
    d = Math.max(abs(minX), abs(maxX))
    r = w / (2 * d)
    ctx.beginPath();
    ctx.moveTo(x0 + r * minX, y0 - Math.round(r * f(minX)));
    for (let i = minX; i < maxX; i += 0.0001) {
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
}

function buttonOnClick() {
    try {
        clear();
        draw();
        coordSyst();
    } catch (e) {
        alert('НЕВЕРНЫЕ ВХОДНЫЕ ДАННЫЕ!')
    }
}