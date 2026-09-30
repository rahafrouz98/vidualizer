class SceneManager {
    constructor(p) {
        this.#p = p;
        this.name = "3D Scene";
        this.#sceneMenu = new SceneMenu(this.#p, this);
        this.#addObject(
            new FireFlame(
                this.#p.createVector(-1000, 1000, 0),
                this.#p.color(50, 50, 50),
                this.#p.height / 20,
                true,
                this.#p,
            ),
        );
        this.#addObject(
            new FireFlame(
                this.#p.createVector(1000, 1000, 0),
                this.#p.color(50, 50, 50),
                this.#p.height / 20,
                true,
                this.#p,
            ),
        );
        this.#addObject(
            new WobblySphere(this.#p.createVector(0, 0, 400), this.#p.color(0, 255, 0), p.height / 2, true, p),
        );
        this.#addObject(
            new ScenePavement(
                this.#p.createVector(0, 0, 0),
                this.#p.color(255, 50, 200),
                true,
                this.#p,
                2100,
                2100,
                10,
                10,
            ),
        );
        this.#p.camera(0, 2500, 600, 0, 0, 0, 0, 1, 0);
    }
    name = null;
    renderingMode = "webgl";
    isEditing = false;
    editingObject = null;
    objects = [];

    draw() {
        this.#p.lights();

        //Checks the isEditing: if false calls orbitControl(). It makes sure that when an object is selected the orbit control is deactive, so user can
        //drag the selected object and relocate it.
        !this.isEditing ? this.#p.orbitControl() : null;
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].draw();
        }
    }
    mouseWheel(event) {
        if (this.isEditing) {
            this.#zDragging(event.delta * 0.1);
        }
    }
    mouseDragged() {
        if (this.isEditing) {
            this.#xyDragging();
        }
    }
    mouseMoved() {
        this.#sceneMenu.mouseMoved();
    }
    keyPressed(keycode) {
        this.#sceneMenu.keyPressed(keycode);
    }
    mousePressed() {
        //this is a reference point where the dragging starts from
        this.#referenceX = this.#p.mouseX;
        this.#referenceY = this.#p.mouseY;
    }

    onoffMenu() {
        this.#sceneMenu.isMenuActive = !this.#sceneMenu.isMenuActive;
        this.#sceneMenu.showAndHideMenu();
    }

    #p = null;
    #sceneMenu = null;
    //the coordinates of mouse when mouse is pressed. It is a reference to indicate at which point the mouse dragging is started
    #referenceX = null;
    #referenceY = null;

    #addObject(addedObject) {
        this.objects.push(addedObject);
        this.#sceneMenu.addObjectEditingTools(addedObject);
    }

    #zDragging(delta) {
        this.editingObject.relocateZ(delta);
    }

    #xyDragging() { //x and y are the coordinats of the point where mouse start dragging
        //B is the vector from the center of canvas to the point the mouse has started dragging from there
        //A is the vector from the center of canvas to the point the mouse has stopped dragging at there
        //C is the relative relocation vector
        //C  = A-B
        //the editingObject is relocated on the plane parallel to the xy plane at z = centerPoint.z of the object,
        // and equal to the vector of previous position plus the C
        let A = this.#p.createVector(this.#p.mouseX, this.#p.mouseY, this.editingObject.centerPoint.z);
        let B = this.#p.createVector(this.#referenceX, this.#referenceY, this.editingObject.centerPoint.z);
        let C = p5.Vector.sub(A, B);
        let tempVect = p5.Vector.add(this.editingObject.centerPoint, C);

        this.editingObject.relocateX(C.x);
        this.editingObject.relocateY(C.y);

        this.#referenceX = this.#p.mouseX;
        this.#referenceY = this.#p.mouseY;
    }
}
/*
+----------------------------------------------------------------+
|               SceneManager(p: P5 instance)                     |
+----------------------------------------------------------------+
|//////////////////////////pubilic///////////////////////////////|
|Name: String                                                    |    
|renderingMode: String                                           |
|isEditing: Boolean                                              |
|editingObject: A reference to a 3d object instance              |
|objects[]: An array of 3d object instances                      |
|draw()| Void                                                    |
|mouseWheel(event: p5.event)|Void                                |
|mouseDragged()| Void                                            |
|mouseMoved()| Void                                              |
|keyPressed(keycode: Number)| Void                               |
|mousePressed()| Void                                            |
|onoffMenu()| Void                                               |                      
|//////////////////////////Private///////////////////////////////|
|#p: p5 instance                                                 |
|#sceneMenu: an instance of SceneMenu                            |
|#referenceX: Number                                             |
|#referenceY:Number                                              |
|#addObject(addedObject: 3d pbject instance)| Void               |
|#zDragging(delta: Number)                                       |
|#xyDragging()| Void                                             |                         
+----------------------------------------------------------------+
This class simulates a scene that can holds multiple 3d objects. It peovides tools to customize the objects. 

name: It is used to identify visualization object is selected or added.
renderingMode: It is used to identify the required rendering mode and links the object to the right canvas(WEBGL).
isEditing: Indicates whether an object is selected for editing. If true, orbit control will be disabled so the user can 
           drag the selected object instead of changing the camera's position.
editingObject: A reference to the selected object.If no object is selected, it is equal to null. 
objects[]: An array of 3d objects which are added to the scene.
draw(): Calls light()[21]. Checks isEditing, if false, calls orbitControl()[22]. Finally, calls draw() method of all 3d objects in the objects[] to draw them 
        on the canvas.
mouseWheel(event): It takes a p5.event and is called from the p5 instance when mouseWheel event happens, and calls the zDragging(delta).  
mouseDragged():  It is called from the p5 instance when mouse dragging event happens. It calls xyDragging() method to relocate the object on a plane parallel 
                  to the XY plane.
mouseMoved(): It is called from the p5 instance when mouseMoved event happens. It calls the mouseMoved() method of the SceneMenu instance to hide and unhide
              the menu based on the position of the mouse.
keyPressed(keycode): It is called from the p5 instance when keyPressed event happens. It takes a number as the argument which represents the p5.keyCode. it calls the 
           keyPressed() method of the SceneMenu instance. If keycode is equal to 32 (space key), It hides or unhides the menu.
mousePressed():  It is called from the p5 instance when mousePressed event happens and updates the referenceX and referenceY values.
onoffMenu(): It is called from the selectVisual() method of Visuaization instance to activate and deactivate the sceneMenu.
#p: A reference to the p5 instance.
#sceneMenu: an instance of SceneMenu which holds the tools for editing objects.
#referenceX: Records the x-coordinates of mouse when it is pressed. It will be used to calculate the relative movement of mouse when it is dragging.
#referenceY: Records the y-coordinates of mouse when it is pressed. It will be used to calculate the relative movement of mouse when it is dragging.
#addObject(addedObject): Takes a reference to an object as the argument and adds it to the objects[]. Then , adds the name of this object to the drop down list 
                         of the SceneMenu instance. 
#zDragging(delta): It is called when mouseWheel event happens and isEditing= true. It calls the zDragging() method of editingObject to increase the z-coordinate
                   of the centerPoint of the object and its components by delta which is passed as the argument.
#xyDragging():  It is called when mouseDragging event happens isEditing= true. It calculates the relative vector(movement of the mouse when it was dragging), and updates 
                the x-coordinate and y-coordinate of the the centerPoint of the editingObject and its components. 
*/
