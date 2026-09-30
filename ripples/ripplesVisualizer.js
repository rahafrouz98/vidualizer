class RipplesVisualizer {
    constructor(p) {
        this.name = "Ripples";
        this.renderingMode = "p2d";
        this.#p = p;
        this.#points = new PointsManager(this.#gridSize, this.#sectionAngle, p);
        //initialize four ripples inside a js object using string names for the properties[25]
        for (let i = 0; i < this.#themes.length; i++) {
            this.#imagesBuilders[this.#themes[i]] = new ImagesBuilder(
                this.#skippedPixels,
                this.#points,
                this.#themes[i],
                p,
            );
            this.#ripplesArray.push(
                new Ripple(
                    0,
                    0,
                    p.width,
                    p.height,
                    this.#themes[i],
                    this.#imagesBuilders[this.#themes[i]].getAdjustedGallery(p.width, p.height),
                    this.#freqBands[i],
                    this.#sectionAngle,
                    p,
                ),
            );
        }
        this.#selectedRipple = this.#ripplesArray[0];
        this.#ripplesMenu = new RipplesMenu(p);
        this.#ripplesMenu.colorRadio.changed(() => this.#updateRippleColor(this.#selectedRipple));
        this.#ripplesMenu.freqRadio.changed(
            () => (this.#selectedRipple.freqBand = this.#ripplesMenu.freqRadio.value()),
        );
        this.#ripplesMenu.layoutRadio.changed(() => {
            this.#updateRipplesLayout();
            this.#ripplesMenu.rippleSelectorUpdate(this.#ripplesMenu.layoutRadio.value());
        });
        this.#ripplesMenu.rippleSelector.changed(() => {
            this.#selectedRipple = this.#ripplesArray[parseInt(this.#ripplesMenu.rippleSelector.value()) - 1];
            this.#ripplesMenu.colorRadio.selected(this.#selectedRipple.theme);
            this.#ripplesMenu.freqRadio.selected(this.#selectedRipple.freqBand);
            this.#isHighlight = true;
            setTimeout(() => (this.#isHighlight = false), 2000);
            //It removes focus from the rippleSelector[23]. Otherwise, when numbers are pressed on the keyboard, the shortcut keys for
            // selecting the visualization tools will not work and instead they change the selection on in the rippleSelector.
            document.getElementById("rippleSelector").blur();
        });
        this.#ripplesMenu.sensitivityBar.changed(() => {
            this.#selectedRipple.sensitivity = this.#ripplesMenu.sensitivityBar.value();
            this.#ripplesMenu.sensitivityValue.html(this.#ripplesMenu.sensitivityBar.value());
        });
        //initialize the layout in the first place
        this.#updateRipplesLayout();
    }

    name = null;
    renderingMode = "p2d";

    draw() {
        for (let ripple = 0; ripple < parseInt(this.#ripplesMenu.layoutRadio.value()); ripple++) {
            this.#ripplesArray[ripple].draw();
        }
        this.#highlighter();
    }
    onResize() {
        for (let ripple = 0; ripple < this.#ripplesArray.length; ripple++) {
            this.#ripplesArray[ripple].updateSize();
            this.#ripplesArray[ripple].gallery = this.#imagesBuilders[
                this.#ripplesArray[ripple].theme
            ].getAdjustedGallery(this.#ripplesArray[ripple].width, this.#ripplesArray[ripple].height);
        }
    }
    onoffMenu() {
        this.#ripplesMenu.isMenuActive = !this.#ripplesMenu.isMenuActive;
        this.#ripplesMenu.showAndHideMenu();
    }
    mouseMoved() {
        this.#ripplesMenu.mouseMoved();
    }
    keyPressed(keycode) {
        this.#ripplesMenu.keyPressed(keycode);
    }

    #p = null;
    #skippedPixels = 7;
    #gridSize = 4;
    #sectionAngle = 10;
    #points = null;
    #ripplesArray = [];
    #selectedRipple = null;
    #freqBands = ["audible", "bass", "mid", "highMid"];
    #themes = ["Ocean", "Sun", "Night", "Green"];
    #imagesBuilders = {};
    #ripplesMenu = null;
    #isHighlight = false;

    #updateRippleColor = (ripple) => {
        ripple.gallery = this.#imagesBuilders[this.#ripplesMenu?.colorRadio.value()]?.getAdjustedGallery(
            ripple.width,
            ripple.height,
        );
        ripple.theme = this.#ripplesMenu?.colorRadio.value();
    };

    #rippleShapper = (ripple, style) => {
        //hh:horizontal half screen ,  f: full screen , vh: vertical half screen  , q:quarter screen
        if (style == "f" || style == "hh") {
            ripple.width = this.#p.width;
        } else {
            ripple.width = this.#p.width / 2;
        }
        if (style == "f" || style == "vh") {
            ripple.height = this.#p.height;
        } else {
            ripple.height = this.#p.height / 2;
        }
        ripple.gallery = this.#imagesBuilders[ripple.theme].getAdjustedGallery(ripple.width, ripple.height);
    };

    #updateRipplesLayout = () => {
        //using switch statement is inspired by W3schools[24]
        switch (parseInt(this.#ripplesMenu.layoutRadio.value())) {
            case 1:
                this.#rippleShapper(this.#ripplesArray[0], "f"); // positions the first ripple of the ripplesArray in the full screen
                break;
            case 2:
                //positions the first and second array  in a vertical orientation
                this.#rippleShapper(this.#ripplesArray[0], "vh");
                this.#rippleShapper(this.#ripplesArray[1], "vh");
                this.#ripplesArray[1].xPos = this.#p.width / 2;
                break;
            case 3:
                //postions three ripples. First ripple at the left top, second at top right and third at bottom
                this.#rippleShapper(this.#ripplesArray[0], "q");
                this.#rippleShapper(this.#ripplesArray[1], "q");
                this.#ripplesArray[1].xPos = this.#p.width / 2;
                this.#rippleShapper(this.#ripplesArray[2], "hh");
                this.#ripplesArray[2].yPos = this.#p.height / 2;
                break;
            case 4:
                //positions 4 ways on the screan, each one covers a quarter of screen
                this.#rippleShapper(this.#ripplesArray[0], "q");
                this.#rippleShapper(this.#ripplesArray[1], "q");
                this.#ripplesArray[1].xPos = this.#p.width / 2;
                this.#rippleShapper(this.#ripplesArray[2], "q");
                this.#ripplesArray[2].yPos = this.#p.height / 2;
                this.#rippleShapper(this.#ripplesArray[3], "q");
                this.#ripplesArray[3].yPos = this.#p.height / 2;
                this.#ripplesArray[3].xPos = this.#p.width / 2;
        }
    };

    #highlighter() {
        if (this.#isHighlight) {
            this.#p.push();
            this.#p.noFill();
            this.#p.strokeWeight(10);
            this.#p.stroke(255, 0, 0, 150);
            this.#p.rect(
                this.#selectedRipple.xPos,
                this.#selectedRipple.yPos,
                this.#selectedRipple.width,
                this.#selectedRipple.height,
            );
            this.#p.pop();
        }
    }
}
/*
+-------------------------------------------------------------------------------+
|                             Ripple(p: p5 instance)                            |
+-------------------------------------------------------------------------------+
|///////////////////////////////////pubilic/////////////////////////////////////|
|name: String                                                                   |
|renderingMode: String                                                          |             
|draw()|Voild                                                                   |      
|onResize()|Voild                                                               |
|////////////////////////////////////Private////////////////////////////////////|
|#p: P5 instance                                                                |
|#skippedPixels: Number                                                         |
|#gridSize: Number                                                              |
|#sectionAngle: Number                                                          |
|#points: An instance of PointsManager class                                    |
|#ripplesArray[]: An array of four instances of the Ripple class                |
|#selectedRipple: An reference to a Ripple instance                             |
|#freqBands[]: An array of strings                                              |
|#themes[]: An array of strings                                                 |
|#imagesBuilders{}: An js object                                                |
|#ripplesMenu: An instancd of RipplesMenu class                                 |
|#isHighlight: Boolean                                                          | 
|#updateRippleColor(ripple:Ripple instance)|Void                                | 
|#rippleShapper(ripple: Ripple instance,style: String)|Void                     |
|#updateRipplesLayout()|Void                                                    |
|#highlighter()|Void                                                            |
+-------------------------------------------------------------------------------+
This class is managing the instances of Ripples, RipplesMenu, PointsManager and ImagesBuilder classes.

name: It is used to identify which visualization object is selected or added.
renderingMode:It is used to identify the required rendering mode and liks the object to the right canvas(P2D).
draw(): Called  by the P5 instance draw() function at each frame. It draws the active ripples(based on the selected layout). It also draws a 
        highlighted border around the selected ripple for 2 seconds to show which ripple is selected to the user.
onResize(): It is called by the windowResized() event and updates the size of the ripple as well as the size of the images in the 
            ripples's gallery.
#p:It is the p5 instance which is passed as an argument to the Ripple class and p5 libraries are called through this.                                                                 
#skippedPixels: This variable is passed to the ImagesBuilder class to optimize the process time. The algorithm skips calculating the 
               distance between the closest point and pixels for a specific number of pixels, and instead uses the previous distance obtained
               from last calculation. A large value for this vairable decreases the resolution and increases FPS while a small 
               value increases resolution and decreases FPS. The value of 6 is obtained by try and error to make a ballance between FPS 
               and resolution.                                   
#gridSize: Represents the number of columns and rows of cells for the ripple. It is passed to the PointsManager instance for
          gridding and points distribution on the canvas.                                                     
#sectionAngle: The points in the PointsManager rotate around a circle in angular sections. Each section is referred as a buffer in draw(). 
            The angular difference between consecutive sections (buffers) is called sectionAngle. This variable is passed to the PointsMAnager
            and the Riplple instances.                                                          
#points: An instance of the PointsManager class to create a list of randomly distributed  points for each buffer of the ripple animation.                                
#ripplesArray[]: An array for four elements which are refrencing to the Ripple instances.                
#selectedRipple: Indicates which of four existing ripples in the app is selected to be edited.                             
#freqBands[]:  An array of four strings representing the default frequency bands for each of the four Ripple instance.                                                      
#themes[]:   An array of four strings representing the default color theme for each of the four Ripple instance.                                               
#imagesBuilders{}: An js object that holds four instances of the ImageBuilder class for different color themes. Color themes are used as the name of 
                the properties (in string format) in this object[25]. This approach helpd to select the ImageBuilder instance based on the coloe theme.          
#ripplesMenu:  An instance of RipplesMenu which manages the DOM controllers for the ripple visualization and editing.                            
#isHighlight:  It turns on and off the highlighted border of the ripple, when the ripple is selected to be edited. It helps the user to
              select the right ripple. When the change event is triggered by the rippleSelector, it turns on and after 2 seconds it turns
              off using setTimeout().                                                      
#updateRippleColor(ripple): This method is called when the change event is triggered by the colorRadio button in the RippleMenu.                     
#rippleShapper(ripple,style): It takes two arguments. One is the ripple to resize it, and the other is the style (f: full screen , 
                             hh: horizontal half Screen , vh: vertical half screen , q: quarter screen). It changes the size of 
                             the ripple based on the provided styles.             
#updateRipplesLayout(): This method is used at initializing moment or when the layout radio button is used to change the layout. It change 
                       the size of four ripples based on the selected ripples by calling rippleShapper. It also relocate the ripples when it is 
                       needed to layout ripples correctly.                                                   
#highlighter():  This method is called in the draw() method of this class and draws a red border for the selected ripple as long as the
                isHighlight is true.
*/
