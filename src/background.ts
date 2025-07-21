chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const tabId = msg.tabId ?? sender.tab?.id;
  if (!tabId) {
    console.warn("Could not determine tabId for the message:", msg);
    return;
  }

  chrome.tabs.sendMessage(tabId, msg, (rsp) => sendResponse(rsp));
  return true;
});
