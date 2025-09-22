// src/components/Canvas.jsx
import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";

export default function Canvas({ blocks, updateBlocks }) {
  const { selectedBlockId, setSelectedBlockId } = useContext(PageContext);

  return (
    <div
      className="canvas"
      style={{
        minHeight: "80vh",
        border: "2px dashed #ccc",
        padding: "20px",
        borderRadius: "8px",
        flex: 1
      }}
    >
      {blocks.length === 0 && <p>Drag blocks here to build your page</p>}

      {blocks.map((block, index) => (
        <div
          key={block.id}
          style={{
            marginBottom: "10px",
            border: selectedBlockId === block.id ? "2px solid blue" : "none",
            padding: "5px"
          }}
          onClick={() => setSelectedBlockId(block.id)}
        >
          {block.type === "text" && (
  <p
    style={{
      fontSize: block.fontSize,
      color: block.color,
      textAlign: block.textAlign,
      backgroundColor: block.backgroundColor,
      padding: block.padding,
      margin: block.margin,
    }}
  >
    {block.content || "Text block"}
  </p>
)}


          {block.type === "image" && (
            block.link ? (
              <a href={block.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={block.content || ""}
                  alt={block.alt || ""}
                  style={{ width: block.width, height: block.height }}
                />
              </a>
            ) : (
              <img
                src={block.content || ""}
                alt={block.alt || ""}
                style={{ width: block.width, height: block.height }}
              />
            )
          )}

          {block.type === "button" && <button>{block.content || "Button"}</button>}
          {block.type === "divider" && <hr />}
          {block.type === "card" && (
            <div style={{ border: "1px solid #ccc", padding: "10px" }}>
              <p>Card block</p>
            </div>
          )}
          {block.type === "list" && (
            <ul>
              {(block.items || ["Item 1", "Item 2"]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
          {block.type === "form" && (
            <form>
              <input placeholder="Input" />
              <textarea placeholder="Textarea" />
              <button>Submit</button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}


