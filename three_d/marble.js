class Marble extends Object3d
{
    constructor(centerPoint,objectColor,objectSize, isNormalMaterial, p)
    {
        super(centerPoint,objectColor,objectSize, isNormalMaterial, p);
        this.name = "Marble"
    }
    wobbledPoint = null;
    draw()
    {
        this.p.push();
        if (this.isNormalMaterial)
        {
            this.p.normalMaterial();
        }
        else
        {
            this.p.fill(this.color)
        }

        if(this.isSelected)
        {
            this.p.stroke("red");
            this.p.strokeWeight(.5);
        }
        else
        {
            this.p.noStroke();
        }
        this.p.translate(this.wobbledPoint);
        this.p.sphere(this.size);
        this.p.pop();
    }
}
/*
+---------------------------------------------------------------------------------+
|           Marble(centerPoint: p5.vector,objectColor:p5.color, objectSize:Number |
|                    , normalMaterial:Boolean, p:p5 instance )                    |
+---------------------------------------------------------------------------------+
|///////////////////////////////////////Public////////////////////////////////////|                     
|draw()| void                                                                     |
|wobbledPoint:p5.vector                                                           |
|-------------------------------------Inherited-----------------------------------|
|p: p5 instance                                                                   |
|name:String                                                                      |      
|centerPoint:p5.vector                                                            |
|color: p5.color()                                                                |
|size: Number                                                                     |
|isNormalMaterial: Boolean                                                        |
|isSelected: Boolean                                                              |
|scale: Number                                                                    |
|switchIsSelected()| Void                                                         |
|relocateZ(delta: number)| Void                                                   |
|relocateX(delta: Number)| Void                                                   |
|relocateY(delta: Number)| Void                                                   |
|changeColor(newColor: p5.color)|Void                                             |
|changeScale(scale: Number)| void                                                 |
|changeIsNormalMaterial(status: Boolean)| Void                                    |                                                                           
+---------------------------------------------------------------------------------+
This class is used to create marbles that shape the wobblySphere instance.

draw(): Draws the marble using Sphere() in the p5                                                      
wobbledPoint: This is a p5 vector initialized in the wobblySphere instance using the marble's original centerPoint and the signal received from the spectrum.
               This property is used as the actual location of marble, which is used when drawing it.

*/