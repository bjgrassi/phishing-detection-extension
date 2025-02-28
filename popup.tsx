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
    <div
      style={{
        padding: 16,
        fontFamily: "Arial, sans-serif",
        width: 300,
      }}>
      <h2 style={{ marginBottom: 16 }}>Phishing Detection</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          placeholder="Enter URL to check"
        />
        <button
          style={{ width: "100%", padding: 8, backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: 4 }}
          onClick={checkUrl}
        >
          Check URL
        </button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Status:</strong> {status}
      </div>
      {threats.length > 0 && (
        <div>
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