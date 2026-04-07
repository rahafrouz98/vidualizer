// this P5 instance is creatred for 3d visualizations
let sketckWEBGL = function(p)
{
 
	p.setup = function()
	{
		// create a canva with WEBGL rendering mode
		soundApp.canvasWEBGL = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
		//Document.body returns the <body> existing in the HTML , inspired by Mozilla Developer Network[9]. 
		soundApp.canvasWEBGL.parent(document.body);
		//The idea of using z-index property to manage the stack order is inspired by W3schools[10]. Because z-index only works with
		//positioned elements, I used position:absolute in the style.
		soundApp.canvasWEBGL.style("position: absolute; left:0px; top:0px ;z-index:1;display:block;");
		//This event toggles the window between fullscreen and non-fullscreen. The reason I transfered this event handler here 
		//and used HTML element event hanler is that this event needs to happen for both canvasP2D and canvasWEBGL with using 
		// the right p as a p5 instance.
		//using arrow function is inspired by W3schools[11]
		soundApp.canvasWEBGL.doubleClicked(()=>{p.fullscreen(!soundApp.fs);soundApp.fs = !soundApp.fs;})

		//add a sceneMAnager for 3d space which needs WEBGL rendering
		soundApp.vis.add(new SceneManager(p));
	}

	p.draw = function()
	{
		p.background(0);
		
		if(soundApp.vis.selectedVisual.renderingMode == "webgl")
		{
			//Make sure canvaP2D is hiden when we are using a 3d visualization
			soundApp.canvasP2D.style("display:none;")
			//draw the selected visualisation
			soundApp.vis.selectedVisual.draw();
		}
	}
}
