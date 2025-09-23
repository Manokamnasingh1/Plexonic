import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";
import Canvas from "../components/Canvas";
import ImageSettings from "../components/ImageSettings";
import PreviewPanel from "../components/PreviewPanel";

export default function Editor() {
  const { addBlock, addImage, undo, redo } = useContext(PageContext);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Canvas Area */}
      <Canvas />

      {/* Sidebar */}
      <div style={{ width: "250px" }}>
        <h4>Blocks</h4>
        <button onClick={() => addBlock({ type: "text", content: "New text" })}>
          Add Text
        </button>
        <button onClick={() => addBlock({ type: "button", content: "Click Me" })}>
          Add Button
        </button>
        <button onClick={() => addBlock({ type: "list", items: ["Item 1", "Item 2"] })}>
          Add List
        </button>
        <button onClick={() => addBlock({ type: "form" })}>Add Form</button>

        {/* Images */}
        <h4 style={{ marginTop: "20px" }}>Images</h4>
        <ImageSettings addImage={addImage} />

        {/* History */}
        <h4 style={{ marginTop: "20px" }}>History</h4>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>

      {/* Live Preview */}
      <div style={{ flex: 1 }}>
        <h3>Live Preview</h3>
        <PreviewPanel />
      </div>
    </div>
  );
}

