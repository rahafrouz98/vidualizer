class MusicAnalyzer
{
    constructor()
    {
        this.#sampleBuffers =
        {
            "audible":[],
            "bass":[],
            "lowMid":[],
            "mid":[],
            "highMid":[],
            "treble":[]
        }
        this.averageEnergy =
        {
            "audible":0,
            "bass":0,
            "lowMid":0,
            "mid":0,
            "highMid":0,
            "treble":0
        }
        this.fft = new p5.FFT();
        this.instantEnergy =
        {
            "audible":0,
            "bass":0,
            "lowMid":0,
            "mid": 0,
            "highMid": 0,
            "treble": 0
        }
        this.#standardDeviation=
        {
            "audible":0,
            "bass":0,
            "lowMid":0,
            "mid": 0,
            "highMid": 0,
            "treble": 0
        }
    }
    instantEnergy ={};
    averageEnergy={};
    spectrum = [];
    waveForm =[];
    fft = null;
    gradient = -0.1;
    b = 1;
    analyze()
    {
        this.waveForm = this.fft.waveform();
        this.spectrum = this.fft.analyze();

        this.#sampleBuffers["audible"].push(this.fft.getEnergy(100,20000));
        this.#sampleBuffers["bass"].push(this.fft.getEnergy("bass"));
        this.#sampleBuffers["lowMid"].push(this.fft.getEnergy("lowMid"));
        this.#sampleBuffers["mid"].push(this.fft.getEnergy("mid"));
        this.#sampleBuffers["highMid"].push(this.fft.getEnergy("highMid"));
        this.#sampleBuffers["treble"].push(this.fft.getEnergy("treble"));

        //For-In loop is applied to iterate in the averageEnergy properties[35]
        for( let freqBand in this.averageEnergy)
        {
            if (this.#sampleBuffers[freqBand].length > this.#samples)
            {
                let sampleBufferSum = 0;
                for(let i = 0; i < this.#sampleBuffers[freqBand].length; i++ )
                {
                    sampleBufferSum += this.#sampleBuffers[freqBand][i];
                }
                this.averageEnergy[freqBand] = sampleBufferSum/this.#sampleBuffers[freqBand].length;
                //Standard Deviation formula is inspired by Wikipedia[34]
                let squareVarianceSum = 0;
                for (let i = 0; i < this.#sampleBuffers[freqBand].length; i++)
                {
                    squareVarianceSum += (this.#sampleBuffers[freqBand][i] - this.averageEnergy[freqBand])**2;
                }
                let variance = squareVarianceSum/this.#sampleBuffers[freqBand].length
                this.#standardDeviation[freqBand] = Math.sqrt(variance);

                this.instantEnergy[freqBand] = this.#sampleBuffers[freqBand][this.#samples]
                this.#sampleBuffers[freqBand].splice(0,1);
                
            }
        } 
    }
    
    detectBeat(freqBand)
    {
        
        let thresholdFactor = this.gradient * this.#standardDeviation[freqBand]	+ this.b;

        if (((this.instantEnergy[freqBand] - this.averageEnergy[freqBand]) > this.#standardDeviation[freqBand]*thresholdFactor )&&
                                                                                         this.#sampleBuffers["audible"].length>=this.#samples)
        {
            return true;  
        }
        else
        {
            return false;
        }
    }
    //the original spectrum has 1024 bins of frequency. This function returns a customized spectrum with specific number of bins. It is used for 
    //the wobbly sphere which has limited amount of marbles, and each marble is dedicated to a bin in this spectrum
    customizeSpectrum(binsNumber)
    {
        let tempSpectrum = [];
        //the range of frequency for each  bin (the spectrum covers the hearing frequency from 100hz to 20000hz)
        let freqBandRange = (20000-100)/binsNumber

        for (let freq= 100; freq < 20000; freq += freqBandRange)
        {
            let tempBandEnergy = soundApp.musicAnalyzer.fft.getEnergy((freq,freq+freqBandRange ))
            tempSpectrum.push(tempBandEnergy);
        }
        return tempSpectrum;
    }
    #standardDeviation={};
    #sampleBuffers={}
    #samples = 60;
    b = 1;
  
}
/*
+---------------------------------------------------------------------------------------+
|                                   MusicAnalyzer()                                     |
+---------------------------------------------------------------------------------------+
|////////////////////////////////////////pubilic////////////////////////////////////////|
|instantEnergy{}: A js object                                                           |
|averageEnergy{}: A js object                                                           |
|standardDeviation{}: A js object                                                       |
|fft: A P5.FFT instance                                                                 |
|spectrum[]: An array of numbers                                                        |
|analyze()|void                                                                         |
|detectBeat(freqBand: String)| Boolean                                                  |
|customizeSpectrum(binsNumber: Number)| an Array of Numbers                             |                                                         
|////////////////////////////////////////Private////////////////////////////////////////|
|#sampleBuffers{}: A Js object                                                          |
|#samples: Number                                                                       | 
|#gradient: Number                                                                      |
|#b: Number                                                                             |
+---------------------------------------------------------------------------------------+
This class analysis the music and updates the instant energy, average energy and standard deviation for 
frequency ranges of "audible", which is from 100 to 20000hz, and the predefined frequency ranges of "bass"
, "lowMid", "mid", "highMid" and "treble". This class provides the ability to select the frequency bands 
when the app is runing. It keeps the integrity of the app and avoids having multiple p5.FFTs in the app. 
Code structure is based on the material provided in week 13 of CM1010[36].

instantEnergy{}: It is an js object containing 6 properties representing the instant energy of music in different frequency
                 ranges: "audible", "bass", "lowMid", "mid", "highMid" and "treble". These strings are used as the name of the 
                 properties, and later will be used later as the filter to retrieve the data of the corresponding frequency band.
averageEnergy{}: It is an js object containing 6 keys of numbers, representing the average of music's energy for each frequency
                 range of "audible", "bass", "lowMid", "mid", "highMid" and "treble". 
standardDeviation{}: It is an js object containing 6 properties  representing the standard deviation of music's energy in different frequency
                     ranges:"audible", "bass", "lowMid", "mid", "highMid" and "treble". 
waveFrame(): Holds the waveForm of the music which is obtained by FFT.analysis()
spectrum[]: Holds the spectrum of the music which is obtained by FFT.analysis()
analyze(): This function is called at each frame to update the spectrum and waveForm, instant energy, average energy, and standard 
            deviation of the music for each frequency band.
detectBeat(freqBand): Takes a string as the argument wich represents the frequency band to filter. It returns true if the instant energy minus the 
                      avrageEnergy is greater than standard deviation multipied by the thresholdFactor. Calculations are based on the specified frequency band. 
customizeSpectrum(binsNumber): This function returns a customized spectrum with specific number of bins. 
#sampleBuffers{}: It is an Js object containing 6 properties of arrays. Each array is corresponding to a frequency band and holds the music's energy
                 of that frequency band up to 60 samples. This array will be used to calculate the average and the standard deviaton of 
                 the  music's energy for different frequency bands. 
#samples: It indicates the number of samples used for calculating the average and standard deviation.
#fft: It is an P5.FFT instance.
#gradient: It is used in the line formula of "thresholdFactor = Gradient*standardDeviation + b".
           Its default is -.01, and by decreasing its value toward a biger minus value, music beat will be detected at lower standard deviations.    
#b: It is used in the line formula of "thresholdFactor = Gradient*standardDeviation + b".
    Its default is 1, and by decreasing it, music beat will be detected at lower standard deviations.

*/