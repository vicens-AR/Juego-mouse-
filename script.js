let player, fulbo, palitos;

let walls;

let diegoIMG, ronaldIMG, fulboIMG, PantallaDeCarga, fondo, YouWin;

let score = 0;
let time = 0;
let Over, karga = true;
let button;

let amountFulbos = 1;

function preload(){
    diegoIMG = loadImage("./auxiliares/Diego.png");
    ronaldIMG = loadImage("./auxiliares/Ronaldinho.png");
    fulboIMG = loadImage("./auxiliares/Fulbo.png");
    PantallaDeCarga = loadImage("./auxiliares/PANTALLA_DE_ÑIFA.jpg");
    fondo = loadImage("./auxiliares/bonbon.jpg")
    YouWin = loadImage("./auxiliares/PANTALLA DE WIN.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    //background(fondo);
    image(PantallaDeCarga, 0, 0)
    /*
    button = createButton('play');
    button.position(width/2, height/2);
    button.mousePressed(()=>karga=false);
    button.addClass("boton")
*/
    //world.gravity.y = 3;

    
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
    if(karga){
        if (mouseIsPressed === true) {
            if (mouseButton === LEFT) {
              karga = false;
              StartUp();
            }
        }
        background(50);
        noFill();
        noStroke();
        image(PantallaDeCarga, 0, 0, width, height);
    }else{
    //fulbo.bounciness = 10;
    stroke(1);
        if (Over){
            fill(255, 200, 50);
            textSize(120);
            textAlign(CENTER);
            text("Game Over", width/2, height/2);
            camera.on();
            camera.zoom = 1;
            //camera.x = player.x;
            //camera.y = player.y;
            if (kb.pressing(' ')) {Over = false; reset()}

        } else{
            
            
            
            

            if(score == amountFulbos){
                image(YouWin, 0, 0, width, height);
                if (kb.pressing(' ')) {Over = false; reset()}
                palitos.remove();
                camera.x = width/2;
                camera.y = height/2;
            }else{
                camera.on();
                camera.zoom = 1.2;
                camera.x = player.x;
                camera.y = player.y;

                background(80, 100, 250);
                    palitos.cull(10, (palito) => {
                    palito.y = -10;
                    palito.x = random(50, width-50);
                    palito.direction = 90;
                    palito.rotation = 0;
                });
                palitos.vel.y = 3;
                image(fondo, -600, -500, width+1200, height+1000);
            }
            //if (mouse.isOnCanvas) {
                player.moveTowards(mouse.x, mouse.y);
                //palitos.moveTowards(mouse.x, mouse.y,);
            //}
            allSprites.debug = mouse.pressing()
            
    }
}
}

function reset(){
        fulbo.amount = amountFulbos;
        score = 0;
        fulbo.x = () => random(80, width-80);
	    fulbo.y = () => random(80, height-80);

        palitos.x = () => random(50, width-50);
	    palitos.y = () => random(50, width-50);

        player.x = width/2;
        player.y = height/2;
}

function StartUp(){
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
	fulbo.amount = amountFulbos;
    
    //fulbo.collider = "none"

    palitos = new Group();
    palitos.addImage(ronaldIMG);
    //palitos.scale = 6;
    palitos.amount = 10;
    palitos.height = 50;
    palitos.width = 20;
    palitos.x = () => random(50, width-50);
	palitos.y = () => random(50, width-50);
    palitos.direction = 90;
    //palitos.rotationDrag = 1;
    palitos.rotationLock = true;
    palitos.map((palito) => palito.draw = () => {
        image(ronaldIMG, 0, 0, 60, 60)
    });
    

    
    player = new Sprite(width/2, height/2, 30, 55);
    player.draw = () => {
        image(diegoIMG, 0, 0, 60, 60)
    }
    player.overlap(fulbo, collect);
    player.overlap(palitos, GameOver);
    player.rotationDrag = 1;
    player.friction = 100;
}