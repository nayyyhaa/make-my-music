class MusicTable {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.clapAudio = document.querySelector(".clap-sound")
        this.hihatAudio = document.querySelector(".hihat-sound")
        this.kickAudio = document.querySelector(".kick-sound")
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
    }
    activatePad(){
        this.classList.toggle("active");
    }
    repeat() {
        let loopIndex = this.index % 8;
        let allPads = document.querySelectorAll(`.b${loopIndex}`);
        allPads.forEach (pad => {
            pad.style.animation = "playTrack 0.3s alternate ease-in-out 2"
            if (pad.classList.contains("active")){
                if(pad.classList.contains("clap-pad")){
                    this.clapAudio.currentTime=0;
                    this.clapAudio.play();
                } if(pad.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime=0;
                    this.hihatAudio.play();
                } if(pad.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime=0;
                    this.kickAudio.play();
                }
            }
        })
        console.log(this.index)
        this.index++;
    }
    play(){
        const interval = (60 / this.bpm) * 1000;
        if(this.isPlaying) {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        } else {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval)
        }
    }
    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        } else {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
    }
}

const musicTable = new MusicTable();

musicTable.pads.forEach(pad => {
    pad.addEventListener("click", musicTable.activatePad);
    pad.addEventListener("animationend", function() {
        this.style.animation ="";
    })
})

musicTable.playBtn.addEventListener("click", function() {
    musicTable.play();
    musicTable.updateBtn();
});