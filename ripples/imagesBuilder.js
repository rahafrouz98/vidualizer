class ImagesBuilder
{
    constructor(skippedPixels,pointsManager,colorTheme, p)
    {
        this.#p = p;
        this.#imageWidth = screen.width;
        this.#imageHeight = screen.height;
        this.#pointsManager = pointsManager;
        this.#colorTheme = colorTheme;
        this.#skippedPixels = skippedPixels;
        //the idea of using exponentiation formula to map the distance to the RGB components is inspired by Kazuki Umeda[37].
        //The mapping formula is obtained as y = (distance/c)^2+b using the Desmos graph tool and is used to map the distance to the red, 
        // green and blue components of the color. It starts from base color components at the location of the nearest point and faints to white when 
        // the distance increases. the values for b and c attributes are obtained by try and error using graph tool in the Desmos
        //pallet is an object to hold the base color, which is used as the b attribute in the mapping formula, and the c attribute, for each theme. 
        
        this.#pallet =
                    {
                        "Ocean":
                            {
                                baseColor:[65,105,220], // [b for red, b for green, b for blue]
                                c:[29, 32, 64] // [c for red, c for green, c for blue]
                            },
                        "Sun":
                            {
                                baseColor:[200,200,0], // [b for red, b for green, b for blue]
                                c:[53, 53, 19] // [c for red, c for green, c for blue]
                            },
                        "Night":
                            {
                                baseColor:[15,15,50], // [b for red, b for green, b for blue]
                                c:[26, 26, 28] // [c for red, c for green, c for blue]
                            },
                        "Green":
                            {
                                baseColor:[0,150,0], // [b for red, b for green, b for blue]
                                c:[25, 39, 25] // [c for red, c for green, c for blue]
                            }    
                    }

        this.#imageCreator()
        
    }
    //this method returns a deep copy of the originImageArray[buffer] with adjusted sizes of width and heigh
    getAdjustedGallery(width, height)
    {
        let tempImageArray =[];

        for(let buffer = 0; buffer < this.#originImageArray.length; buffer++)
        {
            tempImageArray.push(this.#p.createImage(width,height))
            
            tempImageArray[buffer].copy(this.#originImageArray[buffer], 0, 0,this.#originImageArray[buffer].width, this.#originImageArray[buffer].height,
                                                    0 ,0 ,tempImageArray[buffer].width, tempImageArray[buffer].height) 
        }
        return tempImageArray;
    }
    #p = null;
    #pointsManager = null;
    #colorTheme = null;
    #skippedPixels = null;
    //the wave images will be created based on the size of the user's screen for the first time. 
    //using screen.width and screen.height inspired by W3schools[30]
    #imageWidth = null;
    #imageHeight = null;
    #pallet={};
    //it is an array to hold all the image of each buffer in the p5.Graphics format
    #originImageArray=[];

    // for color mapping based on the formula of ((distance/c)**2+b)Desmos tools is used to determine the values for c and b to get the desired
    // colors at pixels close th the featured points to pixels farther away from points where color fades to white(255,255,255).
    #colorMapping = (distance, b, c) =>
    {
        return ((distance/c)**2+b)
    }

    //builds the originImageArray
    #imageCreator()
    {
        for(let buffer = 0; buffer < this.#pointsManager.BLP.length; buffer++)
        {
            let tempP5Image = this.#p.createImage(this.#imageWidth,this.#imageHeight);
            tempP5Image.pixelDensity(1);
            tempP5Image.loadPixels();
            for( let imageY = 0; imageY< this.#imageHeight; imageY++)
            {
                for(let imageX = 0; imageX < this.#imageWidth; imageX+=(1+this.#skippedPixels))
                {
                   let squareMinDistance = Infinity;
                    for(let i = 0; i < this.#pointsManager.BLP[buffer].length; i++)
                    {
                        //Phthagorean Theorm is used to calculate the square of distance between the pixel and points
                        //this approach optimize the processing time in comparision with dist() as we do not need to square root it in
                        //every calculation
                        if(squareMinDistance > ((imageX-this.#pointsManager.BLP[buffer][i].x)**2 + (imageY-this.#pointsManager.BLP[buffer][i].y)**2))
                        {
                            squareMinDistance = (imageX-this.#pointsManager.BLP[buffer][i].x)**2 + (imageY-this.#pointsManager.BLP[buffer][i].y)**2
                        }
                    }
                        //imageX and imageY are the cartisian coordinates of the pixel in the image.
                        // the index value of a pixel in pixels[]  with x and y coordinationis is equal to the (x+y*width)*4 , 
                         // inspired by Kazuki Umeda,https://youtu.be/kUexPZMIwuA?si=v1Nh5rFZDiAAONKh 
                    let minDistance = Math.sqrt(squareMinDistance);
                    tempP5Image.pixels[(tempP5Image.width*imageY+imageX)*4+0] = this.#colorMapping(minDistance,this.#pallet[this.#colorTheme].baseColor[0],this.#pallet[this.#colorTheme].c[0]);
                    tempP5Image.pixels[(tempP5Image.width*imageY+imageX)*4+1] = this.#colorMapping(minDistance,this.#pallet[this.#colorTheme].baseColor[1],this.#pallet[this.#colorTheme].c[1]);
                    tempP5Image.pixels[(tempP5Image.width*imageY+imageX)*4+2] = this.#colorMapping(minDistance,this.#pallet[this.#colorTheme].baseColor[2],this.#pallet[this.#colorTheme].c[2]);
                    tempP5Image.pixels[(tempP5Image.width*imageY+imageX)*4+3] = 255;

                    for(let j = 1; j<=this.#skippedPixels; j++)
                    {
                        if((imageX+j) < this.#imageWidth )
                        {
                            tempP5Image.pixels[(tempP5Image.width*imageY+imageX+j)*4+0] = tempP5Image.pixels[(tempP5Image.width*imageY+imageX)*4+0]
                            tempP5Image.pixels[(tempP5Image.width*imageY+imageX+j)*4+1] = tempP5Image.pixels[(tempP5Image.width*imageY+imageX)*4+1] 
                            tempP5Image.pixels[(tempP5Image.width*imageY+imageX+j)*4+2] = tempP5Image.pixels[(tempP5Image.width*imageY+imageX)*4+2]
                            tempP5Image.pixels[(tempP5Image.width*imageY+imageX+j)*4+3] = 255;
                        }
                        else
                        {
                            break;
                        }
                    }

                }
            }
            tempP5Image.updatePixels();
            this.#originImageArray[buffer]=(tempP5Image);
        }
    }
}
/*
+----------------------------------------------------------------------------------------+
|   ImagesBuilder(skippedPixels: Number,pointsManager: PointsManager Instance            |
|                     ,colorTheme: String, p: p5 Instance)                               |
+----------------------------------------------------------------------------------------+
|//////////////////////////////////////////pubilic///////////////////////////////////////|
|getAdjustedGallery(width: Number, height: Number)| An array of p5.image Instances       |                                                                       
|///////////////////////////////////////////Private//////////////////////////////////////|
|#p: p5 instance                                                                         |
|#pointsManager: PointManager Instance                                                   | 
|#colorTheme: String                                                                     |
|#skippedPixels: Number                                                                  |
|#imageWidth: Number                                                                     |
|#imageHeight: Number                                                                    |
|#pallet{}: an js object                                                                 |
|#originImageArray[]: An array of images                                                 |                                               
|#colorMapping(distance: Number, b: Number, c: Number)| Number                           |
|#imageCreator()| Void                                                                   |
+----------------------------------------------------------------------------------------+
This class initializes an array of images to be used in the Ripple class to illustrate the ripple.
Each image is corresponds to a buffer, and using them sequentially animates the ripple effect. Ripple visualization 
is based on the Worley noise algorithm[27], [28] and [29]. The algorithm computes the distance of each pixel to its nearest point generated by the 
PointManager instance for each buffer, maps this distance to color, from the base color (for pixel close to the featured point) to white (for pixel farther away). 
The mapped colors will update the pixels of the image for each buffer and all images will be refrenced by an array. 

getAdjustedGallery(width,height): This function takes two arguments as the numbers representing the update dimentions of the Ripple instance, it resizes the images of the 
                                  originImageArray[] to match with the given dimensions, and return an adjusted array of images that fit within the Ripple instance.

#p: A p5 instance used to access the p5 library functions.
#pointsManager: A PointManager instrance which holds the points for each buffer. 
#colorTheme : A string to indicate the color theme between: "Ocean", "Sun", "Night" and "Green".
#skippedPixels: This variable is passed to the ImagesBuilder class to optimize the process time. The algorithm skips calculating the 
               distance between the closest point and pixels for a specific number of pixels, and instead uses the previous distance obtained
               from last calculation. A large value for this vairable decreases the resolution and increases FPS while a small 
               value increases resolution and decreases FPS. The value of 6 is obtained by try and error to make a ballance between FPS 
               and resolution. 
#imageWidth: Represents the width of the origin images.
#imageHeight: Represents the height of the origin images.
#pallet: It is an js object with four properties named with strings, each named after a color theme. Each  property is also an object with two
         properties: 
                    1- the array of numbers[red,green,blue] representing the base color 
                    2- the array of numbers representing the values of used in the maping formula for each component of color. 
#originImageArray[]: An array that holds the original images which created at the start of the app. Copies of these images are resized when the Ripple size changes.
                     This approach optimizes performance by avoiding creating the images again.
#colorMapping(distance, b ,c):  Maps the distance to color using the formula:  Color Component = (distance/c)^2+b . In the formula distance is the 
                               distance between the pixel and the nearest point in the pointsManager. b is the color component of the base color( close to the featured
                               point). c is the factor that is obtained by Desmos graph tools[37] to fade the color to white when the pixel is far from the points. 
#imageCreator(): Generates an array of images of ripples for each buffer based on the size of the screen at the begining of app in the setup() function of p5 and holds 
                 them as the reference for creating copy of these images and resize them as needed.                 
*/