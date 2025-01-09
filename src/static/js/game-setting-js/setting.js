// Get or create the audio element
let audio = document.getElementById('backgroundMusic');
if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'backgroundMusic';
    audio.src = '../../../assets/sounds/game-sound-all-game.wav'; // game sound path
    audio.loop = true;
    document.body.appendChild(audio);
}

// Retrieve saved volume or set a default value
const savedVolume = parseFloat(localStorage.getItem('audioVolume')) || 0.5;
audio.volume = savedVolume;

// Retrieve saved mute state or set a default value
const isMuted = JSON.parse(localStorage.getItem('isMuted')) || false;
audio.muted = isMuted;

document.addEventListener('DOMContentLoaded', () => {
    // Play the audio automatically
    audio.play().catch((error) => {
        console.error('Audio playback failed. User interaction might be required.', error);
    });

    // Volume slider functionality
    const volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
        volumeSlider.value = savedVolume;
        volumeSlider.addEventListener('input', (event) => {
            const newVolume = parseFloat(event.target.value);
            audio.volume = newVolume;
            localStorage.setItem('audioVolume', newVolume);
        });
    }

    // Mute button functionality
    const muteButton = document.getElementById('muteButton');
    if (muteButton) {
        updateMuteButton(muteButton);
        muteButton.addEventListener('click', () => {
            audio.muted = !audio.muted;
            localStorage.setItem('isMuted', JSON.stringify(audio.muted));
            updateMuteButton(muteButton);
            updateAudioIcon();
        });
    }

    // audio icon functionality
    const audioIcon = document.querySelector('.audio-control .audio-icon');
    if (audioIcon) {
        updateAudioIcon(); // Initialize icon state

        audioIcon.addEventListener('click', () => {
            audio.muted = !audio.muted;
            localStorage.setItem('isMuted', JSON.stringify(audio.muted));
            updateMuteButton(muteButton);
            updateAudioIcon();
        });
    }

    function updateMuteButton(button) {
        if (button) {
            button.textContent = audio.muted ? 'Unmute' : 'Mute';
        }
    }

    function updateAudioIcon() {
        const audioIcon = document.querySelector('.audio-control .audio-icon');
        if (audioIcon) {
            if (audio.muted) {
                audioIcon.src = '../../../assets/images/volume-icon/volume-mute.svg';
            } else {
                audioIcon.src = '../../../assets/images/volume-icon/volume-up.svg'; 
            }
        }
    }
});