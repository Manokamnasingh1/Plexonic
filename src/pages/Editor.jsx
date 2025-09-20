
import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";
import Canvas from "../components/Canvas";

export default function Editor() {
  const { blocks, addBlock } = useContext(PageContext);

  const handleDrop = (type) => {
    addBlock({ type, content: "" });
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Canvas blocks={blocks} updateBlocks={blocks => console.log(blocks)} />

      {/* Quick block buttons for demo */}
      <div style={{ marginLeft: "20px" }}>
        <h3>Add Block</h3>
        <button onClick={() => handleDrop("text")}>Text</button>
        <button onClick={() => handleDrop("image")}>Image</button>
        <button onClick={() => handleDrop("button")}>Button</button>
        <button onClick={() => handleDrop("container")}>Container</button>
        <button onClick={() => handleDrop("divider")}>Divider</button>
      </div>
    </div>
  );
}
