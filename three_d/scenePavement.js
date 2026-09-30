class ScenePavement extends Object3d {
    constructor(
        centerPoint,
        objectColor,
        isNormalMAterial,
        p,
        pavementWidth,
        pavementHeight,
        pavementThickness,
        griding,
    ) {
        super(centerPoint, objectColor, null, isNormalMAterial, p);
        ScenePavement.counter++;
        this.#width = pavementWidth;
        this.#height = pavementHeight;
        this.#griding = griding;
        this.#thickness = pavementThickness;
        this.#tiling();
        this.name = "Pavement" + ScenePavement.counter;
    }
    static counter = 0;
    switchIsSelected() {
        this.isSelected = !this.isSelected;
        for (let row = 0; row < this.#tilesList.length; row++) {
            for (let column = 0; column < this.#tilesList[row].length; column++) {
                this.#tilesList[row][column].switchIsSelected();
            }
        }
    }
    draw() {
        for (let row = 0; row < this.#tilesList.length; row++) {
            for (let column = 0; column < this.#tilesList[row].length; column++) {
                this.#tilesList[row][column].draw();
            }
        }
    }
    relocateZ(delta) {
        super.relocateZ(delta);
        for (let row = 0; row < this.#griding; row++) {
            for (let column = 0; column < this.#griding; column++) {
                this.#tilesList[row][column].relocateZ(delta);
            }
        }
    }
    relocateX(delta) {
        super.relocateX(delta);
        for (let row = 0; row < this.#griding; row++) {
            for (let column = 0; column < this.#griding; column++) {
                this.#tilesList[row][column].relocateX(delta);
            }
        }
    }
    relocateY(delta) {
        super.relocateY(delta);
        for (let row = 0; row < this.#griding; row++) {
            for (let column = 0; column < this.#griding; column++) {
                this.#tilesList[row][column].relocateY(delta);
            }
        }
    }
    changeColor(newColor) {
        for (let row = 0; row < this.#griding; row++) {
            for (let column = 0; column < this.#griding; column++) {
                this.#tilesList[row][column].changeColor(newColor);
            }
        }
    }
    changeScale(scale) {
        super.changeScale(scale);
        for (let row = 0; row < this.#griding; row++) {
            for (let column = 0; column < this.#griding; column++) {
                this.#tilesList[row][column].changeScale(scale);
            }
        }
        this.#tiling();

        //because of #tiling(), the isSelected properties of tiles will be changed to false. Following Code turns them true again.
        for (let row = 0; row < this.#tilesList.length; row++) {
            for (let column = 0; column < this.#tilesList[row].length; column++) {
                this.#tilesList[row][column].switchIsSelected();
            }
        }
    }

    changeIsNormalMaterial(status) {
        super.changeIsNormalMaterial(status);
        for (let row = 0; row < this.#griding; row++) {
            for (let column = 0; column < this.#griding; column++) {
                this.#tilesList[row][column].changeIsNormalMaterial(status);
            }
        }
    }
    #width = null;
    #height = null;
    #thickness = null;
    #griding = null;
    #tilesList = [];
    #tiling() {
        this.#tilesList = [];
        let tileWidth = (this.#width * this.scale) / this.#griding;
        let tileHeight = (this.#height * this.scale) / this.#griding;
        let numberOfTiles = this.#griding ** 2;
        //Centerpoint of the first ceramic at the top left
        let leftTopCenterPoint = this.p.createVector(
            this.centerPoint.x - (this.#width * this.scale) / 2 + tileWidth / 2,
            this.centerPoint.y - (this.#height * this.scale) / 2 + tileHeight / 2,
        );
        for (let row = 0; row < this.#griding; row++) {
            let tempRow = [];
            for (let column = 0; column < this.#griding; column++) {
                let tempCenterPoint = this.p.createVector(
                    leftTopCenterPoint.x + column * tileWidth,
                    leftTopCenterPoint.y + tileHeight * row,
                    this.centerPoint.z,
                );
                let tempIsnormalMAterial;
                if ((column + row) % 2 == 0) {
                    tempIsnormalMAterial = this.isNormalMaterial;
                } else {
                    tempIsnormalMAterial = false;
                }
                let tempTile = new Tile(
                    tempCenterPoint,
                    this.color,
                    tempIsnormalMAterial,
                    tileWidth,
                    tileHeight,
                    this.#thickness,
                    this.p,
                );
                tempRow.push(tempTile);
            }
            this.#tilesList.push(tempRow);
        }
    }
}

/*
+-----------------------------------------------------------------------------+
|       ScenePavement(centerPoint: p5.vector, objectColor:p5.color,           |
|             normalMaterial:Boolean, p:p5Instance, tileWidth: Number,        |
|                 tileHeight: Number,tileThickness: Number, griding: Number)  |
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
|size: Null                                                                   |
|isNormalMaterial: Boolean                                                    |
|scale: Number                                                                |
|isSelected: Boolean                                                          |                  
|/////////////////////////////////////private/////////////////////////////////|                                          
|#width: Number;                                                              |
|#height: Number;                                                             |
|#thickness: Number                                                           |
|#griding: Number                                                             |
|#tilesList[][]: A 2-dimensional array of numbers.                            |
|#tiling()| Void                                                              |                                                 
+-----------------------------------------------------------------------------+
This class simulates a pavement which is an assembly of multiple Tile instances. It inherits methods and properties from the Object3d,
overrides the inherited methods, This class has 5 private properties of its own and a private method.  

counter: counter: It is a static variable and keeps track of the number of instances created from this class[19]. It is used for naming each instance from this class. 
         The name will be used in the dropdown list of the sceneMenu. 
draw(): This function calls the draw function of all Tile instances to draw them on the canvas.
#width: Width of the ScenePavement instance .
#height: Height of the ScenePavement instance.
#thickness: thickness of the ScenePavement instance.
#griding: Indicates the number of rows and columns of  the tiles that make up the pavement. 
#tilesList[][]: It is a holder for the Tile instances. It is a 2-dimentional array. The first dimension represents rows of tiles and the second dimension 
                represents columns of tiles.  
#tiling(): Creates Tile instances and insert them into the tilesList[][].

*/
