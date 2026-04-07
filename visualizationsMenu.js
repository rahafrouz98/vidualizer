class VisualizationsMenu
{
	constructor(p)
	{
		this.#p = p;
		//Container to hold all elements of this menu main menu 
		this.#menuContainer = p.createDiv();
		this.#menuContainer.style(`position: absolute;left:10px; top:200px; z-index:3; width:300px;height:70%;
						      background-color:rgb(255, 0,0,0);display:none;text-align: left;font-size: 20px; font-weight: bold;color:rgb(39, 24, 179,.9)`);
		this.#menuContainer.parent(document.body);
		//This element selects audio track files from the PC, inspired by OpenAI[15].
		this.#fileInput = this.#p.createFileInput(this.#handleMusic, false);
		this.#fileInput.parent(this.#menuContainer);
		this.#fileInput.style("position: absolute;left:10px; top:0px;font-size:20px");
		//Holder for visualization options
		this.#visOptionsMenu = p.createDiv("Select a visualisation:");
		this.#visOptionsMenu.parent(this.#menuContainer);
		this.#visOptionsMenu.style("position: absolute;left:10px; top:100px;font-size: 25px");
		this.#playbackButton = new PlaybackButton(p);
	}
	//It adds a button for the visualizer which is passed as an argument to this function.
    addVisualizationToHTML(visualizer)
	{
		let button = this.#p.createButton(this.#nextAvailableNumber+ "-  " +visualizer.name)
		this.#nextAvailableNumber++
		button.parent(this.#visOptionsMenu)
		button.style(`background-color:rgb(61, 13, 88,.9);width:160px;height:40;text-align: left;font-size: 20px; font-weight: bold;
			color:rgb(255,255,255,.9);margin-botton:10px;margin-top:10px; border-radius: 40px;`)
		let visualizerName = button.html()
		//it selects a visualization from visuals[] in visualizations 
		button.mouseClicked((visualizerName)=>{soundApp.vis.selectVisual(visualizer.name)} )
		//it changes the color tone when mouse goes over the button
		button.mouseOver(()=>button.style("background-color:rgb(39, 24, 179,.9)"))
		//it changes the color back to default  when mouse goes out
		button.mouseOut(()=>button.style("background-color:rgb(61, 13, 81,.9)"))
	}
	//Responds to keyboard presses
	keyPressed(keycode)
	{  
		//key code event for the space key is 32[16]
		if(keycode == 32)
		{
			this.#isMenuForcedToDisplay = !this.#isMenuForcedToDisplay;
			this.#showAndHideMenu();
		} 
	}
	mouseMoved()
	{
		this.#showAndHideMenu();
	}


	#p = null;
    #menuContainer = null;
	#fileInput = null;
	#visOptionsMenu = null;
	//Forces menu be displayed when it is true
	#isMenuForcedToDisplay = false;
	//keeps the track of numbers for visualization selection keys used 
	#nextAvailableNumber=1;
	//instance of PlaybackButton to play and pause the music
	#playbackButton = null;

	//this is a call back function used by the file input element to load an audio track from a pc. Because it is a callback 
	// function, I used an arrow function syntax to bind the scope to the instance of this class when it is called from fileInput().
	// used arrow function to preserve the value of this from the outer scope[17]:
	#handleMusic = (file)=>
	{
		if(file.type ==='audio')
		{
			if(soundApp.sound.isPlaying())
			{
				soundApp.sound.pause();
				soundApp.sound = this.#p.loadSound(file.data, ()=>{soundApp.sound.loop()}, ()=>{alert("File successfully loaded")});
			}
			else
			{
				soundApp.sound = this.#p.loadSound(file.data);
			}
		}
		else
		{
			alert("Select a file with audio format!")
		}
	}

	#showAndHideMenu()
	{
		if ( (this.#p.mouseX < 130 && this.#p.mouseX >5) || this.#isMenuForcedToDisplay )
		{
			this.#menuContainer.style("display:block;")
		}
		else
		{
			this.#menuContainer.style("display:none;")
		}
	}

}
/*
+--------------------------------------------------------------------------+
|                     VisualizationsMenu(p: P5 instance)                   |
+--------------------------------------------------------------------------+
|//////////////////////////////////pubilic/////////////////////////////////|
|addVisualizationToHTML(visualizer:Visualizations.visuals[i]) | void       |                                                
|keyPressed(keycode: number) | void                                        |
|mouseMoved()|void                                                         |  
|////////////////////////////////private///////////////////////////////////|
|#p: p5 instance                                                           |
|#menuContainer: HTML element                                              |
|#fileInout: HTML element                                                  |
|#visOptionsMenu: HTML Element                                             |
|#isMenuForcedTODisplay: Boolean                                           |
|#nextAvailableNumber: Number                                              |
|#playbackButton:instance of PlayBackButton                                |
|#showAndHideMenu() | void                                                 |
|#handleMusic(file: p5.file)| Void                                         |                                                                            
+--------------------------------------------------------------------------+
This class builds a menu of tools to load audio tracks, control play back, and select visualizations via buttons.

addVisualizationToHTML(visualizer): Take a visualizer as an argument and adds a button to the menu for it. It also sets up its 
                          pertinent mouse events and formats.
keyPressed(keycode): Takes the a number as an argument that represents the p5.keyCode, and if it is the space key(32), It toggles the 
                     isMenuForcedToDisplay between true or false and calls the showAndHideMenu() function.
mouseMoved(): It will be called by the mouseMoved event in the P5 instance and executes showAndHideMenu().
#visOptionsMenu: is an HTML container to hold the buttons for each visualizer.
#isMenuForcedTODisplay: It is used in the showAndHideMenu() to indicate that the menu needs to be hiden or unhidden.
#nextAvailableNumber: It is a number holder that indicates what is the next available number to be shown on the next button as a shortcut key.
#playbackButton: It is a PlaybackButton object used for [play back control of the music.
#showAndHideMenu(): This function shows or hides the menu based on the location of the mouse or hitting the space button.
#fileInout(): this is a file input Element for selecting an audio track from the PC.
#handleMusic(file): this is a call back function used by the file unput element to load an audio track from PC which is passed as an argument to this function. 
#menuContainer: It is a container for the fileInput and visOptionsMenu.
*/
