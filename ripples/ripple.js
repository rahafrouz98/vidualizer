class Ripple
{
    constructor(xPos,yPos,width,height,theme,gallery, freqBand, sectionAngle, p)
    {
        this.#p = p;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.freqBand = freqBand;
        this.gallery = gallery;
        this.theme = theme;
        this.#p = p;
        this.#windowWidthHolder = p.windowWidth;
        this.#windowHeightHolder = p.windowHeight;
        this.#sectionAngle = sectionAngle
    }
    sensitivity = 0.3;
    xPos = null;
    yPos = null;
    width = null;
    height = null;
    freqBand = null;
    gallery = null;
    theme = null;

    updateSize()
    {
        let newRippleWidth = this.#p.windowWidth*(this.width)/this.#windowWidthHolder;
        let newRippleHeight = this.#p.windowHeight*(this.height)/this.#windowHeightHolder;
        this.width = newRippleWidth;
        this.height = newRippleHeight;
        let newxPos = this.#p.windowWidth*this.xPos/this.#windowWidthHolder;
        let newyPos = this.#p.windowHeight*this.yPos/this.#windowHeightHolder;
        this.xPos = newxPos;
        this.yPos = newyPos;
        //update #windowWidthHolder and #windowHeightHolder for the next window's size change, when the 
        //function is calledagain
        this.#windowWidthHolder = this.#p.windowWidth;
        this.#windowHeightHolder = this.#p.windowHeight;
    }
    draw = function()
    {
        // the instant energy of the specific frequency band of the playing music
        let instantEnergy = soundApp.musicAnalyzer.instantEnergy[this.freqBand];
        //the average energy of the specific frequency band of the playing music
        let averageEnergy = soundApp.musicAnalyzer.averageEnergy[this.freqBand];
        // Increasing this factor (decreasing the sensitivity property) reduces the ripple's sensitivity to music 
        // energy, causing the animation to move slower, and vice versa. This factor helps achieve an appropriate 
        // ripple speed for all music styles, regardless of whether their average energy is low or high.
        let speedFactor = averageEnergy*(1-this.sensitivity);
        //Updates the speed using quartic function. It keeps the speed low at lower energies and increase the speed much faster at higher energies.
        this.#speed = (instantEnergy/(1+speedFactor))**4;
        //the buffer ≡ bufferLog in mod (360/this.#sectionAngle) , in modular arithmetic
        //I used this formula to reset the buffer  every 360 degree and simulate rotation
        let buffer = this.#bufferLog%(Math.floor(360/this.#sectionAngle));
        this.#rippleDraw(buffer)
        //angle will be increased by the value of the speed 
        this.#angle+=this.#speed;
    
        //the bufferLog is updated for the next frame
        this.#bufferLog = Math.floor(this.#angle/this.#sectionAngle)
    }

    #p 
    #bufferLog = 0;
    #angle = 0; 
    #speed = 0;
    #windowWidthHolder = null;
    #windowHeightHolder = null;
    #sectionAngle

    #rippleDraw(buffer)
    {
        this.#p.image(this.gallery[buffer],this.xPos,this.yPos);  
    }
}
/*
+----------------------------------------------------------------------------------------+
|   Ripple(xPos:Number,yPos:Number,width:Number,height:Number,theme:String,              |
|            gallrry[]:Array of p5.image objects, freqBand: String,sectionAngle: Number, |
|                p: p5 instance)                                                         |
+----------------------------------------------------------------------------------------+
|//////////////////////////////////////////pubilic///////////////////////////////////////|
|sensitivity: Number                                                                     |
|xPos: Number;                                                                           |
|yPos: Number;                                                                           |
|width: Number;                                                                          |
|height: Number;                                                                         |
|freqBand: String;                                                                       |
|gallery[]: Array of p5.image objects                                                    |
|theme: String                                                                           |
|updateSize()|Void                                                                       |
|draw()|Void                                                                             |
|///////////////////////////////////////////Private//////////////////////////////////////|
|#p:p5 instance                                                                          |
|#bufferLog: Number                                                                      |
|#angle: Number                                                                          |
|#speed: Number                                                                          |
|#windowWidthHolder: Number                                                              |
|#windowHeightHolder: Number                                                             |
|#sectionAngle: Number                                                                   |
|#rippleDraw(buffer:Number)|Void                                                         |
+----------------------------------------------------------------------------------------+
This class is a simulator of the ripple. It holds a list of images of ripples for different buffers
and draw them on the canvas sequentialy, depending on the music's energy signals. The idea of using Worely noise algorithm to simulate ripples
is inspired by [27],[28] and [29]. 

sensitivity: Indicates the sensitivity of the ripple's speed to the energy. By trial and error, I found 0.3 to be the optimal sensitivity value for most music styles.
             A slider is provided in the ripplesMenu to adjust this value during the app's use if needed.
xPos: It is the top-left x-coordination of the ripple.
yPos: It is the top-left y-coordination of the ripple.
width: It is the  width of the ripple.
height: It is the  height of the ripple.
freqBand: It is the frequency band on which ripple visualization is based.
gallery: The list of image objects used in sequence to animate ripples
theme: The color theme of the ripple. 
updateSize(): This function updates the width, height x position and y position of the ripple based on the 
              width and height of the window. It is called when the size of the window is changed.                                                            |
draw(): This is getting the instant energy and average energy of a specific frequency band from the MusicAnalyzer 
        instance, calculate the speed, update the bufferLog for next frame, and draw one of the images from the 
        image list based on the previous bufferLog. 
#p:It is the p5 instance which is passed as an argument to the Ripple class and p5 libraries are called through this.                                                                  
#bufferLog: It is the integer part of (angle/ sectionAngle) which is corresponding to the angular section(buffer 
           without modular mode) in which the ripple is being visualized. The equivalent of bufferLog in mod (360/this.#sectionAngle) is corresponding
           to the image index in the gallery. It is used to select the correct image from the gallery and draw it on the canvas.                                                        
#angle: Refers to the angle of rotation of points in the pointsManager.                                                                 
#speed: Indicates the speed at which the ripple's images are displayed in sequence.The formula for the speed is ubtained by ploting 
       the instance energy and average energy of multiple music styles in the Desmos graph tool and estimating a relationship
       between speed of the ripple, energy and average energy.                                                                 
#windowWidthHolder: Holds the width of the window to be used as the previous size of the window, and is used for calculations to update the size and 
                    location of the ripple when the window's size is changed.                                                    
#windowHeightHolder: Holds the height of the window to be used as the previous size of the window, and is used for calculations to update the size  and 
                     location of the ripple when the window's size is changed.                                                       
#sectionAngle: The points in the PointsManager rotate around a circle in angular sections. Each section is referred to as a buffer in draw(). 
               The angular difference between consecutive sections (buffers) is called sectionAngle.                                                       
#rippleDraw(buffer): This function draws an image from the gallery list which its index is equal to the buffer.

*/

