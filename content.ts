import 'style.css'

const warningDiv = document.createElement("div")
warningDiv.id = "warning-phishing-ext";
const warningParagraph = document.createElement("p");
warningParagraph.className = "warning-phishing-text";
warningParagraph.textContent = "Warning: The URL may be unsafe!";
warningDiv.appendChild(warningParagraph);
document.body.appendChild(warningDiv);

function isPhishingUrl(url: string): boolean {
  const phishingKeywords = ["login", "account", "verify", "password", "órama"];
  return phishingKeywords.some((keyword) => url.toLowerCase().includes(keyword));
}

function scanDOM() {
  if (chrome.runtime?.id) {
    document.querySelectorAll('a').forEach(link => {
      const linkText = link.innerText;
      console.log(link.innerText);
      console.log("Found link:", link?.baseURI);

      if (linkText && isPhishingUrl(linkText)) {
        link.style.border = "2px solid #ff4444";

        link.addEventListener('mouseenter', (e) => {
          const target = e.target as HTMLElement;
          const linkRect = target.getBoundingClientRect();
          warningDiv.style.display = 'block';
          warningDiv.style.top = `${linkRect.top - warningDiv.offsetHeight - 5}px`;
          warningDiv.style.left = `${linkRect.left}px`;
        });
        
        link.addEventListener('mouseleave', () => {
          warningDiv.style.display = 'none';
        });
      }
    });
  }
}

// Monitor DOM changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      scanDOM();
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });