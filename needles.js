//@ param p: is a p5 instance used for 2d visualization
//I used this p as a argument so I can use 2d functions in p5 library
function Needles(p) 
{
	//indicate if it needs 2d or 3d canva(rendering mode is P2D or WEBGL)
	this.renderingMode = "p2d";
	//name of the visualisation
	this.name = "Needles";

	//how large is the arc of the needle plot.
	let minAngle = p.PI + p.PI / 10;
	let maxAngle = p.TWO_PI - p.PI / 10;

	this.plotsAcross = 2;
	this.plotsDown = 2;

	//frquencies used by the energyfunction to retrieve a value
	//for each plot.
	this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];

	//resize the plots sizes when the screen is resized.
	this.onResize = function() {
		this.pad = p.width / 20;
		this.plotWidth = (p.width - this.pad) / this.plotsAcross;
		this.plotHeight = (p.height - this.pad) / this.plotsDown;
		this.dialRadius = (this.plotWidth - this.pad) / 2 - 5;
	};
	//call onResize to set initial values when the object is created
	this.onResize();

	// draw the plots to the screen
	this.draw = function() 
	{
		//iterator for selecting frequency bin.
		let currentBin = 0;
		p.push();
		p.fill('#f0f2d2');
		//nested for loop to place plots in 2*2 grid.
		for (let i = 0; i < this.plotsDown; i++) 
		{
			for (let j = 0; j < this.plotsAcross; j++) 
			{

				//calculate the size of the plots
				let x = this.plotWidth * i + (this.pad/3 * (i+1));
				let y = this.plotHeight * j + (this.pad/3 * (j+1));
				let w = this.plotWidth 
				let h = this.plotHeight 

				//draw a rectangle at that location and size
				p.rect(x, y, w, h);
				//add on the ticks
				let centerX = x + w / 2;
				let bottomY = y + h;
				this.ticks(centerX,bottomY,this.frequencyBins[currentBin]);

				let energy = soundApp.musicAnalyzer.instantEnergy[this.frequencyBins[currentBin]];

				//add the needle
				this.needle(energy, centerX, bottomY);
				currentBin++;
			}
		}

		p.pop();
	};

	/*
	 *draws a needle to an individual plot
	 *@param energy: The energy for the current frequency
	 *@param centreX: central x coordinate of the plot rectangle
	 *@param bottomY: The bottom y coordinate of the plot rectangle
	 */
	this.needle = function(energy, centreX, bottomY) {
		p.push();
		p.stroke('#333333');
		//translate so 0 is at the bottom of the needle
		p.translate(centreX, bottomY);
		//map the energy to the angle for the plot
		let theta = p.map(energy, 0, 255, minAngle, maxAngle);
		//calculate x and y coorindates from angle for the length of needle
		let x = this.dialRadius * p.cos(theta);
		let y = this.dialRadius * p.sin(theta);
		//draw the needle
		p.line(0, 0, x, y);
		p.pop();
	};

	/*
	 *draw the graph ticks on an indivisual plot
	 *@param centreX: central x coordinate of the plot rectangle
	 *@param bottomY: The bottom y coordinate of the plot rectangle
	 *@param freqLabel: Label denoting the frequency of the plot
	 */
	this.ticks = function(centreX, bottomY, freqLabel) {
		// 8 ticks from pi to 2pi
		let nextTickAngle = minAngle;
		p.push();
		p.stroke('#333333');
		p.fill('#333333');
		p.translate(centreX, bottomY);
		//draw the semi circle for the botttom of the needle
		p.arc(0, 0, 20, 20, p.PI, 2 * p.PI);
		p.textAlign(p.CENTER);
		p.textSize(12);
		p.text(freqLabel, 0, -(this.plotHeight / 2));

		for (let i = 0; i < 9; i++) {
			//for each tick work out the start and end coordinates of
			//based on its angle from the needle's origin.
			let x = this.dialRadius * p.cos(nextTickAngle);
			let x1 = (this.dialRadius - 5) * p.cos(nextTickAngle);

			let y = (this.dialRadius) * p.sin(nextTickAngle);
			let y1 = (this.dialRadius - 5) * p.sin(nextTickAngle);

			p.line(x, y, x1, y1);
			nextTickAngle += p.PI / 10;
		}
		p.pop();
	};
	

}

/*
+-----------------------------------------------------------------+
|                       Needles(p: P5 instance)                   |
+-----------------------------------------------------------------+
|//////////////////////////////pubilic////////////////////////////|
|renderingMode: String                                            |
|name: String                                                     |
|plotsAcross: Number                                              |
|plotsDown: Number                                                |      
|frequencyBins: Array of strings                                  |
|draw()| void                                                     |
|onResize()| void                                                 |
|needle(energy: Number, centreX: Number, bottomY: Number)| void   |
|ticks(centreX: Number, bottomY: Number, freqLabel: String)| void |                                                                            
|/////////////////////////////private/////////////////////////////|
|minAngle:Number                                                  |
|maxAngle:Number                                                  |
+-----------------------------------------------------------------+
This constructor creates four dials, each one dedicated to a specific frequency range of bass, lowMid, highMid, and treble, and shows the energy of 
pertinent frequency range. 

name: It is used to identify which v isualization object is selected or added.
renderingMode: It is used to identify the required rendering mode and relate the object to the right canvas(P2D).
plotsAcross: It is the number of needles distributed horizontally (columns).
plotsDown: It is the number of needles distributed vertically(rows).
frequencyBins: An array of strings holding bass, lowMid, highMid, and treble as strings. Each of these is a predefined frequency range used as an argument.
             for FFT.getEnergy().
draw(): Draws four dials with updated angles of their needles at each frame based on the music signals read from FFT.getEnergy()
needle(): This is called with draw() to draw a niddle. It takes three arguments as energy, centreX, bottomY. It maps the energy to an angle, which
         is the needle angle. centreX and bottomY indicate the place of the needle tail.
ticks(): This is called by draw() to draw the ticks of a dial. freqLabel is the frequency range that the dial is visyalizing. centreX and bottomY
         are indicating the dial center where ticks are drawn around. 
minAngle: Indicates the minimum angle that needles should have when there is no signal.
maxAngle: Indicates the maximum angle that needles can reach. 


Reference:
Code structure is based on the template provided for the music visualization in CM1010 Module
*/
