class FireFlameParticle extends Object3d
{
    constructor(centerPoint,objectColor,objectSize, speed, p)
    {
        super(centerPoint,objectColor,objectSize, null, p);
        this.#speed = speed;
        this.#initialSpeed = speed;
        this.#birthTime = p.millis();
        this.#direction = this.#directionInitializer();
    }
    isExpired=false;
    draw()
    {
        if(!this.isExpired)
        {
            this.p.push();
            if (this.normalMaterial)
            {
                this.p.normalMaterial();
            }
            else
            {
                this.p.noStroke();
                this.p.fill(this.color)
            }
        
            this.p.translate(this.centerPoint);
            this.p.ellipsoid(this.size,this.size,this.size*2);
            this.p.pop();
            this.#updateParticle()
        }
    }
    #lifetime = 250//Milliseconds
    #birthTime=null;
    #age = 0;
    #direction=null;
    #speed=null;
    #initialSpeed = null;
    #growthFactor = 0.005
    #orificeAngleFactor = 0.3;
    #initialZ = 0;

    #directionInitializer()
    {
        let x = this.p.random(-this.#orificeAngleFactor,this.#orificeAngleFactor);
        let y = this.p.random(-this.#orificeAngleFactor,this.#orificeAngleFactor);
        let z = 1;
        let tempVector = this.p.createVector(x,y,z);
        return  p5.Vector.normalize(tempVector);
    }
    #mapAgeToAlpha()
    {
        let factor = this.#lifetime/(255**0.25)
    
        let alpha = 255-(this.#age/factor)**4;
        return alpha;
    }
    #mapAgeToSpeed()
    {
        let newSpeed = this.#initialSpeed-(this.#age * this.#initialSpeed/this.#lifetime)
        return newSpeed;
    }
    #updateParticle()
    {
        let updatedAlpha = this.#mapAgeToAlpha();
        if (updatedAlpha<=0)
        {
            this.isExpired = true;
        }
        else
        {
            this.color.setAlpha(updatedAlpha);
            let vectorSpeed = this.p.createVector(this.#direction.x, this.#direction.y, this.#direction.z)
            vectorSpeed.mult(this.#speed);
            this.centerPoint.add(vectorSpeed);
            this.#age=this.p.millis()- this.#birthTime;
            this.#speed = this.#mapAgeToSpeed();
           this.size = this.size+(this.centerPoint.z-this.#initialZ)*this.#growthFactor;
        }
    }
}
/*
+-----------------------------------------------------------------------------+
|        FireFlameParticle(centerPoint: p5.vector, objectColor:p5.color,      |
|               objectSize:Number, speed: number, p:p5Instance)               |
+-----------------------------------------------------------------------------|
|/////////////////////////////////////Public//////////////////////////////////|                                             
|isExpired: Boalean
|draw()| Void                                                                 |                                   
|------------------------------------Inherited--------------------------------| 
|p: p5 instancd                                                               |                                               
|name:Null                                                                    |      
|centerPoint:p5.vector                                                        |
|color: p5.color()                                                            |
|size: Number                                                                 |
|isNormalMaterial: Null                                                       |
|scale: Number                                                                |
|isSelected: Null                                                             |                
|/////////////////////////////////////private/////////////////////////////////|
|#lifetime: Number                                                            |
|#birthTime: Number                                                           |
|#age: Number                                                                 |
|#direction: p5.vector instance                                               |
|#speed: Number                                                               |
|#initialSpeed: Number                                                        |
|#growthFactor: Number                                                        |
|#orificeAngleFactor: Number                                                  |
|#initialZ: Number                                                            |
|#directionInitializer()| Void                                                |
|#mapAgeToAlpha()| Number                                                     |
|#mapAgeToSpeed()| Number                                                     |
|#updateParticle()| Number                                                    |                                                 
+-----------------------------------------------------------------------------+
This class simulates a particle of the flame abd inherits properties from the Object3d

isExpired: It is true unless the age is greater than lifeTime.
draw(): It draw the particle at each frame,, as long as isExpired is false, and updates the particle for the next frame.
#lifeTime: Indicates the life span of the particle and if its age is greater than this, it will be removed. 
#birthTime: Represents the the time that particle is generated. It is in mili seconds.
#age: Indicates the age of particle.
#direction: A normalized vector which indicates the direction of particle.
#speed: Represents the speed of particle. It is a scalar value.
#initialSpeed: It records the particle's initial speed and is used it as a factor to decrease the actual speed over time.
#growthFactor: It is applied to calculate the actual size of the particle based on its z-coordinate. The highr it goes, the bigger
                it becomes.
#orificeAngleFactor: Adjust the maximum angle relative to the xy plane which particle can have. The larger value simulates the wider angle of the flame's orifice.
#initialZ: Records at which level the particle started and is used as the base to calculate the actual size over time. 
#directionInitializer(): Initializes the direction of particle randomly. 
#mapAgeToAlpha(): It maps the value of age to the alpha using a quartic function and returns this value. It is used to fade the particle over time. 
#mapAgeToSpeed(): It maps the value of age to the speed using a linear function and returns it. It is used to slow the speed of particle over the time. 
#updateParticle(): It updates the position, speed and size of the particle for the next frame. 
*/