import 'style.css'

import { useState } from "react";

function IndexPopup() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("Idle"); // 'Idle', 'Checking', 'Safe', 'Unsafe'
  const [threats, setThreats] = useState<string[]>([]);

  const checkUrl = async () => {
    setStatus("Checking");
    // Simulate a network request to check the URL
    setTimeout(() => {
      const isSafe = Math.random() > 0.5; // Randomly determine if the URL is safe
      if (isSafe) {
        setStatus("Safe");
      } else {
        setStatus("Unsafe");
        setThreats([...threats, url]); // Add the URL to the threats list
      }
    }, 1000);
  };

  return (
    <div className="popup-container">
      <h2 className="popup-title">Phishing Detection</h2>
      <div className="input-section">
        <input
          className="url-input"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          placeholder="Enter URL to check"
        />
        <button
          className="check-button"
          onClick={checkUrl}
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