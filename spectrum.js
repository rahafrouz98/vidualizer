//@ param p: is a p5 instance used for 2d visualization
//I used this p as a argument so I can use 2d functions in p5 library
function Spectrum(p) {
    //indicate if it needs 2d or 3d canva(rendering mode is P2D or WEBGL)
    this.renderingMode = "p2d";
    this.name = "Spectrum";

    this.draw = function () {
        p.push();
        let spectrum = soundApp.musicAnalyzer.spectrum;
        p.noStroke();

        for (let i = 0; i < spectrum.length; i++) {
            //fade the colour of the bin from green to red
            let g = p.map(spectrum[i], 0, 255, 255, 0);
            p.fill(spectrum[i], g, 0);

            //draw each bin as a rectangle from the left of the screen
            //across
            let y = p.map(i, 0, spectrum.length, 0, p.height);
            let w = p.map(spectrum[i], 0, 255, 0, p.width);
            p.rect(0, y, w, p.height / spectrum.length);
        }
        p.pop();
    };
}
/*
+-------------------------------------------------+
|              Spectrum(p: P5 instance)           |
+-------------------------------------------------+
|///////////////////pubilic///////////////////////|
|renderingMode:String                             |
|name:String                                      |
|draw()|void                                      |                                                                            
+-------------------------------------------------+
This constructor is used to draw a spectrum based on the spectrum taken from the fft of musicAnalyzer.
name: It is used to identify which visualization object is selected or added.
renderingMode: It is used to identify the required rendering mode and links the object to the right canvas(P2D).
draw(): will be called at each frame and draws the spectrum using p5.vertex().


references:
Code structure is based on the template provided for the music visualization in CM1010 Module
*/
