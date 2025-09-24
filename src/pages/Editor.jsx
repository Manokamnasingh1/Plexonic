import React, { useContext, useState, useEffect } from "react";
import { PageContext } from "../context/PageContext";
import Canvas from "../components/Canvas";
import PreviewPanel from "../components/PreviewPanel";

export default function Editor({ pageId }) {
  const { blocks, addBlock, undo, redo } = useContext(PageContext);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);

  // Load existing page if editing
  useEffect(() => {
    const loadPage = async () => {
      if (!pageId) return;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/pages/${pageId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTitle(data.title || "");
        // You might need a setBlocks function in your PageContext
        // to set blocks loaded from backend
      } catch (err) {
        console.error(err);
        alert("Failed to load page");
      }
    };
    loadPage();
  }, [pageId]);

 const handleSave = async () => {
  setSaving(true);
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, blocks, pageId }),
    });

    const data = await res.json();
    alert("Page saved successfully!");
    console.log(data);

    // ---- ADD PUBLIC LINK HERE ----
    const publicLink = `${window.location.origin}/page/${data._id}`;
    alert(`Public link: ${publicLink}`);
    console.log("Public link:", publicLink);

  } catch (err) {
    console.error(err);
    alert("Error saving page");
  }
  setSaving(false);
};


  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Canvas Area */}
      <Canvas />

      {/* Sidebar */}
      <div style={{ width: "250px" }}>
        
        <h3>To save</h3>
        {/* Save Button */}
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Page Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
          />
          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Page"}
          </button>
        </div>

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


