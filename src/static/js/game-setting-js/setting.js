// Get or create the audio element
let audio = document.getElementById('backgroundMusic');
if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'backgroundMusic';
    audio.src = '../../../assets/sounds/space-station-247790.mp3'; // Adjust path if necessary
    audio.loop = true;
    document.body.appendChild(audio);
}

// Retrieve saved volume or set a default value
const savedVolume = localStorage.getItem('audioVolume') || 0.5;
audio.volume = savedVolume;

// Play the audio automatically
audio.play();

// Save volume when the slider changes
document.addEventListener('DOMContentLoaded', () => {
    const volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
        volumeSlider.value = savedVolume;

        volumeSlider.addEventListener('input', (event) => {
            const newVolume = event.target.value;
            audio.volume = newVolume;
            localStorage.setItem('audioVolume', newVolume);
        });
    }

    const muteButton = document.getElementById('muteButton');
    if (muteButton) {
        muteButton.addEventListener('click', () => {
            if (audio.muted) {
                audio.muted = false;
                muteButton.textContent = 'Mute';
            } else {
                audio.muted = true;
                muteButton.textContent = 'Unmute';
            }
        });
    }
});
