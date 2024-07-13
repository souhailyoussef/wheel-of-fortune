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

    var Ti = 5; // Torque initial (in Newton-meters)
    var I = 2; // Moment of inertia of the wheel (in kg·m²)
    var friction = 0.1;  // Coefficient of friction (in N·m)
    var totalTime = 5; // Time for which the wheel spins (in seconds)h the wheel spins (in s)

    let angularVelocity; // Initial angular velocity
    let currentAngle = 0; // Angle in radians
    totalRotation = 0;

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

function spin() {
    const startTime = performance.now();
    angularVelocity = Ti / I; // Set initial angular velocity based on torque
    console.log('started:' , startTime);
    function animate(currentTime) {
        const elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
        const progress = Math.min(elapsedTime / totalTime, 1); // Ensure progress does not exceed 1

        // Calculate angular deceleration
        const angularDeceleration = friction / I;
        
        // Update angular velocity
        angularVelocity -= angularDeceleration * elapsedTime; // Decrease velocity
        if (angularVelocity < 0) angularVelocity = 0; // Prevent negative velocity

        // Calculate the current rotation angle
        const currentRotation = angularVelocity * elapsedTime - (0.5 * angularDeceleration * Math.pow(elapsedTime, 2));

        // Update total rotation
        totalRotation += currentRotation; // Accumulate rotation
     
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.save();
        ctx.translate(50, 50); // Move to the center of the canvas
        ctx.rotate(totalRotation * (Math.PI / 180));
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

function calculateCurrentAngle(t) {
    // Calculate initial angular velocity (ω₀)
    const omega0 = Ti / I;

    // Calculate angular deceleration (α)
    const alpha = friction / I;

    // Calculate current angle (θ(t))
    const theta = (omega0 * t) - (0.5 * alpha * Math.pow(t, 2));

    return theta; // Returns the angle in radians
}