class FireFlame extends Object3d {
    constructor(centerPoint, objectColor, objectSize, isNormalMaterial, p) {
        super(centerPoint, objectColor, objectSize, isNormalMaterial, p);
        FireFlame.counter++;
        this.fireColor = p.color(255, 255, 0);
        this.fireParticleSize = this.size / 12;
        this.name = "Flame" + FireFlame.counter;
    }
    static counter = 0;
    draw() {
        this.p.push();
        if (this.isNormalMaterial) {
            this.p.normalMaterial();
        } else {
            this.p.fill(this.color);
        }

        if (this.isSelected) {
            this.p.stroke("red");
            this.p.strokeWeight(5);
        } else {
            this.p.noStroke();
        }

        this.p.translate(this.centerPoint.x, this.centerPoint.y, this.centerPoint.z + (this.size * this.scale) / 2);
        this.p.box((this.size * this.scale) / 3, (this.size * this.scale) / 3, this.size * this.scale);
        this.p.push();
        this.p.rotateX(-Math.PI / 2);
        this.p.translate(0, -((this.size * this.scale) / 2), 0);
        this.p.cone((this.size * this.scale) / 2, this.size * this.scale);
        this.p.pop();
        this.p.pop();

        for (let i = this.#fireParticlesList.length - 1; i >= 0; i--) {
            if (this.#fireParticlesList[i].isExpired) {
                this.#fireParticlesList.splice(i, 1);
            } else {
                this.#fireParticlesList[i].draw();
            }
        }
        if (soundApp.musicAnalyzer.detectBeat("audible")) {
            this.#emitter(soundApp.musicAnalyzer.instantEnergy["audible"]);
        }
    }
    changeScale(scale) {
        super.changeScale(scale);
        this.#fireParticleSize *= scale;
    }
    #fireColor = null;
    #particlesPerBatchFactor = 0.03;
    #fireParticleSize = null;
    #fireParticlesList = [];
    #fireParticleSpeedFactor = 0.5;
    #orificeSizeFactor = 0.07;
    #emitter(energy) {
        let particlesPerBatch = energy * this.#particlesPerBatchFactor;
        for (let i = 0; i < particlesPerBatch; i++) {
            let randomVector = this.p.createVector(
                this.p.random(
                    -(this.size * this.scale) * this.#orificeSizeFactor,
                    this.size * this.scale * this.#orificeSizeFactor,
                ),
                this.p.random(
                    -(this.size * this.scale) * this.#orificeSizeFactor,
                    this.size * this.scale * this.#orificeSizeFactor,
                ),
                this.p.random(0, this.size * this.scale),
            );
            let tempCenterPoint = this.p.createVector(
                this.centerPoint.x + randomVector.x,
                this.centerPoint.y + randomVector.y,
                this.centerPoint.z + this.size * this.scale + randomVector.z,
            );
            this.#fireParticlesList.push(
                new FireFlameParticle(
                    tempCenterPoint,
                    this.fireColor,
                    this.fireParticleSize,
                    energy * this.#fireParticleSpeedFactor,
                    this.p,
                ),
            );
        }
    }
}

/*
+---------------------------------------------------------------------------------+
|    FireFlame(centerPoint: p5.vector,objectColor:p5.color, objectSize:Number     |
|                    , normalMaterial:Boolean, p:p5 instance )                    |
+---------------------------------------------------------------------------------+
|///////////////////////////////////////Static////////////////////////////////////|
|counter: Number                                                                  |
|///////////////////////////////////////Public////////////////////////////////////|                     
|draw()| void                                                                     |
|changeScale(scale:Number)|Void                                                   |
|-------------------------------------Inherited-----------------------------------|
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
|//////////////////////////////////////Private////////////////////////////////////|
|#fireColor: p5.color instance                                                    |
|#particlesPerBatchFactor: Number                                                 |
|#fireParticleSize: Number                                                        |
|#fireParticlesList[]: An array of FireParticle instances                         |
|#fireParticleSpeedFactor: Number                                                 |
|#orificeSizeFactor: Number                                                       |
|#emitter(energy: Number)| Void                                                   |
+---------------------------------------------------------------------------------+

counter: It is a static variable and keeps track of the number of instances created from this class[19]. It is used for naming each instance from this class. 
         The name will be used in the dropdown list of the sceneMenu. 
draw(): It draws the flame base and its nozzle at each frame, and by using the musicAnalyzer's detectBeat() method, it indicats beats and wmits a bundle of 
        particles at each beat detection. 
#fireColor: Represents the color of FlameParticles.
#particlesPerBatchFactor: It is used to calculate the particles for each batch based o nthe value of the music's energy at that moment.
#fireParticleSize:Represents the size of the FireParticles att the moment of creation.
#fireParticlesList[]: This is a holder to reference to the fireParticles. 
#orificeSizeFactor: It is used to determine the size of the flame's nozzel's hole, the area which flameParticles start from there. 
#emitter: It adds a specific number of flameParticles to the fireParticlesList[], depending on the value of received energy and particlesPerBatchFactor
*/
