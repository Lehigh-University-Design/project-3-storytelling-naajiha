// Progress tracking system
const pageOrder = {
    'index.html': 1,
    'page2.html': 2,
    'page3.html': 3,
    'page4.html': 4,
    'page5.html': 5
};

const totalPages = 5;

// Get current page number
function getCurrentPageNumber() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    return pageOrder[currentPage] || 0;
}

// Update progress in localStorage
function updateProgress() {
    const currentPageNum = getCurrentPageNumber();
    const savedProgress = parseInt(localStorage.getItem('storyProgress') || '0');
    
    // Update if current page is higher than saved progress
    if (currentPageNum > savedProgress) {
        localStorage.setItem('storyProgress', currentPageNum.toString());
    }
}

// Create progress segments
function createProgressSegments() {
    const segmentsContainer = document.getElementById('progress-segments');
    if (segmentsContainer) {
        segmentsContainer.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            const segment = document.createElement('div');
            segment.className = 'progress-segment';
            segmentsContainer.appendChild(segment);
        }
    }
}

// Update progress bar visual
function updateProgressBar() {
    const progress = parseInt(localStorage.getItem('storyProgress') || '0');
    const percentage = (progress / totalPages) * 100;
    
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = percentage + '%';
    }
}

// Initialize progress on page load
document.addEventListener('DOMContentLoaded', function() {
    createProgressSegments();
    updateProgress();
    updateProgressBar();
});
