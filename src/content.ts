chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === "DO_SOMETHING") {
    // Example: count <div> nodes
    const totalDivs = document.querySelectorAll("div").length;
    sendResponse({ totalDivs });
  }
  if (msg.type === "COUNT_IMAGES") {
    // Count images on the page
    const totalImages = document.querySelectorAll("img").length;
    sendResponse({ total: totalImages });
  }
});
