// src/components/PreviewPanel.jsx
import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";

export default function PreviewPanel() {
  const { blocks } = useContext(PageContext);

  return (
    <div
      className="preview-panel"
      style={{
        flex: 1,
        minHeight: "80vh",
        border: "2px solid #007bff",
        padding: "20px",
        borderRadius: "8px",
        background: "#f9f9f9",
      }}
    >
      <h3>Live Preview</h3>
      {blocks.length === 0 && <p>No blocks added yet.</p>}
      {blocks.map((block, index) => {
        switch (block.type) {
          case "text":
            return <p key={index}>{block.content || "Text block"}</p>;
          case "image":
            return <img key={index} src={block.content || ""} alt="" style={{ maxWidth: "100%" }} />;
          case "button":
            return <button key={index}>{block.content || "Button"}</button>;
          case "container":
            return <div key={index} style={{ border: "1px solid #ccc", padding: "10px" }}>Container</div>;
          case "divider":
            return <hr key={index} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
