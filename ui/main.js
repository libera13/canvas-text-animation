const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
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
const textCoordinates = ctx.getImageData(0,0, 400, 200);
ctx.putImageData(textCoordinates, 150, 200);
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

    let forceDirectionX = dx/distance;
    let forceDirectionY = dy/distance;

    const maxDistance = mouse.radius;
    const force = (maxDistance - distance) / maxDistance;
    const directionX = forceDirectionX * force * this.density;
    const directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius){
      this.x -= directionX;
      this.y -= directionY;
      // this.size = 50;
    } else {
      if (this.x !== this.baseX){
        const dx = this.x - this.baseX;
        this.x -= dx/10;
      }
      if (this.y !== this.baseY){
        const dy = this.y - this.baseY;
        this.y -= dy/10;
      }
    }
  }
}

function init() {
  for (let y = 0, y2 = textCoordinates.height; y < y2; y++){
    for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
      if (textCoordinates.data[(y * 4 * textCoordinates.width) + ( x * 4 ) + 3 ] > 128){
        let positionX = x;
        let positionY = y;
        particlesArray.push(new Particle(positionX * 10, positionY * 10));
      }
    }
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
