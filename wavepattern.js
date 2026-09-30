//draw the waveform to the screen
//@ param p: is a p5 instance used for 2d visualization
//I used this p as a argument so I can use 2d functions in p5 library
function WavePattern(p) {
    //indicate if it needs 2d or 3d canva(rendering mode is P2D or WEBGL)
    this.renderingMode = "p2d";
    //vis name
    this.name = "Wavepattern";

    //draw the wave form to the screen
    this.draw = function () {
        p.push();
        p.noFill();
        p.stroke(255, 0, 0);
        p.strokeWeight(2);

        p.beginShape();
        //calculate the waveform from the fft.
        var wave = soundApp.musicAnalyzer.waveForm;
        for (var i = 0; i < wave.length; i++) {
            //for each element of the waveform map it to screen
            //coordinates and make a new vertex at the point.
            var x = p.map(i, 0, wave.length, 0, p.width);
            var y = p.map(wave[i], -1, 1, 0, p.height);

            p.vertex(x, y);
        }

        p.endShape();
        p.pop();
    };
}
/*
+-------------------------------------------------+
|             WavePattern(p:P5 instance)          |
+-------------------------------------------------+
|///////////////////pubilic///////////////////////|
|renderingMode:String                             |
|name:String                                      |
|draw()|void                                      |                                                                            
+-------------------------------------------------+
This constructor will be used to draw a live wavepattern signal based on the waveForm taken from the fft of musicAnalyzer .

name: It is used to identify which visualization object is selected or added.
renderingMode: It is used to identify the required rendering mode and links the object to the right canvas(P2D).
draw(): will be called at each frame and draws a wave pattern using p5.vertex().



references:
Code structure is based on the template provided for the music visualization in CM1010 Module
*/
