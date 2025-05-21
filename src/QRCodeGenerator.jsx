import { useState } from "react";
import QRCode from "react-qr-code";
import "./QRCodeGenerator.css";

export default function QRCodeGenerator() {
  const [inputType, setInputType] = useState("text");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [qrValue, setQrValue] = useState("");

  const handleGenerate = () => {
    if (inputType === "text") {
      setQrValue(text);
    } else if (inputType === "url") {
      setQrValue(url);
    }
  };

  return (
    <div className="container">
      <h1>QR Code Generator</h1>

      <div className="button-group">
        <button
          type="button"
          onClick={() => setInputType("text")}
          className={inputType === "text" ? "active" : ""}
        >
          Text
        </button>
        <button
          type="button"
          onClick={() => setInputType("url")}
          className={inputType === "url" ? "active" : ""}
        >
          Image URL
        </button>
      </div>

      {inputType === "text" && (
        <input
          type="text"
          placeholder="Enter text to encode"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}

      {inputType === "url" && (
        <input
          type="url"
          placeholder="Enter image URL to encode"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      )}

      <button type="button" className="generate" onClick={handleGenerate}>
        Generate QR Code
      </button>

      {qrValue && (
        <div className="qr-result">
          <QRCode id="qr-svg" value={qrValue} style={{ height: "256px", width: "256px" }} />
          <p>{qrValue}</p>
        </div>
      )}
    </div>
  );
}
