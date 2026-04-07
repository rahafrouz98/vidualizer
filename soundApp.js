class SoundApp
{
    constructor()
    {
        this.musicAnalyzer= new MusicAnalyzer();
    }
    musicAnalyzer=null;
    vis=null;
    sound=null;
    canvasP2D=null;
    canvasWEBGL=null;
    fs=false;
    p2dInstance=null
    webglInstance=null;
}
soundApp = new SoundApp();

//webglInstance is created inside p2dInstance's setup() to prevent asynchronous issues.
soundApp.p2dInstance = new p5(sketckP2D);

/*
+-------------------------------------------------+
|                   SoundApp()                    |
+-------------------------------------------------+
|///////////////////pubilic///////////////////////|
|vis: a Visualizations instance                   |
|sound: P5.SoundFile                              |
|musicAnalyzer: MusicAnalyzer instance            |
|canvasP2D: P5.Renderer                           |
|canvasWEBGL: P5.Renderer                         |
|fs: Boolean                                      |              
|p2dInstance: P5 instance                         |
|webglInstance: P5 instance                       |                                                                       
+-------------------------------------------------+
This class encapsulates the global variables of the app to prevent global namespace pollusion[3].The app uses two instances to accommodate two canvas:
one for p2d and one for webgl rendering mode. This approach enables the app to work with both 2d and 3d visualizations, inspired
by [1] and [2]. The code is wiritten based on p5 libraries[4] and using CSS and HTML tools and techniques for menus is inspired by w3schools.com[5] and [6].
To facilitate evaluation and observe how the visualizations react to different styls of music, 7 audio tracks were downloaded from freesound.org  under 
Creative Commons license[7].

vis: It is a visualization object. p2dInstance and webglInstance use this variable to add their visualizers to the app and manage them.
sound: It is a P5.SoundFile, which refers to the loaded sound, and P5.FFT object analyzes its signals.
musicAnalyzer: It is a musicAnalyzer instance which calculates average and standard deviation of music's energy,the instant energy of 
               different frequency bands, and can ccustomize a spectrum with required number of bins.
canvasP2D: This variable refers to the canvas created in the p2dInstance, and is used for 2d visualizations.
canvasWEBGL: This variable refers to the canvas created in the webglInstance, and is used for 3d visualizations.
fs: It is a Boolean variable that indicates if the window is in full-screen mode or not. 
p2dInstance: It is a P5 instance created by sketch2D() and used for 2d visualizations. Its canvas is in P2D rendering mode.
webglInstance: It is a P5 instance created by sketch3D() and used for 3d visualizations. Its canvas is in WEBGL rendering mode.

References:
[1] The p5.js community, "Multiple Canvases," p5.js. [Online]. Available:https://p5js.org/examples/advanced-canvas-rendering-multiple-canvases.
[Accessed: Aug. 30, 2025].
[2] L. L. McCarthy, "Global and instance mode," Github. [Online].  Available:https://github.com/processing/p5.js/wiki/Global-and-instance-mode. 
[Accessed: Aug. 30, 2025].     
[3] P. Babakhchani, "CM1010-Apr 2025 cCohort-week 9 Webinar," University of London, Zoom. [Online]. Available:
https://zoom.us/rec/play/ffqoc13XcYQb_WSWZAOIbYXFxq8NsgaF0_XfMCDQr-9HcqLGNJ9Iipkfrmj7erWNfHHCxbwu11f3q_GV.kwlvj5TxXCVoK1n4?autoplay=true&startTime=1749036923000.
[Accessed: Aug. 30, 2025].  
[4] The p5.js community, "p5.js Library Reference," p5.js. [Online]. Available: https://p5js.org/reference/. 
[Accessed: Aug. 30, 2025].
[5] W3schools, "css Tutorial," W3schools. [Online]. Available: https://www.w3schools.com/css/default.asp. [Accessed: Aug. 30, 2025].
[6] W3schools, "HTML Tutorial," W3schools. [Online]. Available: https://www.w3schools.com/html/default.asp. [Accessed: Aug. 30, 2025].
[7] Freesound, "Licenses," Freesound. [online]. Available: https://freesound.org/help/faq/#licenses. [Accessed: Aug. 30, 2025].
[8] W3schools, "JavaScript Arrow Function," W3schools. [Online]. Available: https://www.w3schools.com/js/js_arrow_function.asp. [Accessed: Aug. 30, 2025].
[9] Mozilla Developer Network, "Document: body property," Mozilla.org. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/API/Document/body. 
[Accessed: Aug. 30, 2025].
[10] W3schools, "CSS The z-index Property," W3schools. [Online]. Available: https://www.w3schools.com/css/css_z-index.asp. [Accessed: Aug. 30, 2025].
[11] W3schools, "JavaScript Arrow Function" W3schools. [Online]. Available: https://www.w3schools.com/js/js_arrow_function.asp. [Accessed: Aug. 30, 2025].
[12] OpenAI, "ChatGPT conversation: Adding a global resize listener for two p5 instances," chatGPT. [Online]. Available: https://chatgpt.com/share/68a53621-687c-800e-8915-0061daadcb95.
[Accessed: Aug. 30, 2025].
[13] Mozilla Developer Network, "Optional chaining (?.)," Mozilla.org. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining. 
[Accessed: Aug. 30, 2025].
[14] The p5.js community, "pixelDensity()," p5.js. [Online]. Available:https://p5js.org/reference/p5/pixelDensity/.
[Accessed: Aug. 30, 2025].
[15] OpenAI, "ChatGPT conversation: Load Audio Sound Tracks from PC," chatGPT. [Online]. Available: https://chatgpt.com/share/68acf097-8618-800e-9dec-ff11b721f940.
[Accessed: Aug. 30, 2025].
[16] Toptal, "JavaScript Key Code 32," Toptal. [Online]. Available: https://www.toptal.com/developers/keycode. [Accessed: Aug. 30, 2025].
[17] Raj, "When to Use Arrow Functions in JavaScript and When Not to Use Them," Leetcode. [Online]. Available: 
https://leetcode.com/discuss/post/3745341/when-to-use-arrow-functions-in-javascrip-uc9f/. [Accessed: Aug. 30, 2025].
[18] The p5.js community, "normalMaterial()," p5.js. [Online]. Available:https://p5js.org/reference/p5/normalMaterial/.[Accessed: Aug. 30, 2025].
[19] OpenAI, "ChatGPT conversation: Use Static Property to Count Instances," chatGPT. [Online]. Available: https://chatgpt.com/share/68b23f85-7dcc-800e-a852-3837a6a309be.
[Accessed: Aug. 30, 2025].
[20] P. Babakhchani, "CM1010-Apr 2025 cohort- final assignment webinar," University of London, Zoom. [Online]. Available:
https://zoom.us/rec/play/-LwYSqk-oI_ksvsqB1gWw130uZ3gG88DhOHa572PpirVB2I2UC0MZBIp4EM1DyYg3S6GixmbTi6cqwzM.dCl--gnxKg_KyHn5?autoplay=true&startTime=1754651024000.
[Accessed: Aug. 30, 2025].
[21] The p5.js community, "lights()," p5.js. [Online]. Available:https://p5js.org/reference/p5/lights/.[Accessed: Aug. 30, 2025].
[22] The p5.js community, "orbitControl()," p5.js. [Online]. Available:https://p5js.org/reference/p5/orbitControl/.[Accessed: Aug. 30, 2025].
[23] W3schools, "HTML DOM Element blur()," W3schools. [Online]. Available: https://www.w3schools.com/jsref/met_html_blur.asp. [Accessed: Aug. 30, 2025].
[24] W3schools, "JavaScript Switch Statement," W3schools. [Online]. Available: https://www.w3schools.com/js/js_switch.asp. [Accessed: Aug. 30, 2025].
[25] Mozilla Developer Network, "Property accessors," Mozilla.org. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors. 
[Accessed: Aug. 30, 2025].
[26] g.gorlen, "StackOverflow communication: using P5 createRadio() in a class and having two objects of that class leads to radio buttons not functioning independently," 
StackOverflow. [Online]. Available: https://stackoverflow.com/questions/79724803/using-p5-createradio-in-a-class-and-having-two-objects-of-that-class-leads-to. 
[Accessed: Aug. 30, 2025].
[27] D.Ramalho, "Worley Noise," David's Raging Nexus. [Online]. Available: https://ragingnexus.com/creative-code-lab/experiments/worley-noise-basics/
[Accessed: Aug. 30, 2025].
[28] D.Snyder, "worley noise," P5.js. [Online]. Available: https://editor.p5js.org/D_Snyder/sketches/OepZ0qT9G.[Accessed: Aug. 30, 2025].
[29] codingtrain, "Cabana! - Worley Noise," p5.js. [Online]. Available: https://editor.p5js.org/codingtrain/sketches/QsiCWVczZ. [Accessed: Aug. 30, 2025].
[30] W3schools, "JavaScript Window Screen," W3schools. [Online]. Available: https://www.w3schools.com/js/js_window_screen.asp. [Accessed: Aug. 30, 2025].
[31] W3schools, "UTF-8 Emoji Audio and Video," W3schools. [Online]. Available: https://www.w3schools.com/charsets/ref_emoji_av.asp. [Accessed: Aug. 30, 2025].
[32] Mozilla Developer Network, "Classes," Mozilla.org. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes. 
[Accessed: Aug. 30, 2025].
[33] Mozilla Developer Network, "super," Mozilla.org. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super. 
[Accessed: Aug. 30, 2025].
[34] Wikipedia, "Standard deviation," Wikipedia. [Online]. Available: https://en.wikipedia.org/wiki/Standard_deviation. [Accessed: Aug. 30, 2025]. 
[35] W3schools, "JJavaScript For In," W3schools. [Online]. Available: https://www.w3schools.com/js/js_loop_forin.asp. [Accessed: Aug. 30, 2025].
[36] University of London, "Extending the music visualiser: firework beats part 2, CM1010," Coursera. [Online]. Available: 
https://www.coursera.org/learn/uol-introduction-to-programming-2/lecture/4Ffqs/extending-the-music-visualiser-firework-beats-part-2Opens. [Accessed: Aug. 30, 2025].
[37] K.Umeda, "Make Water Surface Effect in p5.js 1/2," Youtube .[Online]. Available: https://www.youtube.com/watch?v=kUexPZMIwuA.[Accessed: Aug. 30, 2025].
[38] K.Umeda, "Make Water Surface Effect in p5.js 2/2," Youtube .[Online]. Available: https://www.youtube.com/watch?v=H7CEy5mgKFY.[Accessed: Aug. 31, 2025].
*/
