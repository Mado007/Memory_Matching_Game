const audio = document.getElementById('backgroundMusic');
document.addEventListener('DOMContentLoaded', () => {
    
    function setVolume(value) {
       
            audio.volume = value;
        
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


const muteButton = document.getElementById('muteButton');

muteButton.addEventListener('click', () => {
    if (audio.muted) {
        audio.muted = false; // Unmute the audio
        muteButton.textContent = 'Mute'; // Change button text to "Mute"
        muteButton.classList.remove('unmute');
        muteButton.classList.add('mute');
    } else {
        audio.muted = true; // Mute the audio
        muteButton.textContent = 'Unmute'; // Change button text to "Unmute"
        muteButton.classList.remove('mute');
        muteButton.classList.add('unmute');
    }
});

});

// const mute=document.getElementById('mute');
// mute.addEventListener('click', () => {
// audio.setAttribute("muted")
// })

