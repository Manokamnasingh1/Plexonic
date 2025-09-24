// src/components/TextBlockEditor.jsx
import React from "react";
import "./TextBlockEditor.css";

export default function TextBlockEditor({ block, updateBlock, deleteBlock }) {
  if (block.type !== "text") return null;

  return (
    <div className="text-block-editor">
      <textarea
        value={block.content || ""}
        style={{
          width: "100%",
          fontSize: block.fontSize || "16px",
          backgroundColor: block.backgroundColor || "#fff",
          textAlign: block.textAlign || "left",
          padding: block.padding || "5px",
          margin: block.margin || "0px",
          resize: "vertical",
        }}
        onChange={(e) =>
          updateBlock(block.id, { content: e.target.value })
        }
      />

      <div className="controls">
        <label>
          Font Size:
          <input
            type="number"
            value={block.fontSize || 16}
            onChange={(e) =>
              updateBlock(block.id, { fontSize: `${e.target.value}px` })
            }
          />
        </label>

        <label>
          Alignment:
          <select
            value={block.textAlign || "left"}
            onChange={(e) =>
              updateBlock(block.id, { textAlign: e.target.value })
            }
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </label>

        <label>
          Padding:
          <input
            type="text"
            value={block.padding || "5px"}
            onChange={(e) =>
              updateBlock(block.id, { padding: e.target.value })
            }
          />
        </label>

        <label>
          Margin:
          <input
            type="text"
            value={block.margin || "0px"}
            onChange={(e) =>
              updateBlock(block.id, { margin: e.target.value })
            }
          />
        </label>
      </div>

      <button onClick={() => deleteBlock(block.id)}>❌ Cut Text</button>
    </div>
  );
}



