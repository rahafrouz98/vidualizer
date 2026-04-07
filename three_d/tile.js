class Tile extends Object3d
{
    constructor(centerPoint,objectColor,isNormalMaterial,tileWidth,tileHeight,tileThickness, p)
    {
        super(centerPoint,objectColor,null, isNormalMaterial,p);

        this.#width = tileWidth;
        this.#height = tileHeight;
        this.#thickness = tileThickness;
        this.name = "Tile"
    }
    draw()
    {
        this.p.push();
        this.p.translate(this.centerPoint);
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
            this.p.strokeWeight(10);
        }
        else
        {
            this.p.noStroke();
        }
        this.p.box(this.#width*this.scale,this.#height*this.scale,this.#thickness)
        this.p.pop();
    }
    #width = null;
    #height = null;
    #thickness = null;
}
/*
+-----------------------------------------------------------------------------+
|        Tile(centerPoint: p5.vector, objectColor:p5.color,                   |
|               normalMaterial:Boolean,tileWidth: Number, tileHeight: Number  |
|                      tileThickness: Number, p:p5Instance)                   |
+-----------------------------------------------------------------------------|
|/////////////////////////////////////Public//////////////////////////////////|                                             
|draw()| Void                                                                 |                                   
|------------------------------------Inherited--------------------------------| 
|p: p5 instancd                                                               |                                               
|name:string                                                                  |      
|centerPoint:p5.vector                                                        |
|color: p5.color()                                                            |
|size: Null                                                                   |
|isNormalMaterial: Boolean                                                    |
|scale: Number                                                                |
|isSelected: Boolean                                                          |
|switchIsSelected()| Void                                                     |
|relocateZ(delta: Number)|Void                                                |
|relocateX(delta: Number)| Void                                               |
|relocateY(delta: Number)| Void                                               |
|changeColor(newColor: Number)| Void                                          |
|changeScale(scale: Number)| Void                                             |
|changeIsNormalMaterial(status: Boolean)| Void                                |                  
|/////////////////////////////////////private/////////////////////////////////|
|#width: Number                                                               |
|#height: Number                                                              |
|#thickness: Number                                                           |                                                 
+-----------------------------------------------------------------------------+
This class simulates a single tile. It inherits methods and properties from the
Object3d class, and has three more private properties of its own, plus the public draw method.

draw(): Translates the origin of coordination to the centerPoint of the tile and draws the tile using box() function from the p5 library.
        If isNormalMaterial is true, the normalMaterial()[18].
#width: Width of the Tile instance .
#height: Height of the Tile instance.
#thickness: thickness of the Tile instance.

*/