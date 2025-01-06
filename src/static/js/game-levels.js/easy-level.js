card = document.querySelectorAll('.game-block');

card.forEach(elemet => {
    elemet.addEventListener('click', function(){
        this.classList.toggle('is-flipped')
        // document.getElementById('flipSound').play()
        setTimeout(()=>{
            document.getElementById('flipSound').play()
        },50)
    })
    
});


