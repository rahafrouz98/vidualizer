class PointsManager
{
        constructor(gridSize,sectionAngle,p)
        {
                this.#p = p;
                this.#gridSize = gridSize;
                this.#sectionAngle = sectionAngle;
                //instead of p.width and p.height, I used screen.width and screen.height[30] to ensure that calculations are based on the entire screen in case the 
                //windoe is not maximized. Otherwise, if the calculations are based on the smaller window and the window is later resized to full size, the resolution 
                // of the generated images would be insufficient. 
                this.#cellWidth =  screen.width/gridSize;
                this.#cellHeight =  screen.height/gridSize; 
                this.#diameter = Math.sqrt(this.#cellWidth**2+this.#cellHeight**2)/2
                this.#pointsDistributer();
                this.#phasing();
                this.#pointsRotation(); 
        }
        BLP = [];
        #p = null;
        #gridSize = null;
        #sectionAngle = null;
        #rotationCenters = [];
        #cellWidth =  null;
        #cellHeight =  null;
        #intPhaseList = [];
        #diameter = null;
  
        #pointsDistributer()
        {
                for( let j = 0; j < this.#gridSize; j++)
                {
                        for( let i = 0; i< this.#gridSize; i++)
                        {
                                this.#rotationCenters.push(new this.#p.createVector((((i*this.#cellWidth)+(i*this.#cellWidth)+this.#cellWidth)/2),
                                                                                (((j*this.#cellHeight)+(j*this.#cellHeight)+this.#cellHeight)/2)));
                        }
                }
        }
        #phasing()
        {
                for ( let i = 0; i < this.#rotationCenters.length; i++)
                {
                        this.#intPhaseList.push(this.#p.random(0, Math.PI * 2));
                }
        }
        #pointsRotation()
        {
                //it divides a complete circle into sections (buffers) with angles equal to sectionAngle
                let buffers = 360/this.#sectionAngle;
                //Each rotation of points are divided into buffers which holds the location of points for that specific phase of rotation
                for( let buffer = 0; buffer< buffers; buffer++ )
                {
                        //It is the list of location of points for this specific buffer
                        let tempBLP=[];
                        for(let i = 0; i < this.#rotationCenters.length; i++)
                        {
                                //sectionAngle is in degrees. I changed it to radian.
                                let tempPoint = this.#p.createVector( (this.#rotationCenters[i].x+ this.#diameter*Math.cos(this.#sectionAngle*buffer*Math.PI/180 + this.#intPhaseList[i])),
                                                                (this.#rotationCenters[i].y+ this.#diameter*Math.sin(this.#sectionAngle*buffer*Math.PI/180 +this.#intPhaseList[i])))
                                tempBLP.push(tempPoint)
                        }
                        this.BLP.push(tempBLP)
                }
        }
}
/*
+---------------------------------------------------------------------------------------+
|     PointsManager(gridSize: Number,sectionAngle:Number, p:p5 instance)                |
+---------------------------------------------------------------------------------------+
|////////////////////////////////////////pubilic////////////////////////////////////////|
|BLP[][] = A 2-dimensional array of p5.vectors                                          |                                                         
|////////////////////////////////////////Private////////////////////////////////////////|
|#p: p5 instance                                                                        |
|#gridSize:Number                                                                       |
|#sectionAngle: Number                                                                  |        
|#rotationCenters[]: an array of numbers                                                |
|#cellWidth:Number                                                                      |
|#cellHeight:Number                                                                     |
|#intPhaseList[]:                                                                       |
|#diameter:                                                                             |
|#pointsDistributer()|Void                                                              |
|#phasing()|Void                                                                        |
|#pointsRotation()|Void                                                                 |
+---------------------------------------------------------------------------------------+
This class randomly distributes points on the screen and rotates them around the center of each cell. 
At each buffer of the animation, points locate at a specific circular angle.

BLP[][]: Stands for buffer,location,points. this is a 2-dimensional array, a list of buffers, and each 
         buffer is the list of location of each point for that buffer. The points are instances of p5.vector.
#p: A p5 instance which is passed as an argument and p5 libraries are called through this.                                                                  
#gridSize: Indicates the number of columns and rows of cells for the ripple. Since each cell contains 
           one point, gridSize² equals the number of points used in the Worley noise algorithm. Increasing this value increases the 
           number of points and, consequently, the processing time.
#sectionAngle: The points rotate around a point listed in the rotationCenters in angular sections. Each section is called a buffer. 
               The angular difference between consecutive buffers is called sectionAngle.        
#rotationCenters[]: An array that holds the center of each cell as a p5.vector instance. Points in the BLP array rotate around 
                    these points.
#cellWidth: The width of each cell 
#cellHeight: The height of each cell
#intPhaseList[]: This is an array that holds the starting phase of rotation for each point, so the rotation 
                 angles are unevenly distributed between points.
#diameter: The diameter of circles which points rotate around and is considered to be equal to the diagonal of the cells.
#phasing(): An array that randomly initializes the starting phase of rotation for each point, so the rotation 
                 angles are unevenly distributed. It holds the initial phase of each point in the array of intPhaseList[].
#pointsRotation(): In this function, each point starts rotating ,by sectionAngle at each buffer, at its initial phase.
                   It holds the location of points, for each buffer, in the form of an array as an element of BLP[].
pointsDistributer(): It is called once the object is created to randomly distribute points, one point for each cell.
                It adds the points in the form of p5.vector to the rotationCenters array.
*/


