//@ param p: is a p5 instance used for 2d visualization
//I used this p as a argument so I can use 2d functions in p5 library
function Firework(fire_colour, x_pos, y_pos, numberOfParticles, speed, p) {
    let colour = fire_colour;
    let x = x_pos;
    let y = y_pos;
    //variable to detect the life of the firework and remove it after 1 second
    //start
    let birthTime = p.millis();
    //end
    let particles = [];

    for (let i = 0; i < Math.PI * 2; i += (Math.PI * 2) / numberOfParticles) {
        particles.push(new FireworkParticle(x, y, colour, i, speed, p));
    }

    this.depleted = false;

    this.draw = function () {
        for (let i = 0; i < particles.length; i++) {
            particles[i].draw();
        }
        //start
        if (p.millis() - birthTime > 1000) {
            this.depleted = true;
        }
        //end
    };
}

/*
+-------------------------------------------------------------------------------------+
|      Firework( fire_colour:P5.color, x_pos:Number, y_pos: Number, p: P5 instance)   |
+-------------------------------------------------------------------------------------+
|////////////////////////////////////////pubilic//////////////////////////////////////|                             
|draw()| void                                                                         |
|depleted: Boolean                                                                    |                                                                       
|////////////////////////////////////////private//////////////////////////////////////|
|x:Number                                                                             |
|y:Number                                                                             |
|colour: P5.color                                                                     |
|birthTime:Number                                                                     |
|Particles[]:                                                                         |
+-------------------------------------------------------------------------------------+
This constructor is simulating a single firework. Code structure is based on the material provided in week 13 of CM1010[36]. 

draw(): This function calls the draw functions of each particle and draws them on the canvas. It alsouses birthTime
         and p5.millis() to calculate the age of the firework, and if it is over 1 second, it will be depleted. 
depleted: This boolean indicates if the firework lifetime is over or not.
x: It indicates the distance of the firework from the left side of the canvas when it is triggered.
y: It indicates the distance of the firework from the top of the canvas when it is triggered.
colour: It indicates the color of fireworks.
birthTime: This variable indicates the birth time of the firework.
Particles[]: It is a holder for the particles that shape the firework.
TODO: make the firework size vary based on the value of energy at the moment.

*/
