// src/pages/Editor.jsx
import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";
import Canvas from "../components/Canvas";
import ImageSettings from "../components/ImageSettings";
import PreviewPanel from "../components/PreviewPanel";

export default function Editor() {
  const {
    blocks,
    addBlock,
    updateBlock,
    selectedBlockId,
    setSelectedBlockId,
    undo,
    redo
  } = useContext(PageContext);

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  const handleDrop = (type) => {
    addBlock({ type, content: "" });
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Canvas blocks={blocks} updateBlocks={updateBlock} />

      <div style={{ width: "250px" }}>
        <div style={{ marginTop: "20px" }}>
          <button onClick={undo}>Undo</button>
          <button onClick={redo}>Redo</button>
        </div>

        {selectedBlock && selectedBlock.type === "image" && (
          <div style={{ marginTop: "20px" }}>
            <h4>Image Settings</h4>
            <ImageSettings
              block={selectedBlock}
              updateBlock={(props) => updateBlock(selectedBlockId, props)}
            />
          </div>
        )}
        
      </div>
    </div>
  );
}
