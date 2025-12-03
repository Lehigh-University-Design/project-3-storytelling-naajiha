// Cycle System - Interactive video loop system
const maxClicks = 10;
let videoElements = [];
let panelElement = null;
let cycleButton = null;
let breakCycleButton = null;

// Get click count from localStorage
function getClickCount() {
    return parseInt(localStorage.getItem('cycleClickCount') || '0');
}

// Save click count to localStorage
function saveClickCount(count) {
    localStorage.setItem('cycleClickCount', count.toString());
}

// Handle break cycle button click
function handleBreakCycle() {
    const clickCount = getClickCount();
    if (clickCount >= maxClicks) {
        // Clear the cycle state when breaking the cycle
        localStorage.removeItem('cycleClickCount');
        window.location.href = 'page12.html';
    }
}

// Initialize the cycle system
document.addEventListener('DOMContentLoaded', function() {
    panelElement = document.getElementById('main-panel');
    cycleButton = document.getElementById('cycle-button');
    breakCycleButton = document.getElementById('break-cycle-button');
    
    // Restore state from localStorage
    const clickCount = getClickCount();
    
    // If we have clicks, restore videos and button state
    if (clickCount > 0) {
        // Restore videos based on the click count
        // First video always exists
        addRandomVideo();
        
        // For subsequent clicks, restore based on the pattern
        for (let i = 2; i <= clickCount; i++) {
            const addChance = Math.min(0.3 + ((i - 1) * 0.1), 0.9);
            // Use a deterministic seed based on click count to roughly match previous state
            const seed = (clickCount * 7 + i * 13) % 100 / 100;
            if (seed < addChance) {
                addRandomVideo();
            }
        }
        
        // Show break cycle button if needed
        if (clickCount >= maxClicks) {
            showBreakCycleButton();
            if (cycleButton) {
                cycleButton.style.pointerEvents = 'none';
                cycleButton.style.opacity = '0.5';
            }
        }
    }
    
    if (cycleButton) {
        cycleButton.addEventListener('click', handleCycleClick);
    }
});

function handleCycleClick() {
    let clickCount = getClickCount();
    clickCount++;
    saveClickCount(clickCount);
    
    // Add first video on first click
    if (clickCount === 1) {
        addRandomVideo();
    } else {
        // Sporadically add more videos (random chance increases with clicks)
        const addChance = Math.min(0.3 + (clickCount * 0.1), 0.9);
        if (Math.random() < addChance) {
            addRandomVideo();
        }
    }
    
    // Show "Break the Cycle" button after 10 clicks
    if (clickCount >= maxClicks) {
        showBreakCycleButton();
        if (cycleButton) {
            cycleButton.style.pointerEvents = 'none';
            cycleButton.style.opacity = '0.5';
        }
    }
    
    // Toggle between page10.html and page11.html
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'page10.html') {
        window.location.href = 'page11.html';
    } else if (currentPage === 'page11.html') {
        window.location.href = 'page10.html';
    }
}

function addRandomVideo() {
    if (!panelElement) return;
    
    // Create video element
    const video = document.createElement('video');
    video.src = 'video/3.mp4';
    video.loop = true;
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    video.className = 'cycle-video';
    
    // Random position and size
    const maxWidth = Math.min(window.innerWidth * 0.3, 300);
    const minWidth = Math.max(window.innerWidth * 0.15, 150);
    const width = Math.random() * (maxWidth - minWidth) + minWidth;
    const height = width * (9/16); // Maintain aspect ratio
    
    const maxX = window.innerWidth - width;
    const maxY = window.innerHeight - height - 28; // Account for progress bar
    const x = Math.random() * maxX;
    const y = Math.random() * maxY + 28; // Start below progress bar
    
    // Random rotation for overlap effect
    const rotation = (Math.random() - 0.5) * 15; // -7.5 to 7.5 degrees
    
    // Random z-index for layering
    const zIndex = Math.floor(Math.random() * 100) + 1;
    
    // Apply styles
    video.style.position = 'fixed';
    video.style.width = width + 'px';
    video.style.height = height + 'px';
    video.style.left = x + 'px';
    video.style.top = y + 'px';
    video.style.transform = `rotate(${rotation}deg)`;
    video.style.zIndex = zIndex;
    video.style.opacity = 0.8 + Math.random() * 0.2; // 0.8 to 1.0
    video.style.pointerEvents = 'none';
    video.style.border = '2px solid rgba(0, 0, 0, 0.3)';
    video.style.borderRadius = '4px';
    
    // Add to page
    document.body.appendChild(video);
    videoElements.push(video);
    
    // Play video
    video.play().catch(err => {
        console.log('Video autoplay prevented:', err);
    });
}

function showBreakCycleButton() {
    if (!breakCycleButton) return;
    
    breakCycleButton.style.display = 'block';
    breakCycleButton.style.pointerEvents = 'auto';
    
    // Fade in animation
    setTimeout(() => {
        breakCycleButton.style.transition = 'opacity 1s ease-in';
        breakCycleButton.style.opacity = '1';
    }, 100);
}

