//@ param p: is a p5 instance used for 2d visualization
//I used this p as a argument so I can use 2d functions in p5 library
function FireworkParticle(x_pos, y_pos, fire_colour, particle_angle, speed, p)
{
    let x = x_pos;
    let y = y_pos;
    let colour = fire_colour;
    let angle = particle_angle;

    let particleSpeed = speed;
 

    this.draw = function()
    {
        update();
        p.fill(colour);
        p.ellipse(x,y,10,10);
    }
    function update()
    {
        //update x and y
        x += p.cos(angle) * particleSpeed;
        y += p.sin(angle) * particleSpeed;
    }
}
/*
+-------------------------------------------------------------------------------------+
|      FireworkParticle(x_pos:Number, y_pos: Number, fire_colour:P5.color,            |
|                               particle_angle:Number, speed:Number, p: P5 instance)  |
+-------------------------------------------------------------------------------------+
|////////////////////////////////////////pubilic//////////////////////////////////////|                             
|draw()| void                                                                         |                                                                       
|////////////////////////////////////////private//////////////////////////////////////|
|x:Number                                                                             |
|y:Number                                                                             |
|colour: P5.color                                                                     |
|angle: Number                                                                        |
|particleSpeed: Number                                                                |
|update()| void                                                                       |
+-------------------------------------------------------------------------------------+
This constructor is used to simulate a particle of a firework. It takes 6 arguments.
Code structure is based on the material provided in week 13 of CM1010[36]. 

draw(): draw a filled circle representing the particle on the canvas.
x: It indicates the distance of the particle from the left side of the canvas.
y: It indicates the distance of the particle from the top of the canvas.
colour: It indicates the color of the particle. 
angle: It indicates the direction in which the particle is moving.
particleSpeed: It indicates the speed of the particle.
update(): It updates the position of the particle.

*/
