/**
 * Matrix Digital Rain Animation
 * Focus: Binary (010101)
 */

const canvas = document.getElementById('hackerCanvas');
const ctx = canvas.getContext('2d');

let fontSize = 16;
let columns;
let drops = [];

// Function to handle canvas sizing and re-calculating columns
function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    columns = Math.floor(canvas.width / fontSize);
    
    // Reset drops for the new number of columns
    drops = [];
    for (let x = 0; x < columns; x++) {
        // Randomize initial starting positions for a more natural look
        drops[x] = Math.random() * -100; 
    }
}

// Characters to display (Binary as requested)
const chars = "01"; 
const charArray = chars.split("");

function draw() {
    // Semi-transparent black rectangle to create trailing effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text style
    ctx.fillStyle = "#00ff41"; 
    ctx.font = fontSize + "px monospace";

    // Loop through the drops
    for (let i = 0; i < drops.length; i++) {
        // Select random character (0 or 1)
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Draw the character
        // x = i * fontSize
        // y = drops[i] * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly once it reaches the bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Move the drop down
        drops[i]++;
    }
}

// Handle window resizing
window.addEventListener('resize', initMatrix);

// Start the animation
initMatrix();
setInterval(draw, 35);