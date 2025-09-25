// src/pages/Preview.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Preview.css';

export default function Preview() {
  const { pageId } = useParams();
  const [blocks, setBlocks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/pages/public/${pageId}`);
        const data = await res.json();
        setTitle(data.title || "");
        setBlocks(data.blocks || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [pageId]);

  if (loading) return <p>Loading preview...</p>;
  if (!blocks.length) return <p>No blocks to display.</p>;

  return (
    <div className="preview-container">
      <h1>{title}</h1>

      {blocks.map((block) => {
        switch (block.type) {
          case "text":
            return (
              <p
                key={block.id}
                style={{
                  fontSize: block.fontSize || "16px",
                  color: block.color || "#000",
                  textAlign: block.textAlign || "left",
                  backgroundColor: block.backgroundColor || "transparent",
                  padding: block.padding || "0px",
                  margin: block.margin || "0px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {block.content}
              </p>
            );

          case "image":
            return (
              <img
                key={block.id}
                src={block.src}
                alt={block.alt || ""}
                style={{
                  width: block.width || "300px",
                  height: block.height || "auto",
                  margin: block.margin || "10px 0",
                }}
              />
            );

          case "button":
            return (
              <button
                key={block.id}
                style={{
                  margin: "5px 0",
                  padding: "5px 10px",
                  backgroundColor: block.backgroundColor || "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: block.borderRadius || "4px",
                  cursor: "pointer",
                }}
                onClick={() => block.link && window.open(block.link, "_blank")}
              >
                {block.content || "Button"}
              </button>
            );

          case "list":
            return block.ordered ? (
              <ol key={block.id} style={{ margin: "10px 0", paddingLeft: "20px" }}>
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            ) : (
              <ul key={block.id} style={{ margin: "10px 0", paddingLeft: "20px" }}>
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );

          case "card":
            return (
              <div
                key={block.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "15px",
                  margin: "10px 0",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  maxWidth: "400px",
                }}
              >
                {block.title && <h4 style={{ margin: "5px 0" }}>{block.title}</h4>}
                {block.content && <p style={{ margin: "5px 0" }}>{block.content}</p>}
                {block.button && (
                  <button
                    onClick={() => block.button.link && window.open(block.button.link, "_blank")}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: block.button.color || "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {block.button.label || "Button"}
                  </button>
                )}
              </div>
            );

          case "form":
            return (
              <form
                key={block.id}
                style={{
                  border: "1px solid #aaa",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "6px",
                  maxWidth: "400px",
                }}
              >
                {block.fields.map((field, i) => {
                  if (field.type === "input") {
                    return (
                      <input
                        key={i}
                        placeholder={field.label}
                        style={{
                          display: "block",
                          marginBottom: "10px",
                          width: "100%",
                          padding: "5px",
                        }}
                      />
                    );
                  }
                  if (field.type === "textarea") {
                    return (
                      <textarea
                        key={i}
                        placeholder={field.label}
                        style={{
                          display: "block",
                          marginBottom: "10px",
                          width: "100%",
                          padding: "5px",
                        }}
                      />
                    );
                  }
                  return null;
                })}
                <button type="submit" style={{ padding: "5px 10px" }}>
                  Submit
                </button>
              </form>
            );

          // ✅ Divider block
          case "divider":
            return (
              <hr
                key={block.id}
                style={{
                  border: "none",
                  borderTop: "2px solid #ccc",
                  margin: "20px 0",
                  width: block.width || "100%",
                }}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}





