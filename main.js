const canvas = document.getElementById('wheel');
const ctx = canvas.getContext("2d");


const possibilities = ['win', 'lose', 'draw', 'ET']

ctx.fillStyle = 'red';
ctx.fillRect(0,0, 100, 100);

ctx.fillStyle = 'black';
ctx.strokeStyle = "blue";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.arc(50, 50, 50, 0 , 2*Math.PI);
ctx.stroke();

drawPossibilities();

function drawPossibilities() {
    ctx.fillStyle = 'yellow';
    ctx.moveTo(50,50);
    ctx.lineTo(50, 0);
    ctx.lineTo(50,50);
    ctx.lineTo(0, 50);
    ctx.stroke();
}