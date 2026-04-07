//@ param p: is a p5 instance used for 2d visualization
//I used this p as a argument so I can use 2d functions in p5 library
function Fireworks(p)
{
    //indicate if it needs 2d or 3d canva(rendering mode is P2D or WEBGL)
	this.renderingMode = "p2d";
    this.name = "Fireworks";
    let fireworks = [];
    let numberOfPArticlesFactor = .3
    let speedFactor = .06
    this.draw = function()
    { 
        if ( soundApp.musicAnalyzer.detectBeat("treble"))
        {
            let f_colour = p.color(p.random(0,255), p.random(0,255), p.random(0,255));
            let f_x = p.random(p.width*0.2, p.width * 0.8 );
            let f_y = p.random(p.height*0.2, p.height * 0.8 );
            //number of particles is computed based on the instantEnergy of "treble" frequency band multiplied by the numberOfPArticlesFactor
            let numberOfParticles = (soundApp.musicAnalyzer.instantEnergy["treble"]*numberOfPArticlesFactor);
            //speed o particle is computed based on the instantEnergy of "treble" frequency band multiplied by the speedFactor 
            let speed = (soundApp.musicAnalyzer.instantEnergy["treble"]*speedFactor);
            fireworks.push(new Firework( f_colour, f_x, f_y, numberOfParticles, speed,p ));
        }
        update();
    }
    function update()
    {
        for (let i = 0; i < fireworks.length; i++)
        {
            fireworks[i].draw();
            if (fireworks[i].depleted)
            {
                fireworks.splice(i,1);
            }
        }
    }
}

/*
+-----------------------------------------------------------------+
|                        Fireworks(p: P5 instance)                |
+-----------------------------------------------------------------+
|//////////////////////////////pubilic////////////////////////////|
|renderingMode: String                                            |
|name: String                                                     |                               
|draw()| void                                                     |                                                                       
|/////////////////////////////private/////////////////////////////|
|fireworks[]: an array of Firework obkects                        |
|update()| void                                                   |
+-----------------------------------------------------------------+
This constructor is used to simulate and manage fireworks, which are synchronized with music rhythm, based on the beats detected by the BeatDetect object.
Code structure is based on the material provided in week 13 of CM1010[36]. The improvement in this version is that the number and speed of particles is based on 
the instant energy which is obtained at the moment the Firework instance is created.  

name: It is used to identify which visualization object is selected or added.
renderingMode: It is used to identify the required rendering mode and links the object to the right canvas(P2D).
draw(): It will be called at each frame and analyze the music, and update the spectrum. Initiates a new firework if a beat is detected. Updates
       the previous fireworks. 
fireworks: It is an array as a container for existing Firework objects.
update(): Called inside the draw() to update the status of existing fireworks.

*/
