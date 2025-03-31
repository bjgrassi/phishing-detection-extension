const BASE_URL = 'https://17c6-99-235-211-164.ngrok-free.app/'

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
  let isPhishing = false
  try {
    const response = await fetch(BASE_URL + "model/1", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    });
    const data = await response.json()
    console.warn("response", response)
    console.warn("json", data)
    isPhishing = data['1'] === 1
    console.warn("isPhishing", isPhishing)
    return isPhishing
  } catch (error) {
    console.error("Phishing check failed:", error)
    return isPhishing
  }
}

// http://platform.clubpetnyc.com/
// https://www.google.ca/