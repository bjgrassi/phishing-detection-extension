chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const url = details.url;
  checkPhishing(url).then((isPhishing) => {
    if (isPhishing) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "phishingDetected", url });
        }
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon.png",
          title: "Phishing Detected",
          message: `The URL ${url} is suspected to be a phishing site.`,
        });
      });
    }
  });
});

async function checkPhishing(url: string): Promise<boolean> {
  // Replace with your actual phishing detection API endpoint
  const response = await fetch("https://your-phishing-detection-api.com/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();
  return data.isPhishing;
}