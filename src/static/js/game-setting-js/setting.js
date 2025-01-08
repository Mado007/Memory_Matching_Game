// Get or create the audio element
let audio = document.getElementById('backgroundMusic');
if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'backgroundMusic';
    audio.src = '../../../assets/sounds/game-sound-all-game.wav'; // Adjust path if necessary
    audio.loop = true;
    document.body.appendChild(audio);
}

// Retrieve saved volume or set a default value
const savedVolume = parseFloat(localStorage.getItem('audioVolume')) || 0.5;
audio.volume = savedVolume;

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
        muteButton.textContent = audio.muted ? 'Unmute' : 'Mute';

        muteButton.addEventListener('click', () => {
            audio.muted = !audio.muted;
            muteButton.textContent = audio.muted ? 'Unmute' : 'Mute';
        });
    }
});
