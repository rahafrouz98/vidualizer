class PlaybackButton {
    constructor(p) {
        this.#p = p;
        this.#playbackButton = p.createButton("&#9205;");
        //setup playback menu
        this.#playbackButton.parent(document.body);
        this.#playbackButton
            .style(`position: absolute; left:250px;top:10px;color:rgb(61, 13, 81);height:40px;width:40px;
		                                           z-index:2; background-color:rgb(0,0,0,0) ;font-size: 40px;border:0px`);
        //it changes the color tone when mouse goes over the button
        this.#playbackButton.mouseOver(() => this.#playbackButton.style("color:rgb(39, 24, 179)"));
        //it changes the color back to default  when mouse goes out
        this.#playbackButton.mouseOut(() => this.#playbackButton.style("color:rgb(61, 13, 81)"));
        // it runs the hitCheck() function when button is clicked
        this.#playbackButton.mouseClicked(() => this.#hitCheck());
    }
    #p = null;
    #playbackButton = null;

    //checks for clicks on the button, starts or pauses playabck.
    //switches between the play and pause emojis
    //play and puse Emojis are inspired by W3schools[31].
    #hitCheck() {
        if (soundApp.sound.isPlaying()) {
            soundApp.sound.pause();
            this.#playbackButton.html("&#9205;");
        } else {
            soundApp.sound.loop();
            this.#playbackButton.html("&#9208;");
        }
    }
}
/*
+-------------------------------------------------+
|              PlaybackButton(p: P5 instance)     |
+-------------------------------------------------+
|///////////////////private///////////////////////|
|#p: p5 instance                                  |
|#playbackButton: HTML element                    |                                                      
|#hitCheck()|void                                 |                                                                            
+-------------------------------------------------+
This class creates a playback button to play and pause the music. 

#p: it is a p5 instance.
#playbackButton: It is an HTML button. 
hitCheck(): It stops or plays music and changes the appearance of the button accordingly. 

Code structure is based on the template provided for the music visualization in CM1010 Module.
*/
