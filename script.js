let player, fulbo, palitos;

let walls;

let diegoIMG, ronaldIMG, fulboIMG;

let score;
let time = 0;
let Over;

function preload(){
    diegoIMG = loadImage("./auxiliares/Diego.png");
    ronaldIMG = loadImage("./auxiliares/Ronaldinho.png");
    fulboIMG = loadImage("./auxiliares/Fulbo.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    //world.gravity.y = 3;

    walls = new Group();
	walls.collider = 'static';
    new walls.Sprite(width / 2, -60, [width, 0]);
	new walls.Sprite(width / 2, height+60, [width, 0]);
	new walls.Sprite(0, height / 2, [height+120, 90]);
	new walls.Sprite(width, height / 2, [height+120, 90]);
    floor.collider = 'none'

    fulbo = new Group();
    fulbo.addImage(fulboIMG);
	fulbo.diameter = 10;
	fulbo.x = () => random(80, width-80);
	fulbo.y = () => random(80, height-80);
	fulbo.amount = 2;
    //fulbo.collider = "none"

    palitos = new Group();
    //palitos.addImage(ronaldIMG);
    //palitos.scale = 6;
    palitos.amount = 20;
    palitos.height = 50;
    palitos.width = 20;
    palitos.x = () => random(50, width-50);
	palitos.y = () => random(50, width-50);
    palitos.direction = 90;
    //palitos.rotationDrag = 1;
    palitos.rotationLock = true;

    

    
    player = new Sprite(width/2, height/2, 30, 55);
    player.draw = () => {
        image(diegoIMG, 0, 0, 60, 60)
    }
    player.overlap(fulbo, collect);
    player.overlap(palitos, GameOver);
    player.rotationDrag = 1;
    player.friction = 100;
}



function collect(player, coin) {
	coin.remove();
    score++;
}

function GameOver(player, palito) {
    camera.zoom = 2.5
    Over = true;
    //square(-100, -100, 10000);
}

function draw() {

    if (Over){
        fill(255, 200, 50);
        textSize(120);
        textAlign(CENTER);
        text("Game Over", width/2, height/2);
        camera.on();
        camera.zoom = 2.5;
        camera.x = player.x;
        camera.y = player.y;
        if (kb.pressing(' ')) {Over = false; reset()}

    } else{
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


        if(fulbo.amount == 0){
            text("You Win", width/2, height/2);
        }

        //if (mouse.isOnCanvas) {
            player.moveTowards(mouse.x, mouse.y);
        //}
        allSprites.debug = mouse.pressing();
    }
}

function reset(){
        fulbo.amount = 20;
        fulbo.x = () => random(80, width-80);
	    fulbo.y = () => random(80, height-80);

        palitos.x = () => random(50, width-50);
	    palitos.y = () => random(50, width-50);

        player.x = width/2;
        player.y = height/2;
}