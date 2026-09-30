class SceneMenu {
    constructor(p, host) {
        this.#p = p;
        this.#host = host;
        this.#menuContainer = this.#p.createDiv("Scene Menu");
        this.#menuContainer.parent(document.body);
        this.#menuContainer.style(`position: absolute; right:0px; top:100px; z-index:3; width:350px; height:500px; 
                                  background-color:rgb(0, 0,0,0); text-align:center; font-size: 25px; 
                                  font-weight: bold; color:rgba(39, 24, 179,.9);border-radius: 20px;
                                  background-color:rgb(0, 0,0,0.4)`);

        this.#selectorLabel = this.#p.createP("Choose object to edit: ");
        this.#selectorLabel.parent(this.#menuContainer);
        this.#selectorLabel.style(`position: absolute; left:10px; top:80px;font-weight: normal;font-size: 20px;margin:0;
                                   rgba(39, 24, 179,.9)`);
        this.#objectSelector = this.#p.createSelect("objectSelector" + crypto.randomUUID());
        this.#objectSelector.parent(this.#menuContainer);
        this.#objectSelector.style(`position: absolute; left:200px; top:80px;font-size: 15px; margin:0;`);
        this.#objectSelector.option("None");

        //event handler for the object selector
        this.#objectSelector.changed(() => {
            //When "None" is selected from the list
            if ("None" == this.#objectSelector.value()) {
                this.#host.isEditing = false;
                //If editingObject is referenceing to any object, run its switchIsSelected() to set the value of its isSelected
                //to false. If the editing object is null then it has not switchIsSelected().
                this.#host.editingObject?.switchIsSelected();
                this.#host.editingObject = null;
                //Hide the #editingToolsContainer
                this.#editingToolsContainer.style("display:none");
            }
            //when an object is selected fro mthe list
            else {
                for (let i = 0; i < this.#host.objects.length; i++) {
                    //it finds the index of selected object based on the name of the object
                    if (this.#host.objects[i].name == this.#objectSelector.value()) {
                        //Using Ternary Operator is inspired by P. Babakhchani[20]
                        //If there is already an object being referenced by editingObject, it executes its switchIsSelected()
                        //to set its isSelected property to false before removing it from editingObject
                        this.#host.editingObject ? this.#host.editingObject.switchIsSelected() : null;
                        this.#host.editingObject = this.#host.objects[i];
                        //resets the value of #updateScaleFactor based on the recently selected object's sclae property.
                        this.#updateScaleFactor(this.#host.editingObject.scale);
                        //updates the content of scaleIndicator based on the recently selected object.
                        this.#scaleIndicator.html(this.#host.editingObject.scale);
                        //updates the shiningCheckbox and gets it checked or unchecked based on the recently selected object's property
                        //of isNormalMaterial
                        this.#host.editingObject.isNormalMaterial
                            ? this.#shiningCheckbox.checked(true)
                            : this.#shiningCheckbox.checked(false);
                        //Sets the value of isSelected property to true for the selected object and its components that have this property
                        this.#host.editingObject.switchIsSelected();
                        //It unhides the menu.
                        this.#editingToolsContainer.style("display:block");
                        this.#host.isEditing = true;
                        break;
                    }
                }
            }
        });
        this.#editingToolsContainer = this.#p.createDiv();
        this.#editingToolsContainer.parent(this.#menuContainer);
        this.#editingToolsContainer.style(
            `position: absolute; top:150,left:0 z-index:3; color:rgba(39, 24, 179,.9); font-weight: normal;font-size: 20px;display:none;`,
        );

        this.#colorPickerLabel = this.#p.createDiv("Color:");
        this.#colorPickerLabel.parent(this.#editingToolsContainer);
        this.#colorPickerLabel.style(`position: absolute; top:150px; left:15px`);

        this.#colorPicker = this.#p.createColorPicker("blue");
        this.#colorPicker.parent(this.#editingToolsContainer);
        this.#colorPicker.style(`position: absolute;top:150px; left:90px`);
        this.#colorPicker.changed(() => {
            this.#host.editingObject.changeColor(this.#colorPicker.value());
        });

        this.#shiningLabel = this.#p.createDiv("Shining:");
        this.#shiningLabel.parent(this.#editingToolsContainer);
        this.#shiningLabel.style(`position: absolute; top:200px; left:15px`);

        this.#shiningCheckbox = this.#p.createCheckbox();
        this.#shiningCheckbox.parent(this.#editingToolsContainer);
        this.#shiningCheckbox.style(`position: absolute; top:200px; left:90px`);
        this.#shiningCheckbox.changed(() => {
            this.#shiningCheckbox.checked()
                ? this.#host.editingObject.changeIsNormalMaterial(true)
                : this.#host.editingObject.changeIsNormalMaterial(false);
        });

        this.#scaleEditorLabel = this.#p.createDiv("Scale:");
        this.#scaleEditorLabel.parent(this.#editingToolsContainer);
        this.#scaleEditorLabel.style(`position: absolute; top:245px; left:15px`);

        this.#scaleIndicator = this.#p.createDiv("1");
        this.#scaleIndicator.parent(this.#editingToolsContainer);
        this.#scaleIndicator.style(
            `position: absolute; top:250px; left:110px; width:50px; height:25;background-color:rgb(255, 255, 255,.9);font-size: 15px `,
        );

        this.#positiveButton = this.#p.createButton("+");
        this.#positiveButton.parent(this.#editingToolsContainer);
        this.#positiveButton
            .style(`position: absolute; top:240px; left:80px; text-align:center;font-weight: bold;background-color:rgb(61, 13, 88,.9);
                                    color:rgb(255,255,255,.9); padding:0px; border: 0px `);
        this.#positiveButton.size(20, 15);
        this.#positiveButton.mousePressed(() => {
            //increases the #scaleFactor by +0.2 and returns a mapped scale
            let scale = this.#scaleFactorTOScaleMapper(0.2);
            this.#scaleIndicator.html(scale);
            this.#host.editingObject?.changeScale(scale);
        });

        this.#negativeButton = this.#p.createButton("-");
        this.#negativeButton.parent(this.#editingToolsContainer);
        this.#negativeButton
            .style(`position: absolute; top:260px; left:80px; text-align:center;font-weight: bold;background-color:rgb(61, 13, 88,.9);
                                    color:rgb(255,255,255,.9); padding:0px; border: 0px `);
        this.#negativeButton.size(20, 15);
        this.#negativeButton.mousePressed(() => {
            //decreases the #scaleFactor by -0.2 and returns a mapped scale
            let scale = this.#scaleFactorTOScaleMapper(-0.2);
            this.#scaleIndicator.html(scale);
            this.#host.editingObject?.changeScale(scale);
        });

        this.#help = this.#p.createP("Tip: Use mouse wheel and drag to relocate the selected object");
        this.#help.parent(this.#editingToolsContainer);
        this.#help
            .style(`position: absolute; top:300px; left:10px; width: 300px;text-align:left;font-weight: normal;background-color:rgb(61, 13, 88,.9);
                                    color:rgb(255,255,255,.9); padding:0px; border: 0px;font-size: 15px `);

        this.showAndHideMenu();
    }
    isMenuActive = false;

    showAndHideMenu() {
        if (
            (this.#p.mouseX > this.#p.width - 350 && this.#p.mouseX < this.#p.width - 15 && this.isMenuActive) ||
            (this.#isMenuForcedToDisplay && this.isMenuActive)
        ) {
            this.#menuContainer.style("display:block;");
        } else {
            this.#menuContainer.style("display:none;");
        }
    }

    keyPressed(keycode) {
        if (keycode == 32) {
            this.#isMenuForcedToDisplay = !this.#isMenuForcedToDisplay;
            this.showAndHideMenu();
        }
    }
    mouseMoved() {
        this.showAndHideMenu();
    }

    addObjectEditingTools(object) {
        this.#objectSelector.option(object.name);
    }
    #host = null;
    #p = null;
    #isMenuForcedToDisplay = false;
    #menuContainer = null;
    #selectorLabel = null;
    #colorPickerLabel = null;
    #editingToolsContainer = null;
    #colorPicker = null;
    #scaleEditorLabel = null;
    #positiveButton = null;
    #negativeButton = null;
    #scaleFactor = 1;
    #scaleIndicator = null;
    #shiningLabel = null;
    #shiningCheckbox = null;
    #objectSelector = null;
    #help = null;

    //it incease or decrease the scale factor based on the argument it receives and return a mapped scale from 0 to infinity
    #scaleFactorTOScaleMapper(increment) {
        //It stops scaleFactor from becoming negative to prevent the scale increasing again in the quadratic function
        this.#scaleFactor + increment > 0 ? (this.#scaleFactor += increment) : 0;
        //Quadratic function is used to map the sclae so it increases faster when scaleFactor gets bigger
        let scale = this.#scaleFactor ** 2;
        //It rounds down the scale to one decimal point.
        scale = Math.floor(scale * 10) / 10;
        return scale;
    }

    #updateScaleFactor(scale) {
        this.#scaleFactor = Math.sqrt(scale);
    }
}
/*
+---------------------------------------------------------------------------------------+
|              SceneMenu( p:p5 Instance, host: this from secneManager Instance )        |
+---------------------------------------------------------------------------------------+
|////////////////////////////////////////pubilic////////////////////////////////////////|                                                                                                                  |
|isMenuActive: Boolean                                                                  |
|showAndHideMenu()                                                                      |
|mouseMoved()|Void                                                                      |
|keyPressed(keycode: Number)| Void                                                      |
|addObjectEditingTools(object: an instance of a 3d object)| Void                        |                                                         
|////////////////////////////////////////Private////////////////////////////////////////|
|#host: this from secneManager Instance                                                 |
|#p: p5 Instance                                                                        |
|#isMenuForcedToDisplay: Boolean                                                        |
|#menuContainer: HTML Element                                                           |
|#selectorLabel: HTML Element                                                           |
|#colorPickerLabel: HTML Element                                                        |
|#editingToolsContainer: HTML Element                                                   |
|#colorPicker:HTML Element                                                              |
|#scaleEditorLabel: HTML Element                                                        |
|#positiveButton: HTML Element                                                          |
|#negativeButton: HTML Element                                                          |
|#scaleFactor: Number                                                                   |
|#scaleIndicator: HTML Element                                                          |
|#shiningLabel: HTML Element                                                            |
|#shiningCheckbox: HTML Element                                                         |
|#objectSelector: HTML Element                                                          |
|#help: HTML Element                                                                    |
|#scaleFactorTOScaleMapper(increment: Number)| Number                                   |
|#updateScaleFactor(scale)                                                              |                                                                  
+---------------------------------------------------------------------------------------+
This class creates and manages DOM controllers for editing 3d objects in the SceneManager instance.

isMenuActive: When it is true the menu is enabled to be showen as required otherwise it will remain hidden.
                 

                                                                  
mouseMoved(): This function will be called when mouse is moved and calls the showAndHideMenu() function.
showAndHideMenu(): It hides and displays the menu depending on the values of #isMenuForcedToDisplay, mouse position
                   and isMenuActive.                                                                    
keyPressed(keycode): It shows or hides the menu when the space key is pressed.                                                                                           
#p: a variable to reference to P5 instsance.
#host: a reference to the host instance, so the functions have access to the properties of the host from the instance of this class.
#isMenuForcedToDisplay: when it is true the menu is forced to display as long as isMenuActive is true too , 
                       when it is false, menu will only be displayed if the isMenuActive is true and the mouse 
                       position is in the right zone. 
#menuContainer: this is a div to hold the html elements of this menu. 
#colorPickerLabel: A label for the colorPicker.
#editingToolsContainer: It is a container to hold the HTML elements used for editing the 3d objects. It will be hidden when no object is selected,
                        and will be showen when an object is selected.
#colorPicker: It is a color picher element for changing the color of the selected 3d object.
#scaleEditorLabel: A label for the positive and negative buttons of scale.
#positiveButton: An HTML button element to increase the scale of the selected 3d object.
#negativeButton: An HTML button element to decrease the scale of the selected 3d object.
#scaleFactor: The scale is calculated from the scaleFactor using the quadratic formula. Larger Values of scaleFactor cause the scale to increase more rapidly, and
              smaller values of scaleFactor result in slower changes. 
#scaleIndicator: It is an indicator of the selected 3d object's scale value.
#shiningLabel: A label for the shiningCheckBox.
#shiningCheckbox: It is a checkbox element that toggles the isNormalMaterial property of the selected object and its components to false or true.
#objectSelector: A drop down list for selecting the 3d Object which is the target for editing. 
#help: A paragraph used as a help for userr to relocarew the selected object. 
#scaleFactorTOScaleMapper(Number): Takes a positive or negative number as the argument. Add this number to the scaleFactor and map the sclae factor to the sclae using
                                the quadratic formula. It also restricts the scaleFactor to be minus, otherwise the scale will start increasing in the quadratic formula.  
#updateScaleFactor(scale): Mapps back  the scale to the scaleFactor. It is used to update the scaleFactor when the editingObject is changed.         

*/
