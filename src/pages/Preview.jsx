// src/pages/Preview.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Preview() {
  const { pageId } = useParams();
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    // fetch saved page structure from backend
    fetch(`/api/pages/${pageId}`)
      .then(res => res.json())
      .then(data => setBlocks(data.blocks));
  }, [pageId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Preview Page</h2>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "text": return <p key={i}>{block.content}</p>;
          case "image": return <img key={i} src={block.content} alt="" />;
          case "button": return <button key={i}>{block.content}</button>;
          case "container": return <div key={i} style={{ border: "1px solid #ccc", padding: "10px" }}>Container</div>;
          case "divider": return <hr key={i} />;
          default: return null;
        }
      })}
    </div>
  );
}


