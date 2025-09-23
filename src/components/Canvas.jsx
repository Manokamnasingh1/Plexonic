import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";

export default function Canvas() {
  const { blocks, selectedBlockId, setSelectedBlockId, updateBlock, deleteBlock } = useContext(PageContext);

  // ---- List Handlers ----
  const handleListChange = (blockId, index, value) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    const newItems = [...(block.items || [])];
    newItems[index] = value;
    updateBlock(blockId, { items: newItems });
  };

  const handleAddListItem = (blockId) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    const newItems = [...(block.items || []), "New Item"];
    updateBlock(blockId, { items: newItems });
  };

  const handleRemoveListItem = (blockId, index) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    const newItems = [...(block.items || [])];
    newItems.splice(index, 1);
    updateBlock(blockId, { items: newItems });
  };

  // ---- Form Handlers ----
  const handleFormFieldChange = (blockId, index, value) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    const newFields = [...(block.fields || [])];
    newFields[index].label = value;
    updateBlock(blockId, { fields: newFields });
  };

  const handleAddFormField = (blockId, type = "input") => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    const newFields = [...(block.fields || []), { type, label: type === "input" ? "Input" : "Textarea" }];
    updateBlock(blockId, { fields: newFields });
  };

  const handleRemoveFormField = (blockId, index) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    const newFields = [...(block.fields || [])];
    newFields.splice(index, 1);
    updateBlock(blockId, { fields: newFields });
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        border: "2px dashed #ccc",
        padding: "20px",
        borderRadius: "8px",
        flex: 1
      }}
    >
      {blocks.length === 0 && <p>Drag blocks or add images here</p>}

      {blocks.map(block => (
        <div
          key={block.id}
          style={{
            marginBottom: "10px",
            border: selectedBlockId === block.id ? "2px solid blue" : "none",
            padding: "5px",
            position: "relative"
          }}
          onClick={() => setSelectedBlockId(block.id)}
        >
          {/* IMAGE block */}
          {block.type === "image" && (
            <div style={{ textAlign: "center" }}>
              {/* File Input */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const imageUrl = URL.createObjectURL(file);
                  updateBlock(block.id, { src: imageUrl });
                }}
                style={{ marginBottom: "5px" }}
              />

              {/* Alt text */}
              <input
                type="text"
                placeholder="Alt text"
                value={block.alt || ""}
                onChange={(e) => updateBlock(block.id, { alt: e.target.value })}
                style={{ width: "90%", marginBottom: "5px" }}
              />

              {/* Optional Link */}
              <input
                type="text"
                placeholder="Link (optional)"
                value={block.link || ""}
                onChange={(e) => updateBlock(block.id, { link: e.target.value })}
                style={{ width: "90%", marginBottom: "5px" }}
              />

              {/* Width & Height */}
              <input
                type="number"
                placeholder="Width"
                value={parseInt(block.width) || 200}
                onChange={(e) => updateBlock(block.id, { width: e.target.value + "px" })}
                style={{ width: "45%", marginRight: "5%" }}
              />
              <input
                type="number"
                placeholder="Height"
                value={parseInt(block.height) || 200}
                onChange={(e) => updateBlock(block.id, { height: e.target.value + "px" })}
                style={{ width: "45%" }}
              />

              {/* Preview Image */}
              {block.src && (
                block.link ? (
                  <a href={block.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={block.src}
                      alt={block.alt || "image"}
                      style={{ width: block.width, height: block.height, display: "block", marginTop: "5px" }}
                    />
                  </a>
                ) : (
                  <img
                    src={block.src}
                    alt={block.alt || "image"}
                    style={{ width: block.width, height: block.height, display: "block", marginTop: "5px" }}
                  />
                )
              )}

              <button onClick={() => deleteBlock(block.id)} style={{ marginTop: "5px" }}>❌ Cut Image</button>
            </div>
          )}

          {/* TEXT block */}
          {block.type === "text" && (
            <>
              <textarea
                value={block.content || ""}
                style={{
                  width: "100%",
                  fontSize: block.fontSize || "16px",
                  color: block.color || "#000",
                  backgroundColor: block.backgroundColor || "#fff",
                  textAlign: block.textAlign || "left",
                  padding: block.padding || "5px",
                  margin: block.margin || "0px",
                  resize: "vertical"
                }}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              />
              <button onClick={() => deleteBlock(block.id)}>❌ Cut Text</button>
            </>
          )}

          {/* BUTTON block */}
          {block.type === "button" && (
            <>
              <button style={{ padding: "8px 16px", margin: "5px 0" }}>
                {block.content || "Button"}
              </button>
              <button onClick={() => deleteBlock(block.id)}>❌ Cut Button</button>
            </>
          )}

          {/* LIST block */}
          {block.type === "list" && (
            <div>
              {(block.items || []).map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "5px" }}>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleListChange(block.id, i, e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button onClick={() => handleRemoveListItem(block.id, i)}>❌</button>
                </div>
              ))}
              <button onClick={() => handleAddListItem(block.id)}>+ Add Item</button>
              <button onClick={() => deleteBlock(block.id)} style={{ marginTop: "5px" }}>❌ Cut List</button>
            </div>
          )}

          {/* FORM block */}
          {block.type === "form" && (
            <div>
              {(block.fields || []).map((field, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "5px" }}>
                  {field.type === "input" ? (
                    <input
                      type="text"
                      placeholder={field.label}
                      value={field.label}
                      onChange={(e) => handleFormFieldChange(block.id, i, e.target.value)}
                      style={{ flex: 1 }}
                    />
                  ) : (
                    <textarea
                      placeholder={field.label}
                      value={field.label}
                      onChange={(e) => handleFormFieldChange(block.id, i, e.target.value)}
                      style={{ flex: 1 }}
                    />
                  )}
                  <button onClick={() => handleRemoveFormField(block.id, i)}>❌</button>
                </div>
              ))}
              <button onClick={() => handleAddFormField(block.id, "input")}>+ Add Input</button>
              <button onClick={() => handleAddFormField(block.id, "textarea")}>+ Add Textarea</button>
              <button style={{ marginTop: "5px" }}>Submit</button>
              <button onClick={() => deleteBlock(block.id)} style={{ marginTop: "5px" }}>❌ Cut Form</button>
            </div>
          )}

          {/* CARD block */}
          {block.type === "card" && (
            <div style={{ border: "1px solid #ccc", padding: "10px" }}>
              <input
                type="text"
                value={block.title || "Card Title"}
                onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                style={{ width: "100%", marginBottom: "5px" }}
              />
              <textarea
                value={block.content || "Card Content"}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                style={{ width: "100%", marginBottom: "5px" }}
              />
              <button onClick={() => deleteBlock(block.id)}>❌ Cut Card</button>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}








              
        

          







