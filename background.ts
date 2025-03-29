// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "postUrl") {
        console.warn("Background", request.url)
      postUrl(request.url).then(isPhishing => {
        sendResponse({ isPhishing })
      })
      return true // Required to use sendResponse asynchronously
    }
})

const postUrl = async (url: string): Promise<boolean> => {
    try {
      // REPLACE MOCK DATA
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: 'foo',
          body: 'bar',
          userId: 1,
        })
      });
      
      const data = await response.json()
      // REPLACE MOCK DATA
      return "https://clients.cowangroup.ca/clients/content/login/loginPwd.cfm" == url;
    } catch (error) {
      console.error("Phishing check failed:", error)
      return false
    }
  }