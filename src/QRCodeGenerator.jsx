import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import "./QRCodeGenerator.css";

export default function QRCodeGenerator() {
  const [inputType, setInputType] = useState("text");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [qrValue, setQrValue] = useState("");
  const svgRef = useRef(null);

  const handleGenerate = () => {
    if (inputType === "text") {
      setQrValue(text);
    } else if (inputType === "url") {
      setQrValue(url);
    }
  };

  const handleDownload = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.onload = () => {
      canvas.width = 256;
      canvas.height = 256;
      ctx.drawImage(image, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qr-code.png";
      downloadLink.click();
    };
    image.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
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
          <QRCode
            ref={svgRef}
            id="qr-svg"
            value={qrValue}
            style={{ height: "256px", width: "256px" }}
          />
          <p>{qrValue}</p>
          <button type="button" onClick={handleDownload}>
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}
