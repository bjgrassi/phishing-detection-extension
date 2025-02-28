function isPhishingUrl(url: string): boolean {
  const phishingKeywords = ["login", "account", "verify", "password", "órama"];
  return phishingKeywords.some((keyword) => url.toLowerCase().includes(keyword));
}

function scanDOM() {
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    const linkText = link.innerText;
    console.log(link.innerText)
    console.warn("Found link:", link.baseURI);

    if (linkText && isPhishingUrl(linkText)) {
      link.style.border = "2px solid red";

      // const warning = document.createElement("p");
      // warning.style.color = "red";
      // warning.innerText = `Warning: The URL ${link} may be unsafe!`;
      // link.appendChild(warning);
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  console.warn("DOMContentLoaded event fired!");
  scanDOM();
});

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      scanDOM();
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });