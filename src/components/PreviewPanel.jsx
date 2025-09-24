import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";
import "./PreviewPanel.css";

export default function PreviewPanel() {
  const { blocks } = useContext(PageContext);

  return (
    <div className="preview-panel">
      {blocks.map((block) => (
        <div key={block.id} className="preview-block">
          {/* IMAGE */}
          {block.type === "image" && block.src && (
            block.link ? (
              <a href={block.link} target="_blank" rel="noopener noreferrer">
                <img src={block.src} alt={block.alt || "image"} />
              </a>
            ) : (
              <img src={block.src} alt={block.alt || "image"} />
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
              }}
            >
              {block.content || "Text block"}
            </p>
          )}

          {/* BUTTON */}
          {block.type === "button" && (
            <button>{block.content || "Button"}</button>
          )}

          {/* LIST */}
          {block.type === "list" && (
            <ul>
              {(block.items || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {/* FORM */}
          {block.type === "form" && (
            <form>
              {(block.fields || []).map((field, i) =>
                field.type === "input" ? (
                  <input key={i} placeholder={field.label} />
                ) : (
                  <textarea key={i} placeholder={field.label} />
                )
              )}
              <button type="submit">Submit</button>
            </form>
          )}

          {/* DIVIDER */}
          {block.type === "divider" && <hr />}

          {/* CARD */}
          {block.type === "card" && (
            <div className="card">
              <p className="card-title">{block.title || "Card Title"}</p>
              <p className="card-content">{block.content || "Card Content"}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

