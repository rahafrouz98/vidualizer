//container function for the visualisations
function Visualisations(p) {
    this.visualizationsMenu = new VisualizationsMenu(p);
    //array to store visualisations
    this.visuals = [];
    //currently selected vis. set to null until vis loaded in
    this.selectedVisual = null;
    //add a new visualisation to the array
    //@param vis: a visualisation object
    this.add = function (vis) {
        this.visuals.push(vis);
        //add button for the added visualixation tool to the visualizations menu
        this.visualizationsMenu.addVisualizationToHTML(vis);
        //if selectedVisual is null set the new visual as the
        //current visualiation
        if (this.selectedVisual == null) {
            this.selectVisual(vis.name);
        }
    };

    //select a visualisation using its name property
    //@param visName: name property of the visualisation
    this.selectVisual = function (visName) {
        //This condition is added to prevent calling onoffMenue() when the newly selected visualization is
        //already active.
        if (visName != this.selectedVisual?.name) {
            this.selectedVisual?.onoffMenu?.();
            //change the selevtedVisual
            for (var i = 0; i < this.visuals.length; i++) {
                if (visName == this.visuals[i].name) {
                    this.selectedVisual = this.visuals[i];
                    this.selectedVisual.onoffMenu?.();
                }
            }
        }
    };
    //select visualizers by keys
    this.keyPressed = function (keycode) {
        this.visualizationsMenu.keyPressed(keycode);
        if (keycode > 48 && keycode < 58) {
            let visNumber = keycode - 49;
            this.selectVisual(this.visuals[visNumber].name);
        }
    };
    this.mouseMoved = function () {
        this.visualizationsMenu.mouseMoved();
    };
}
/*
+--------------------------------------------------------------------------+
|                     Visualizations()                                     |
+--------------------------------------------------------------------------+
|//////////////////////////////////pubilic/////////////////////////////////|
|visuals[]: Array of visualizer objects                                    |
|selectedVisual: A visualizer object                                       |
|add(vis: a visualizer object)| void                                       |
|selectVisual(visName:String)| void                                        |
|keyPressed(keycode: P5.keyCode)                                           |  
|                                                                          |                                                                            
+--------------------------------------------------------------------------+
This constructor will be used as a container and manager of visualizer objects. 

visuals[]: It is an array of visualizers that are added to the app.
selectedVisual: It refers to the visualizer which is selected.
add(): It takes a visualizer object and adds it to the visuals[].
selectVisual(): It takes a string as an argument and searches in the visuals[] to find a visualizer with this name. Then, 
            it sets that found visualizer as a selectedVisual.
keyPressed(): It takes a P5.keyCode as an argument, changes the keyCode to the pertinent shortcut number, which is equal to the 
            index of the goal visualizer in the visuals[]. Then, it calls selectVisual() to set the goal visualizar as a selectedVisual.

visualizationsMenu: It is a visualizationsMenu object. It is used to manage the menu of visualizer buttons.

references:
1- template provided for the music visualization in CM1010 Module
2- using optional chain for methods of an object is inspired by 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
*/
//end
