const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 20;
const mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

ctx.fillStyle = "white";
ctx.font = "30px Verdana";
ctx.fillText("ABRACADABRA", 100,60);
// const data = ctx.getImageData(0,0, 100, 10);

class Particle {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }
    draw(){
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this. y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 500){
            this.size = 50;
        } else {
            this.size = 3;
        }
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++){
        const x = Math.random() * 500;
        const y = Math.random() * 500;
        particlesArray.push(new Particle(x, y ));
    }
}
init();

function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].draw();
        particlesArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();