// script.js

// 1. Load the real instrument sound (make sure you have a bass.wav in your sounds folder!)
const bassSound = new Audio('../elementos/sounds/double_bass.wav');

// Tell the track to loop continuously like a DJ backing track
bassSound.loop = true;

// Start the volume at 0 (muted) because our HTML fader starts at 0
bassSound.volume = 0; 

// 2. Get the HTML elements
const playBtn = document.getElementById('start-bass');
const bassFader = document.getElementById('bass-fader');

// 3. Start playing the sound when the button is clicked
playBtn.addEventListener('click', () => {
    bassSound.play();
    playBtn.textContent = "Bass is playing...";
    playBtn.style.backgroundColor = "#ff9800"; // Change color so user knows it's active
});

// 4. Listen for the fader moving up and down
bassFader.addEventListener('input', (event) => {
    // event.target.value gives us the current position of the slider (between 0 and 1)
    // We instantly apply that number to the audio's volume!
    bassSound.volume = event.target.value;
});