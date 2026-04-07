class WobblySphere extends Object3d
{
    constructor(centerPoint,objectColor,objectSize, isNormalMaterial, p)
    {
        super(centerPoint,objectColor,objectSize, isNormalMaterial,p);
        WobblySphere.counter++;
        this.name = "Sphere" + WobblySphere.counter;
        this.#marblesInitializer()
        this.ID = crypto.randomUUID()
        this.p.camera(0,1000,800,0,0,0,0,1,0);
    }
    static counter = 0;

    draw=function() 
    {
        this.p.noStroke();
        //Generates a spectrum where the number of frequency bins equals to the number of marbles. TEach marble will be related to a specific frequency band.  
        this.#customizedSpectrum =soundApp.musicAnalyzer.customizeSpectrum(this.#marblesList.length);
        //Rotates the sphere based on the amount of instant energy received from the music in the frequency band of 100hz to 20000hz.
        this.#rotationEnergy = soundApp.musicAnalyzer.instantEnergy["audible"]*this.#rotationFactor;
        //updates the location od each mable based on the received signals (#customizedSpectrum and #rotationEnergy) from the music.
        this.#updateMarbles();
        //calls the draw function of each marble and draws them.
        this.#assembleMarbles();
    }

    //Overrides the switchIsSelected() method of the parent class (Object3d). This function toggles the isSelected property of the object 
    //and isSelected property of all marbles
    switchIsSelected()
    {
        super.switchIsSelected();
        for(let i = 0; i < this.#marblesList.length; i++)
        {
            this.#marblesList[i].switchIsSelected();
        }
    }
    //Overrides the relocateZ() method of the parent class (Object3d). This function updates the z-coordinate of the object's centerpoint 
    //and  z-coordinate of the object's centerpoint  of all marbles.
    relocateZ(delta)
    { 
        super.relocateZ(delta);
        for(let i = 0; i < this.#marblesList.length; i++)
        {
            this.#marblesList[i].relocateZ(delta);
        }
    }
    //Overrides the relocateX() method of the parent class (Object3d). This function updates the x-coordinate of the object's centerpoint 
    //and  x-coordinate of the object's centerpoint  of all marbles.
    relocateX(delta)
    {
        super.relocateX(delta);
        for(let i = 0; i < this.#marblesList.length; i++)
        {
            this.#marblesList[i].relocateX(delta);
        }

    }
    //Overrides the relocateY() method of the parent class (Object3d). This function updates the y-coordinate of the object's centerpoint 
    //and  y-coordinate of the object's centerpoint  of all marbles.
    relocateY(delta)
    {
        super.relocateY(delta);
        for(let i = 0; i < this.#marblesList.length; i++)
        {
            this.#marblesList[i].relocateY(delta);
        }

    }
    //Overrides the changeColor() method of the parent class (Object3d). This function updates the object's color
    //and the object's color of all marbles.
    changeColor(newColor)
    {
        super.changeColor(newColor)
        for(let i = 0; i < this.#marblesList.length; i++)
        {
            this.#marblesList[i].changeColor(newColor);
        }
    }
    //Overrides the changeScale() method of the parent class (Object3d). This function updates the object's scale
    //and the object's scale of all marbles.
    changeScale(scale)
    {
        super.changeScale(scale);
        this.#marblesInitializer();
        for(let i = 0; i < this.#marblesList.length; i++)
        {
            this.#marblesList[i].switchIsSelected();
        }

    }
    //Overrides the changeIsNormalMaterial() method of the parent class (Object3d). This function updates the isNormalMAterial property of the object
    //and the isNormalMAterial property of all marbles.
    changeIsNormalMaterial(status)
    {
        super.changeIsNormalMaterial(status);
        for(let i = 0; i < this.#marblesList.length; i++)
        {
            this.#marblesList[i].changeIsNormalMaterial(status);
        }
    }
    #marbleSize= null;
    #resolution = 20;
    #marblesList = [];
    #spectrumFactor = 0.5;
    #rotationEnergy = 0;
    #rotationFactor = 0.0002
    #customizedSpectrum = [];
    #marbleSizeFactor = 0.09
    //create a list of marble instances
    #marblesInitializer()
    {
        //it makes sure #marbleList is reseted 
        this.#marblesList = [];
        this.#marbleSize = this.#marbleSizeFactor*this.size*this.scale;
        //Identifies the center points of Marble instances on the circle on xy plan.
        //theta represents the circular angle of a circle on the XZ plane.This circle is divided into resolution/2 sections by planes parallel to the XY plane
        for( let theta =-Math.PI/2+Math.PI/(this.#resolution/2); theta < Math.PI/2; theta += Math.PI/(this.#resolution/2) )  
        {   
            //Circles parallel to xy                                                                                                
            let xyCircleRadious = (this.size*this.scale)/2 * Math.cos(theta);  
            //Circles parallel to xy plan are devided into sections by the resolution.
            let sectionAngle = (2*Math.PI) / this.#resolution;
            for(let section= 0; section<this.#resolution; section++)
            {
                let z = this.centerPoint.z+(this.size*this.scale)/2 * Math.sin(theta);
                let x = this.centerPoint.x+((this.size*this.scale)/2 * Math.cos(theta))*Math.cos(sectionAngle*section);
                let y = this.centerPoint.y+((this.size*this.scale)/2 * Math.cos(theta))*Math.sin(sectionAngle*section);
                let marbleCenterpoint = this.p.createVector( x,y,z);

                this.#marblesList.push(new Marble(marbleCenterpoint, this.color, this.#marbleSize, this.isNormalMaterial, this.p));
            }
        }
    }
    #assembleMarbles()
    {
        for(let i = 0; i < this.#marblesList.length; i++)
        {
            
            this.#marblesList[i].draw();
          
        }
    }
 
    //updates the actual location of marbles based on the #customizedSpectrum and #rotationEnergy
    //Each marble is assigned to one bin in the #customizedSpectrum
    #updateMarbles()
    {
        let bandIndex = 0;
        
        for (let i = 0; i < this.#marblesList.length; i++)
        {
            //relative vector on the xy plane from the center of shpere to the center of marble
            let xyVector = this.p.createVector((this.#marblesList[i].centerPoint.x-this.centerPoint.x),(this.#marblesList[i].centerPoint.y-this.centerPoint.y))
            //rotates the vectore based on the instant energy received from the music multiplied by the #rotationFactor.
            xyVector.rotate(this.#rotationEnergy);
            //updates the centerPoints of the marble.
            this.#marblesList[i].centerPoint.x = xyVector.x+this.centerPoint.x;
            this.#marblesList[i].centerPoint.y = xyVector.y+this.centerPoint.y;
            //wobblwPoint is the actual location of marble which is relocated bu music effect. centerPoint is the original location of the 
            //marble on the sphere and marble will return to this location when it does not receive signal from the music.
            this.#marblesList[i].wobbledPoint = this.p.createVector(this.#marblesList[i].centerPoint.x, this.#marblesList[i].centerPoint.y,
                                                          this.#marblesList[i].centerPoint.z)
            let normalizeVector = p5.Vector.normalize(this.#marblesList[i].centerPoint)
            let speedVector = normalizeVector.mult((1+this.#customizedSpectrum[bandIndex]*this.#spectrumFactor))
            this.#marblesList[i].wobbledPoint.add(speedVector)
            bandIndex++
        }
    }

}

/*
+-----------------------------------------------------------------------------+
|           WobblySphere(centerPoint: p5.vector, objectColor:p5.color,        |
|                            objectSize:Number, normalMaterial:Boolean,       |
|                                 p:p5Instance)                               |
+-----------------------------------------------------------------------------|
|/////////////////////////////////////Static//////////////////////////////////|
|counter: Number                                                              |
|/////////////////////////////////////Public//////////////////////////////////|                                             
|draw()| Void                                                                 |    
|switchIsSelected()| Void                                                     |
|relocateZ(delta: Number)|Void                                                |
|relocateX(delta: Number)| Void                                               |
|relocateY(delta: Number)| Void                                               |
|changeColor(newColor: Number)| Void                                          |
|changeScale(scale: Number)| Void                                             |
|changeIsNormalMaterial(status: Boolean)| Void                                |
|------------------------------------Inherited--------------------------------| 
|p: p5 instancd                                                               |                                                 
|name:string                                                                  |      
|centerPoint:p5.vector                                                        |
|color: p5.color()                                                            |
|size: Number                                                                 |
|isNormalMaterial: Boolean                                                    |
|scale: Number                                                                |
|isSelected: Boolean                                                          |                  
|/////////////////////////////////////private/////////////////////////////////|                                          
|#marbleSize: Number                                                          |
|#resolution: Number                                                          |
|#marblesList: An array of Marble instances                                   |
|#spectrumFactor:Number                                                       |
|#rotationEnergy:Number                                                       |
|#rotationFactor:Number                                                       |
|#customizedSpectrum: an array of Numbers                                     |
|#marbleSizeFactor: Number                                                    |
|#marblesInitializer()|Void                                                   |
|#assembleMarbles()                                                           |  
|#updateMarbles()                                                             |                                                 
+-----------------------------------------------------------------------------+
This class simulates a wobbling sphere, which is constructerd of multiple 
Marble instances. The marbles locations will be updtated based on the signals received from the 
music and visualize them. This class inherited properties and methods of Object3d class.

counter: It is a static variable and keeps track of the number of instances created from this class[19]. It is used for naming each instance from this class. 
         The name will be used in the dropdown list of the sceneMenu. 
draw(): It is called at each frame, updtaes the #customizedSpectrum and #rotationEnergy values. Then it updates the actual location of marbles and the angle of 
        them on the xy Plane. Finally, it calls the #assembleMarbles to draw the marbles assembly.
#marbleSize: Indicates the radius of the marble instances.
#resolution: Indicates the density of marbles used to shape the wobbly Sphere.
#marblesList: Holds the Marble instances which are used to construct the sphere.
spectrumFactor: It is used in the updateMarbles() to adjust how much the marbles are relocated in response to the amplitude of assigned frequency bin received from 
                 from the #customizedSpectrum.
#rotationEnergy: The rotational angle of sphere which represents the instance energy of music in the 200hs to 20000hz (audible) frequency
                range multiplied by the rotationFactor.                                                     
#rotationFactor: Adjusts the effect of music's energy on the rotation speed of the sphere.
#marblesInitializer(): It creates Marble instances and locate them in the marblesList array. 
#assembleMarbles(): It calls the draw() function of each Marble instances and draw them, so the WobblySphere shapes.
updateMarbles(): It updates the position of each marble corresponding to the received signal from the #customizedSpectrum.
*/




    
    