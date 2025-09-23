import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";

export default function PreviewPanel() {
  const { blocks } = useContext(PageContext);

  return (
    <div
      style={{
        flex: 1,
        minHeight: "80vh",
        border: "2px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        overflowY: "auto",
        backgroundColor: "#f9f9f9"
      }}
    >
      {blocks.map(block => (
        <div key={block.id} style={{ marginBottom: "10px" }}>
          {/* IMAGE */}
          {block.type === "image" && block.src && (
            block.link ? (
              <a href={block.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={block.src}
                  alt={block.alt || "image"}
                  style={{ width: block.width || "200px", height: block.height || "auto" }}
                />
              </a>
            ) : (
              <img
                src={block.src}
                alt={block.alt || "image"}
                style={{ width: block.width || "200px", height: block.height || "auto" }}
              />
            )
          )}

          {/* TEXT */}
          {block.type === "text" && (
            <p
              style={{
                fontSize: block.fontSize || "16px",
                color: block.color || "#000",
                textAlign: block.textAlign || "left",
                backgroundColor: block.backgroundColor || "#fff",
                padding: block.padding || "5px",
                margin: block.margin || "0px",
                whiteSpace: "pre-wrap"
              }}
            >
              {block.content || "Text block"}
            </p>
          )}

          {/* BUTTON */}
          {block.type === "button" && (
            <button style={{ padding: "8px 16px", margin: "5px 0" }}>
              {block.content || "Button"}
            </button>
          )}

          {/* LIST */}
          {block.type === "list" && (
            <ul>
              {(block.items || []).map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          )}

          {/* FORM */}
          {block.type === "form" && (
            <form>
              {(block.fields || []).map((field, i) =>
                field.type === "input" ? (
                  <input key={i} placeholder={field.label} style={{ display: "block", marginBottom: "5px" }} />
                ) : (
                  <textarea key={i} placeholder={field.label} style={{ display: "block", marginBottom: "5px" }} />
                )
              )}
              <button type="submit">Submit</button>
            </form>
          )}

          {/* DIVIDER */}
          {block.type === "divider" && <hr />}

          {/* CARD */}
          {block.type === "card" && (
            <div style={{ border: "1px solid #ccc", padding: "10px" }}>
              <p>{block.title || "Card Title"}</p>
              <p>{block.content || "Card Content"}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
