chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "phishingDetected") {
      alert(`Warning: The URL ${message.url} is suspected to be a phishing site.`);
    }
  });