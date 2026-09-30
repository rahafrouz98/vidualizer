class Object3d {
    constructor(centerPoint, objectColor, objectSize, isNormalMaterial, p) {
        this.centerPoint = centerPoint;
        this.color = objectColor;
        this.isNormalMaterial = isNormalMaterial;
        this.size = objectSize;
        this.p = p;
    }
    switchIsSelected() {
        this.isSelected = !this.isSelected;
    }
    relocateZ(delta) {
        this.centerPoint.z += delta;
    }
    relocateX(delta) {
        this.centerPoint.x += delta;
    }
    relocateY(delta) {
        this.centerPoint.y += delta;
    }
    changeColor(newColor) {
        this.color = newColor;
    }
    changeScale(scale) {
        this.scale = scale;
    }
    changeIsNormalMaterial(status) {
        this.isNormalMaterial = status;
    }
    color = null;
    centerPoint = null;
    size = null;
    isNormalMaterial = null;
    isSelected = false;
    name = null;
    p = null;
    scale = 1;
}
/*
+---------------------------------------------------------------------------------+
|           Object3d(centerPoint: p5.vector,objectColor:p5.color,                 |
|                            objectSize:Number, normalMaterial:Boolean)           |
+---------------------------------------------------------------------------------+
|///////////////////////////////////////Public////////////////////////////////////|                     
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
This is the parent class which is used to create other 3d classes. Mozilla Developer Network resources has inspired the use of class syntax[32][33].

P: a p5 instance that 3d objaects use its library.
Name: It is a combination of the name of the class plus the number of the instance which is taken from the static property, named counter, in the child class. It will be 
      used for selecting of objects from the objects[] in the sceneManager.
centerPoint: Represents the center location of the object.
color: Represents the color of the object.
size: represents the origin size of the object at the moment of initialization. 
isNormalMaterial: It true, NormalMaterial() will be executed before drawing the object[18].
isSelected: If it is true, the stoke() and strokeWeight() are applied to highlight the object at the moment of drawing. This visually indicates to the user which object is 
            currently selected.
scale: Multiplies by the size to determine the magnitude of the object on the canvas. 
switchIsSelected(): Toggles the isSelected property between true and false.   
relocateZ(delta): Takes a negative or positive as the argument and adds it to the z-coordinate of the centerPoint.
relocateX(delta): Takes a negative or positive as the argument and adds it to the X-coordinate of the centerPoint.
relocateY(delta): Takes a negative or positive as the argument and adds it to the Y-coordinate of the centerPoint.
changeColor(newColor): Takes a p5.color instance as the argument and sets it as the color of object. 
changeScale(scale): Takes a number as the argument and updates the sclae property. 
*/
