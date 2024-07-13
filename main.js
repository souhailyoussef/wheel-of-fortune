const canvas = document.getElementById('wheel');
const ctx = canvas.getContext("2d");
const possibilities = [{
    value: 'win',
    color: 'green'
}, {
    value: 'lose',
    color: 'red'},
    {value: 'draw',
        color: 'gray'}
        , {value: 'ET',
        color: 'gold'}
    ];

    var Ti = 5; // Torque initial (in Newton)
    var I = 2; // Moment of inertia of the wheel (in kg·m²)
    var friction = 0.1;  // Coefficient of friction (in N·m)
    var totalTime = 5; // Time for which the wheel spins (in s)

    let angularVelocity; // Initial angular velocity
    let currentAngle = 0; // Angle in radians

ctx.fillRect(0,0, 100, 100);

ctx.fillStyle = 'black';
ctx.strokeStyle = "blue";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.arc(50, 50, 50, 0 , 2*Math.PI);
ctx.stroke();

drawPossibilities();

function drawPossibilities() {
    const number_of_arcs = possibilities.length;
    possibilities.forEach((possibility, i) => drawArc(i*Math.PI*2 / number_of_arcs, (i+1)*Math.PI*2/number_of_arcs, possibility.color))
}

function drawArc(startAngle, endAngle, color) {
    ctx.beginPath();
    ctx.moveTo(50,50);
    ctx.fillStyle = color;
    ctx.arc(50,50,50,startAngle, endAngle);
    ctx.closePath();
    ctx.fill();

}

function spin(duration) {
    const startTime = performance.now();
    console.log('started:' , startTime);
    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Ensures the progress does not exceed 1       
        const currentRotation = (45);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.save();
        ctx.translate(50, 50); // Move to the center of the canvas
        ctx.rotate(currentRotation * (Math.PI / 180));
        ctx.translate(-50, -50); // Move back to the original position
        
        drawPossibilities(); // Redraw the wheel
        if (progress < 1) {
            requestAnimationFrame(animate); // Continue the animation
        } else {
            console.log('finished:' , performance.now());

        }
    }

    
    requestAnimationFrame(animate); // Start the animation

    }
/*
function drawBgImg() {
    let bgImg = new Image();
    bgImg.src = '/sky.jpg';
    bgImg.onload = () => {
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    }
}*/