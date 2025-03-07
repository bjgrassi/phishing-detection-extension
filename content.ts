import 'style.css'

const warningDiv = document.createElement("div")
warningDiv.id = "warning-phishing-ext";
const warningParagraph = document.createElement("p");
warningParagraph.className = "warning-phishing-text";
warningParagraph.textContent = "Warning: The URL may be unsafe!";
warningDiv.appendChild(warningParagraph);

function addListener(link) {
  link.addEventListener("mouseover", () => {
    console.log("Mouseover detected on link:", link.href);
  }, {
    passive: true,
    once: true,
  });
}

function isPhishingUrl(url: string): boolean {
  const phishingKeywords = ["login", "account", "verify", "password", "órama"];
  return phishingKeywords.some((keyword) => url.toLowerCase().includes(keyword));
}

function scanDOM() {
  if (chrome.runtime?.id) {
    const links = document.querySelectorAll("a");

    links.forEach((link) => {
      const linkText = link.innerText;
      console.log(link.innerText);
      console.log("Found link:", link?.baseURI);

      if (linkText && isPhishingUrl(linkText)) {
        link.style.border = "2px solid red";
        link.addEventListener('mouseover', function (event) {
            event.preventDefault();
            link.parentNode.appendChild(warningDiv);
        }, false);
        addListener(link);
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