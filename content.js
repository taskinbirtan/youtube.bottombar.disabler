function toggleYouTubeBottomBar(enable) {
    const bottomBars = document.querySelectorAll('.ytp-chrome-bottom');
    const topBars = document.querySelectorAll('.ytp-title');
    bottomBars.forEach(bar => {
        bar.style.display = enable ? 'none' : 'block';
    });
    topBars.forEach(bar => {
        bar.style.display = enable ? 'none' : 'block';
    });
}

window.addEventListener('load', () => {
    chrome.storage.sync.get(['bottomBarEnabled'], function (result) {
        if (result.bottomBarEnabled !== undefined) {
            console.log('Initial load bottomBarEnabled state:', result.bottomBarEnabled);
            toggleYouTubeBottomBar(result.bottomBarEnabled);
        }
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.bottomBarEnabled !== undefined) {
        console.log('Received message to toggle YouTube bottom bar:', request.bottomBarEnabled);
        toggleYouTubeBottomBar(request.bottomBarEnabled);
    }
});

