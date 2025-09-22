import React, { useState, useEffect } from "react";

export default function ImageSettings({ block, updateBlock }) {
  const [content, setContent] = useState(block.content || "");
  const [alt, setAlt] = useState(block.alt || "");
  const [width, setWidth] = useState(block.width || "");
  const [height, setHeight] = useState(block.height || "");
  const [link, setLink] = useState(block.link || "");

  useEffect(() => {
    updateBlock(block.id, { content, alt, width, height, link });
  }, [content, alt, width, height, link]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <label>
        Image URL:
        <input type="text" value={content} onChange={e => setContent(e.target.value)} />
      </label>
      <label>
        Alt Text:
        <input type="text" value={alt} onChange={e => setAlt(e.target.value)} />
      </label>
      <label>
        Width (px or %):
        <input type="text" value={width} onChange={e => setWidth(e.target.value)} />
      </label>
      <label>
        Height (px or auto):
        <input type="text" value={height} onChange={e => setHeight(e.target.value)} />
      </label>
      <label>
        Link (optional):
        <input type="text" value={link} onChange={e => setLink(e.target.value)} />
      </label>
    </div>
  );
}

