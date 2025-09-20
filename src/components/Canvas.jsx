

import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";

export default function Canvas({ blocks, updateBlocks }) {
  return (
    <div
      className="canvas"
      style={{
        minHeight: "80vh",
        border: "2px dashed #ccc",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      {blocks.length === 0 && <p>Drag blocks here to build your page</p>}

      {blocks.map((block, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          {block.type === "text" && <p>{block.content || "Text block"}</p>}
          {block.type === "image" && <img src={block.content || ""} alt="" style={{ maxWidth: "100%" }} />}
          {block.type === "button" && <button>{block.content || "Button"}</button>}
          {block.type === "container" && <div style={{ border: "1px solid #ccc", padding: "10px" }}>Container</div>}
          {block.type === "divider" && <hr />}
        </div>
      ))}
    </div>
  );
}
