// src/components/BlockSettings.jsx
import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";

export default function BlockSettings() {
  const { blocks, selectedBlockId, updateBlock } = useContext(PageContext);

  if (!selectedBlockId) return <div>Select a block to edit</div>;

  // Recursive function to find the block
  function findBlock(items, id) {
    for (let b of items) {
      if (b.id === id) return b;
      if (b.children) {
        const found = findBlock(b.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  const block = findBlock(blocks, selectedBlockId);
  if (!block) return <div>No block found</div>;

  return (
    <div
      className="settings-panel"
      style={{
        width: "280px",
        borderLeft: "1px solid #ccc",
        padding: "15px",
        overflowY: "auto",
        height: "100vh"
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>Block Settings</h3>

      {/* Text Block */}
      {block.type === "text" && (
        <>
          <label>Text Content</label>
          <textarea
            value={block.content || ""}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            rows={4}
          />
        </>
      )}

      {/* Image Block */}
      {/* Image Block */}
{block.type === "image" && (
  <>
    <label>Image URL</label>
    <input
      type="text"
      value={block.content || ""}
      onChange={(e) => updateBlock(block.id, { content: e.target.value })}
    />
    <label>Alt Text</label>
    <input
      type="text"
      value={block.alt || ""}
      onChange={(e) => updateBlock(block.id, { alt: e.target.value })}
    />
    <label>Width</label>
    <input
      type="text"
      value={block.width || ""}
      onChange={(e) => updateBlock(block.id, { width: e.target.value })}
    />
    <label>Height</label>
    <input
      type="text"
      value={block.height || ""}
      onChange={(e) => updateBlock(block.id, { height: e.target.value })}
    />
    <label>Link (optional)</label>
    <input
      type="text"
      value={block.link || ""}
      onChange={(e) => updateBlock(block.id, { link: e.target.value })}
    />
  </>
)}


      {/* Button Block */}
      {block.type === "button" && (
        <>
          <label>Button Label</label>
          <input
            type="text"
            value={block.content || ""}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
          />
          <label>Button Link</label>
          <input
            type="text"
            value={block.link || ""}
            onChange={(e) => updateBlock(block.id, { link: e.target.value })}
          />
        </>
      )}

      {/* Card Block */}
      {block.type === "card" && (
        <>
          <label>Card Title</label>
          <input
            type="text"
            value={block.title || ""}
            onChange={(e) => updateBlock(block.id, { title: e.target.value })}
          />
          <label>Card Content</label>
          <textarea
            value={block.content || ""}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            rows={3}
          />
        </>
      )}

      {/* List Block */}
      {block.type === "list" && (
        <>
          <label>List Items (comma separated)</label>
          <input
            type="text"
            value={(block.items || []).join(", ")}
            onChange={(e) =>
              updateBlock(block.id, {
                items: e.target.value.split(",").map((i) => i.trim())
              })
            }
          />
        </>
      )}

      {/* Form Block */}
      {block.type === "form" && (
        <p>This is a form block (custom fields can be added later).</p>
      )}

      {/* Divider Block */}
      {block.type === "divider" && (
        <p>Divider has no settings.</p>
      )}

      <hr style={{ margin: "15px 0" }} />
      <h4>Style Settings</h4>

      <label>Font Size</label>
      <input
        type="number"
        value={parseInt(block.fontSize) || ""}
        onChange={(e) =>
          updateBlock(block.id, { fontSize: e.target.value + "px" })
        }
      />

      <label>Text Color</label>
      <input
        type="color"
        value={block.color || "#000000"}
        onChange={(e) => updateBlock(block.id, { color: e.target.value })}
      />

      <label>Background</label>
      <input
        type="color"
        value={block.backgroundColor || "#ffffff"}
        onChange={(e) => updateBlock(block.id, { backgroundColor: e.target.value })}
      />

      <label>Text Align</label>
      <select
        value={block.textAlign || "left"}
        onChange={(e) => updateBlock(block.id, { textAlign: e.target.value })}
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>

      <label>Padding</label>
      <input
        type="text"
        value={block.padding || ""}
        onChange={(e) => updateBlock(block.id, { padding: e.target.value })}
      />

      <label>Margin</label>
      <input
        type="text"
        value={block.margin || ""}
        onChange={(e) => updateBlock(block.id, { margin: e.target.value })}
      />
    </div>
  );
}



