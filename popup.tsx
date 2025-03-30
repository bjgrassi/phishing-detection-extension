import 'style.css'

import { useState } from "react";

function IndexPopup() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("Idle"); // 'Idle', 'Checking', 'Safe', 'Unsafe'
  const [threats, setThreats] = useState<string[]>([]);

  const PostUrlPopup = async () => {
    if (!url) return;
    
    setStatus("Checking");
    
    try {
      // Send message to background script
      const response = await chrome.runtime.sendMessage({
        action: "postUrl",
        url: url
      });
      
      if (response.isPhishing) {
        setStatus("Unsafe");
        setThreats([...threats, url]);
      } else {
        setStatus("Safe");
      }
    } catch (error) {
      console.error("Error checking URL:", error);
      setStatus("Error");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && status !== "Checking") {
      PostUrlPopup();
    }
  };

  return (
    <div className="popup-container">
      <h2 className="popup-title">Phishing Detection</h2>
      <div className="input-section">
        <input
          className="url-input"
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          value={url}
          placeholder="Enter URL to check"
        />
        <button
          className={`check-button ${status === "Checking" ? "disabled" : ""}`}
          onClick={PostUrlPopup}
          disabled={status === "Checking"}
        >
          Check URL
        </button>
      </div>
      <div className="status-section">
        <strong>Status:</strong> {status}
      </div>
      {threats.length > 0 && (
        <div className="threats-section">
          <strong>Detected Threats:</strong>
          <ul>
            {threats.map((threat, index) => (
              <li key={index}>{threat}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default IndexPopup;