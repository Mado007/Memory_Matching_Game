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

});
