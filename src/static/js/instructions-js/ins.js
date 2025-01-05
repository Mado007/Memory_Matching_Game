document.addEventListener('DOMContentLoaded', () => {
    
    function setVolume(value) {
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach(audio => {
            audio.volume = value;
        });
        localStorage.setItem('audioVolume', value);
    }
    
 
    const savedVolume = localStorage.getItem('audioVolume') || 0.5;
    setVolume(savedVolume);
    

    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider.value = savedVolume;
    volumeSlider.addEventListener('input', (event) => {
        setVolume(event.target.value);
    });
    
    window.addEventListener('load', () => {
        const savedVolume = localStorage.getItem('audioVolume') || 0.5;
        setVolume(savedVolume);
    });


// const playButton = document.getElementById('playButton');
// playButton.addEventListener('click', () => {
//     audio.play();
// });
});














// document.addEventListener('DOMContentLoaded', () => {
//     const audio = document.getElementById('backgroundMusic');

//     function setVolume(value) {
//         audio.volume = value;
//         localStorage.setItem('audioVolume', value);
//     }


//     const savedVolume = localStorage.getItem('audioVolume') || 0.5;
//     setVolume(savedVolume);


//     const volumeSlider = document.getElementById('volumeSlider');
//     volumeSlider.value = savedVolume;
//     volumeSlider.addEventListener('input', (event) => {
//         setVolume(event.target.value);
//     });


//     audio.play().catch(error => {
//         console.log("Audio playback failed:", error);
//     });
// });
























// window.onload = setInterval(GameLoop, 1000 / 10); //10fps

// let myAudio = new Audio();

// myAudio.src = '/space-station-247790.mp3';

// function Gameloop() {
//     myAudio.play();
//     if (myAudio.paused == true) {
//         myAudio.play();
//     }
// }

// myAudio.addEventListener('ended', () => {
//     myAudio.play();
// })
// function autoPlay() {
//     myAudio.play();
// }
// autoPlay();