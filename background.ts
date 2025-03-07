// add on manifest json after ml model be finished:
// "background": {
//   "service_worker": "static/background/index.js"
// },


// chrome.webNavigation.onBeforeNavigate.addListener((details) => {
//   const url = details.url;
//   console.warn("backg", details)
//   checkPhishing(url).then((isPhishing) => {
//     if (isPhishing) {
//       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         if (tabs[0].id) {
//           chrome.tabs.sendMessage(tabs[0].id, { action: "phishingDetected", url });
//         }
//         chrome.notifications.create({
//           type: "basic",
//           iconUrl: "icon.png",
//           title: "Phishing Detected",
//           message: `The URL ${url} is suspected to be a phishing site.`,
//         });
//       });
//     }
//   });
// });

// async function checkPhishing(url: string): Promise<boolean> {
//   try {
//     const response = await fetch("https://dummyjson.com/postscheck", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ url }),
//     });

//     if (!response.ok) {
//       throw new Error(`API request failed with status ${response.status}`);
//     }

//     const data = await response.json();
//     return data.isPhishing;
//   } catch (error) {
//     console.error("Error checking phishing URL:", error);
//     return false; // Assume it's not phishing if there's an error
//   }
// }