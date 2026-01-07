// Check and redirect Shorts URL
function checkAndRedirect() {
  const url = window.location.href;
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  
  if (shortsMatch) {
    const videoId = shortsMatch[1];
    const newUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.location.replace(newUrl);
  }
}

// Check on page load
checkAndRedirect();

// Listen for URL changes (YouTube SPA navigation)
let lastUrl = location.href;
new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    checkAndRedirect();
  }
}).observe(document, { subtree: true, childList: true });

// Listen for History API changes
const originalPushState = history.pushState;
history.pushState = function() {
  originalPushState.apply(this, arguments);
  checkAndRedirect();
};

const originalReplaceState = history.replaceState;
history.replaceState = function() {
  originalReplaceState.apply(this, arguments);
  checkAndRedirect();
};

window.addEventListener('popstate', checkAndRedirect);
