let player, fulbo, palitos;

let walls;

let diegoIMG, ronaldIMG, fulboIMG;

let score;
let time = 0;

function preload(){
    diegoIMG = loadImage("./auxiliares/Diego.png");
    ronaldIMG = loadImage("./auxiliares/Ronaldinho.png");
    fulboIMG = loadImage("./auxiliares/Fulbo.png");
}

function setup() {
    createCanvas(800, 800);

    //world.gravity.y = 3;

    walls = new Group();
	walls.collider = 'static';
    new walls.Sprite(width / 2, 0, [width, 0]);
	new walls.Sprite(width / 2, height, [width, 0]);
	new walls.Sprite(0, height / 2, [height, 90]);
	new walls.Sprite(width, height / 2, [height, 90]);

    fulbo = new Group();
    fulbo.addImage(fulboIMG);
	fulbo.diameter = 10;
	fulbo.x = () => random(80, width-80);
	fulbo.y = () => random(80, height-80);
	fulbo.amount = 20;

    palitos = new Group();
    palitos.amount = 10;
    palitos.height = 80;
    palitos.width = 20;
    palitos.x = () => random(50, width-50);
	palitos.y = () => random(50, width-50);
    palitos.direction = 90;
    //palitos.rotationDrag = 1;
    palitos.rotationLock = true;


    
    player = new Sprite(200, 200, 30, 55);
    player.draw = () => {
        image(diegoIMG, 0, 0, 60, 60)
    }
    player.overlap(fulbo, collect);
    player.rotationDrag = 1;
    player.friction = 100;
}

function collect(player, coin) {
	coin.remove();
    score++;
}

function draw() {
    camera.on();
    camera.zoom = 1.2;
    camera.x = player.x;
	camera.y = player.y;

    background(180, 80, 50);

    palitos.cull(10, (palito) => {
        palito.y = -10;
        palito.x = random(50, width-50);
        palito.direction = 90;
        palito.rotation = 0;
    });
    palitos.vel.y = 6;


    

    //if (mouse.isOnCanvas) {
		player.moveTowards(mouse.x, mouse.y);
	//}
    allSprites.debug = mouse.pressing();
}

