// this P5 instance is creatred for 2d visualizations
let sketckP2D = function (p) {
    p.preload = function () {
        soundApp.sound = p.loadSound("assets/644413__vibritherabjit123__relaxing-dubstep-music.wav");
    };

    p.setup = function () {
        //Create a canva with P2D rendering mode
        soundApp.canvasP2D = p.createCanvas(p.windowWidth, p.windowHeight);
        //Document.body returns the <body> existing in the HTML , inspired by Mozilla Developer Network[9].
        soundApp.canvasP2D.parent(document.body);
        //The idea of using z-index property to manage the stack order is inspired by W3schools[10]. Because z-index only works with
        //positioned elements, I used position:absolute in the style.
        soundApp.canvasP2D.style("position: absolute; left:0px; top:0px ;z-index:2;display:none;");
        //This event toggles the window between fullscreen and non-fullscreen. The reason I transfered this event handler here
        //and used HTML element event hanler is that this event needs to happen for both canvasP2D and canvasWEBGL with using
        // the right p as a p5 instance.
        //using arrow function is inspired by W3schools[11]
        soundApp.canvasP2D.doubleClicked(() => {
            p.fullscreen(!soundApp.fs);
            soundApp.fs = !soundApp.fs;
        });

        //the p is the p5 instance which is passed to the Visualizations and will be used for
        //DOM elements creation in the Visualizations.
        soundApp.vis = new Visualisations(p);
        p.frameRate(60);

        //add 2d visualisations
        soundApp.vis.add(new Spectrum(p));
        soundApp.vis.add(new WavePattern(p));
        soundApp.vis.add(new Needles(p));
        soundApp.vis.add(new Fireworks(p));
        soundApp.vis.add(new RipplesVisualizer(p));

        //initiates the p5 instance for 3d visualizations , inside the webglInstance 3d visualizations will be added.
        //This p5 instance is initiated here to make sure that soundApp.vis is already initiated and existing which will be
        //used in side the  webglInstance for adding 3d visualizations.
        soundApp.webglInstance = new p5(sketckWEBGL);

        //when the window has been resized. Resize canvas to fit. If the visualisation needs to be resized call its onResize method.
        //Adding a global resize listener to handle two p5 instances is inspired by OpenAi[12]. The reason I used global listener is
        //that when the canvas is in "display:none" status, the windowResize() from p5 library will not work, and the visualizer will not
        //be resized in this case.
        window.addEventListener("resize", () => {
            soundApp.p2dInstance.resizeCanvas(window.innerWidth, window.innerHeight);
            soundApp.webglInstance.resizeCanvas(window.innerWidth, window.innerHeight);

            for (let i = 0; i < soundApp.vis.visuals.length; i++) {
                //using optional chain for methods of an object is inspired by Mozilla Developer Network[13].
                soundApp?.vis?.visuals[i].onResize?.();
            }
        });
    };

    p.draw = function () {
        //pixelDensity(1) is used to have a consistency of pixels density for variety of screens with different resolutions[14].
        p.pixelDensity(1);
        //updtaes the FFT instance inside the musicAnalyzer and instanceEnergies and averageEnergies.
        soundApp.musicAnalyzer.analyze();
        p.background(0);

        if (soundApp.vis.selectedVisual.renderingMode == "p2d") {
            //Make sure canvaP2D is not hiden because we need to see canvaP2D for 2d visualizations
            soundApp.canvasP2D.style("display:block;");
            //draw the selected visualisation
            soundApp.vis.selectedVisual.draw();
        }
    };

    //Moving the mouse near the left and right edge of the canvas the active menus will show and hide
    p.mouseMoved = function () {
        //Optional chaining operatoe [13] is used to prevent errors at the begining of app when the vis and musicAnalyzer are not initialized yet.
        soundApp?.vis?.selectedVisual?.mouseMoved?.();
        soundApp?.vis?.mouseMoved();
        soundApp?.musicAnalyzer?.mouseMoved?.();
    };
    //by pressing the space, all active menus will show and hide.
    //by pressing numbers the corresponding visualization will be selected
    p.keyPressed = function () {
        //this makes sure that 32 will be passed only if
        let keycode;
        //Ensures that 32 (space key) is passed only if the mouse is not pressed. It prevents conflicts when a mouse button is pressed on one of the visualizationMenu
        //buttons and the space key is pressed before mouse button is released. Whithout this check if the inActive property of ripplesMenu or sceneMenu is false,
        //their css display property will stay "none" and wont be changed by the space key, causing menus on the left(visualizationMenu) and on the right
        //(ripplesMenu or sceneMenu) to toggle by pressing the key space instead of showing together.
        p.mouseIsPressed ? (keycode = 0) : (keycode = p.keyCode);
        soundApp?.vis?.selectedVisual?.keyPressed?.(keycode);
        soundApp?.vis?.keyPressed?.(keycode);
    };
    p.mouseWheel = function (event) {
        soundApp?.vis?.selectedVisual?.mouseWheel?.(event);
    };
    p.mouseDragged = function () {
        soundApp?.vis?.selectedVisual?.mouseDragged?.();
    };
    p.mousePressed = function () {
        soundApp?.vis?.selectedVisual?.mousePressed?.();
    };
};
