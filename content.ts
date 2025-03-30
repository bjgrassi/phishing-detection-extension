import 'style.css'

const warningDiv = document.createElement("div")
warningDiv.id = "warning-phishing-ext";
const warningParagraph = document.createElement("p");
warningParagraph.className = "warning-phishing-text";
warningParagraph.textContent = "Warning: The URL may be unsafe!";
warningDiv.appendChild(warningParagraph);
document.body.appendChild(warningDiv);

function scanLinksDOM() {
  if (chrome.runtime?.id) {
    document.querySelectorAll('a').forEach(PostUrlContent);
  }
}

async function PostUrlContent(link: HTMLAnchorElement) {
  if (link.dataset.phishingChecked) return

  try {
    const response = await chrome.runtime.sendMessage({
      action: "postUrl",
      url: link.href
    })
    
    if (response?.isPhishing) {
      markAsPhishing(link)
    }
    link.dataset.phishingChecked = "true"
  } catch (error) {
    console.error("Error checking URL:", error)
  }
}

function markAsPhishing(link: HTMLAnchorElement) {
  link.style.border = "2px solid #ff4444";
  link.style.borderRadius = "2px";

  link.addEventListener('mouseenter', (e) => {
    const target = e.target as HTMLElement;
    const linkRect = target.getBoundingClientRect();
    const warningRect = warningDiv.getBoundingClientRect();

    warningDiv.style.display = 'block';
    // Center horizontally and position above the link
    warningDiv.style.top = `${window.scrollY + linkRect.top - warningRect.height - 5}px`;
    warningDiv.style.left = `${window.scrollX + linkRect.left + linkRect.width/2}px`;
  });

  link.addEventListener('mouseleave', () => {
    warningDiv.style.display = 'none';
  });
}

// Monitor DOM changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      scanLinksDOM();
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });