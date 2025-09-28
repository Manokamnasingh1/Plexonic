

import React, { useContext, useState, useEffect } from "react";
import { PageContext } from "../context/PageContext";
import Canvas from "../components/Canvas";
import PreviewPanel from "../components/PreviewPanel";
import "./Editor.css";

export default function Editor({ pageId }) {
  const { blocks, addBlock, undo, redo, setBlocks } = useContext(PageContext);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [publicLink, setPublicLink] = useState("");

  // Load existing page if editing
  useEffect(() => {
    const loadPage = async () => {
      if (!pageId) return;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`https://plexonicbackend-1.onrender.com/api/pages/${pageId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTitle(data.title || "");
        setBlocks && setBlocks(data.blocks || []);
      } catch (err) {
        console.error(err);
        alert("Failed to load page");
      }
    };
    loadPage();
  }, [pageId, setBlocks]);

  const handleSave = async () => {
    if (!title.trim()) return alert("Please enter a page title");

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://plexonicbackend-1.onrender.com/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, blocks, pageId }),
      });

      const data = await res.json();
      alert("Page saved successfully!");

      // Generate public link
      const link = `${window.location.origin}/preview/${data._id}`;
      setPublicLink(link);

    } catch (err) {
      console.error(err);
      alert("Error saving page");
    } finally {
      setSaving(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(publicLink);
    alert("Public link copied to clipboard!");
  };

  const openPreview = () => {
    if (!publicLink) return;
    window.open(publicLink, "_blank");
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* Canvas Area */}
      <Canvas />

      {/* Sidebar */}
      <div style={{ width: "250px" }}>
        <h3>Page Settings</h3>
        <input
          type="text"
          placeholder="Enter Page Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
        />
        <button
          onClick={handleSave}
          disabled={saving}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        >
          {saving ? "Saving..." : "Save Page"}
        </button>

        {publicLink && (
          <div style={{ marginTop: "10px", wordBreak: "break-all" }}>
            <p>📎 Public Link:</p>
            <a href={publicLink} target="_blank" rel="noopener noreferrer">{publicLink}</a>
            <div style={{ marginTop: "5px", display: "flex", gap: "5px" }}>
              <button onClick={copyLink} style={{ padding: "5px", flex: 1 }}>
                Copy Link
              </button>
              <button onClick={openPreview} style={{ padding: "5px", flex: 1 }}>
                Preview in New Tab
              </button>
            </div>
          </div>
        )}

        {/* History */}
        <h4 style={{ marginTop: "20px" }}>History</h4>
        <button onClick={undo} style={{ marginRight: "5px" }}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>

      {/* Live Preview */}
      <div style={{ flex: 1 }}>
        <h3>Live Preview</h3>
        <PreviewPanel blocks={blocks} />
      </div>
    </div>
  );
}

