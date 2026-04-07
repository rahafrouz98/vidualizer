class RipplesMenu
{
    constructor(p)
    {
        this.#p = p
        this.menuContainer = this.#p.createDiv("ripple Menu")
        this.menuContainer.parent(document.body);
        this.menuContainer.style(`position: absolute; right:0px; top:100px; z-index:3; width:300px; height:400px; ; text-align:center; font-size: 25px; 
                                  font-weight: bold; color:rgba(39, 24, 179,.9);border-radius: 20px;background-color:rgb(0, 0,0,0.4)`);

        this.#layoutLabel = this.#p.createP("Select Layout: ");
        this.#layoutLabel.parent(this.menuContainer);
        this.#layoutLabel.style(`position: absolute; left:10px; top:20px;font-weight: normal; font-size: 20px;`);
        
        this.layoutRadio = this.#p.createRadio("layoutRadio"+crypto.randomUUID());
        this.layoutRadio.parent(this.menuContainer);
        this.layoutRadio.size(200);
        this.layoutRadio.option("1");
        this.layoutRadio.option("2");
        this.layoutRadio.option("3");
        this.layoutRadio.option("4");
        this.layoutRadio.selected("1");
        this.layoutRadio.style(`position: absolute; left:100px; top:40px;color:white; font-weight: normal;font-size: 20px;`);

        this.#selectorLabel = this.#p.createP("Select a ripple to edit: ");
        this.#selectorLabel.parent(this.menuContainer);
        this.#selectorLabel.style(`position: absolute; left:10px; top:80px;font-weight: normal;font-size: 20px;margin:0;
                                   rgba(39, 24, 179,.9)`);

        // crypto.randomUUID() is used to give a unique name to each group of radio buttons. Otherwise, if thewy happen to have the same name, it can
        // cause confusion between differrent groups[26].
        this.rippleSelector = this.#p.createSelect("rippleSelector"+crypto.randomUUID());
        this.rippleSelector.parent(this.menuContainer);
        this.rippleSelector.option("1");
        this.rippleSelector.option("2");
        this.rippleSelector.option("3");
        this.rippleSelector.option("4");
        this.rippleSelector.selected("1");
        this.rippleSelector.style(`position: absolute; left:210px; top:78px;font-size: 20px; margin:0;`);
        this.rippleSelector.id("rippleSelector")
        this.rippleSelectorUpdate("1"); //disables all options except option 1

        this.#editorSection = this.#p.createDiv();
        this.#editorSection.parent(this.menuContainer );
        this.#editorSection.style(`position:absolute; top:105px; left:10px; right:10px; bottom:10px; border-width:3px);
                             border-style:solid;text-align:left;font-weight: normal;font-size: 20px;border-radius: 20px;`)
            
        this.#sensitivityLabel = this.#p.createP("ripple Sensitivity: ");
        this.#sensitivityLabel.parent(this.#editorSection);
        this.#sensitivityLabel.style(`position: absolute; left:10px; top:20px; margin:0px;font-weight: normal;font-size: 20px;`);
        
        this.sensitivityBar = this.#p.createSlider(0,1,.3,.01);
        this.sensitivityBar.parent(this.#editorSection);
        this.sensitivityBar.size(150);
        this.sensitivityBar.style(`position: absolute; left:10px; top:45px;color:white;font-weight: normal;font-size: 20px;`);

        this.sensitivityValue = this.#p.createP(this.sensitivityBar.value());
        this.sensitivityValue.parent(this.#editorSection);
        this.sensitivityValue.style(`position: absolute; left:180px; top:45px; margin:0px; color:white;font-weight: normal;font-size: 20px;`);

        this.#colorLabel = this.#p.createP("ripple Color: ");
        this.#colorLabel.parent(this.#editorSection);
        this.#colorLabel.style(`position:absolute;left:10px;top:95px;margin:0px;font-weight: normal;font-size: 20px;`);

        this.colorRadio = this.#p.createRadio("rippleColor"+crypto.randomUUID());
        this.colorRadio.parent(this.#editorSection);
        this.colorRadio.size(200);
        this.colorRadio.option("Ocean");
        this.colorRadio.option("Sun");
        this.colorRadio.option("Night");
        this.colorRadio.option("Green");
        this.colorRadio.selected("Ocean");
        this.colorRadio.style(`position: absolute; left:10px; top:120px;text-align:left;color:white;font-weight: normal;font-size: 20px;`);

        this.#freqLabel = this.#p.createP("ripple Frequency Band: ");
        this.#freqLabel.parent(this.#editorSection);
        this.#freqLabel.style(`position: absolute; left:10px; top:190px;margin:0px;font-weight: normal;font-size: 20px;`);
        
        this.freqRadio = this.#p.createRadio("freqRadio"+crypto.randomUUID());
        this.freqRadio.parent(this.#editorSection);
        this.freqRadio.size(220);
        this.freqRadio.option("audible");
        this.freqRadio.option("bass");
        this.freqRadio.option("lowMid");
        this.freqRadio.option("mid");
        this.freqRadio.option("highMid");
        this.freqRadio.option("treble");
        this.freqRadio.selected("audible");
        this.freqRadio.style(`position: absolute; left:10px; top:215px;text-align:left;color:white;font-weight: normal;font-size: 20px;`);

        this.showAndHideMenu()
    }
    layoutRadio = null;
    freqRadio = null;
    sensitivityBar = null;
    colorRadio = null;
    rippleSelector = null;
    sensitivityValue = null;
    menuContainer = null;
    isMenuActive = false;
    showAndHideMenu()
    {
        if(((this.#p.mouseX>this.#p.width-300)&&(this.#p.mouseX<(this.#p.width-15))&&this.isMenuActive)|| (this.#isMenuForcedToDisplay && this.isMenuActive))
        {

            this.menuContainer.style("display:block;")
        }
        else 
        {
            this.menuContainer.style("display:none;")
        }
    }
    rippleSelectorUpdate(layout)
    {
        switch(layout)
        {
            case "1":
                this.rippleSelector.enable("1")
                this.rippleSelector.disable("2")
                this.rippleSelector.disable("3")
                this.rippleSelector.disable("4")
                break;
            case "2":
                this.rippleSelector.enable("1")
                this.rippleSelector.enable("2")
                this.rippleSelector.disable("3")
                this.rippleSelector.disable("4")
                break;
            case "3":
                this.rippleSelector.enable("1")
                this.rippleSelector.enable("2")
                this.rippleSelector.enable("3")
                this.rippleSelector.disable("4")
                break;
            case "4":
                this.rippleSelector.enable("1")
                this.rippleSelector.enable("2")
                this.rippleSelector.enable("3")
                this.rippleSelector.enable("4")
        }
    }
    keyPressed(keycode)
    {
        if(keycode == 32)
        {
            this.#isMenuForcedToDisplay =  !this.#isMenuForcedToDisplay;
            this.showAndHideMenu();
        }
    }
    mouseMoved()
    {
        this.showAndHideMenu();
    }
    
    #p = null
    #layoutLabel = null;
    #selectorLabel = null;
    #sensitivityLabel =null;
    #colorLabel = null;
    #freqLabel = null;
    #editorSection = null;
    #isMenuForcedToDisplay = false;
}
/*
+---------------------------------------------------------------------------------------+
|                                RipplesMenu( p:p5 Instance)                            |
+---------------------------------------------------------------------------------------+
|////////////////////////////////////////pubilic////////////////////////////////////////|
|layoutRadio: P5 radio button element                                                   |
|freqRadio: P5 radio button element                                                     |
|sensitivityBar: P5 slider element                                                      |
|colorRadio: P5 radio button element                                                    |
|rippleSelector: P5 drop down menu element                                              |
|sensitivityValue: P5 div element                                                       |
|menuContainer: P5 div element                                                          |
|rippleSelectorUpdate(layout:string)|void                                               |
|showAndHideMenu()                                                                      |
|isMenuActive: Boolean                                                                  |
|mouseMoved()|Void                                                                      |
|keyPressed(keycode: Number)| Void                                                      |                                                         
|////////////////////////////////////////Private////////////////////////////////////////|
|#p: P5 instance                                                                        |
|#layoutLabel: P5 paragraph element                                                     |
|#selectorLabel: P5 paragraph element                                                   |
|#sensitivityLabel: P5 paragraph element                                                |
|#colorLabel: P5 paragraph element                                                      |
|#freqLabel:  P5 paragraph element                                                      |
|#editorSection: P5 paragraph element                                                   |     
|#isMenuForcedToDisplay:Boolean                                                         |                                                                  |
+---------------------------------------------------------------------------------------+
This class creates and manages DOM controllers for managing ripples visualization and editing ripples.

layoutRadio: Indicates the layout of the ripples in the visualizer. It has four options(1, 2, 3, 4).
freqRadio: an radio button element to select the frequency filter of the ripple.
sensitivityBar: A slider bar to adjust the sensitivity of the ripple's speed to the energy.
colorRadio: A radio button element to select the color theme of the ripple.
rippleSelector: A drop down menu to select a ripple to edit it.
sensitivityValue: A div element to show the value of the sensitivity bar.
menuContainer: A div to hold the html elements.  
rippleSelectorUpdate(layout): Updates the disabled and enabled options depending on passed argument to it. 
isMenuActive: When it is true the menu is enabled to be showen as based on the position of the mouse or the value of
              the isMenuForcedToDisplay.Otherwise, it will remain hidden.                                                                  
mouseMoved(): This function will be called when mouse is moved and calls the showAndHideMenu() function.
showAndHideMenu(): It hides and display the menu depending on the values of #isMenuForcedToDisplay, mouse position
                   and isMenuActive                                                                    
keyPressed(keycode): It shows or hides the menu when the space key is pressed. keycode represents the p5.keyCode.                                                                                         
#p: a variable to reference to P5 instsance.
#layoutLabel: A label for the layout radio button.
#selectorLabel: A label for the ripple selector.
#sensitivityLabel: A label for the ripple sensitivity slider bar.
#colorLabel: A label for the color selectiob radio button. 
#freqLabel: A label for the the frequency bands radio button. 
#editorSection: A container for for editing controllers.
#isMenuForcedToDisplay: when it is true the menu is forced to display as long as isMenuActive is true. 
                       when it is false, menu will only be displayed if the isMenuActive is true and the mouse 
                       position is in the right position.  
*/