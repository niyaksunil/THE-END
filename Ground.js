class Ground{
    constructor(){
        this.ground = backgroundImg;
    }

    sceneVelocity(){
        console.log("inside sceneVelocity")
        scene.velocityX = -2;

        if (scene.x < 100){
            scene.x = scene.width/2;
        }
    }

    display(){
        // sceneVelocity();
        // backGround();
        // this.ground.velocityX = -4;
        // imageMode(CENTER);
        image(backgroundImg, 0,displayHeight/2,displayWidth*10,displayHeight);

    }
}