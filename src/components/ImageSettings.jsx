import React, { useState } from "react";

export default function ImageSettings({ addImage }) {
  const [file, setFile] = useState(null);
  const [alt, setAlt] = useState("");
  const [width, setWidth] = useState("200");
  const [height, setHeight] = useState("200");
  const [link, setLink] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSave = () => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      addImage({
        type: "image",
        src: imageUrl,
        alt,
        width: width + "px",
        height: height + "px",
        link: link || null,
      });
      setFile(null);
      setAlt("");
      setWidth("200");
      setHeight("200");
      setLink("");
      setVisible(false);
    }
  };

  return (
    <div>
      {!visible && <button onClick={() => setVisible(true)}>➕ Add Image</button>}

      {visible && (
        <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          <input
            type="text"
            placeholder="Alt text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
          />
          <input
            type="text"
            placeholder="Link (optional)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <input
            type="number"
            placeholder="Width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <input
            type="number"
            placeholder="Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <div style={{ marginTop: "8px" }}>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setVisible(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}






