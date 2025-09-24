
// src/components/Sidebar.jsx
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { PageContext } from "../context/PageContext";
import "./Sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { addBlock } = useContext(PageContext);

  const blocks = [
    { type: "text", label: "Text" },
    { type: "image", label: "Image" },
    { type: "button", label: "Button" },
    { type: "divider", label: "Divider" },
    { type: "card", label: "Card" },
    { type: "list", label: "List" },
    { type: "form", label: "Form" },
  ];

  return (
    <>
      {/* Sidebar toggle button */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 1100,
          background: "#007bff",
          color: "#fff",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ☰
      </button>

      {/* Sidebar panel */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo">MyWebsite</div>

        {/* Navigation links */}
        <ul className="sidebar-links">
          <li>
            <Link to="/editor/new">Editor</Link>
          </li>
          
        </ul>

        {/* Blocks section */}
        <div className="blocks-section">
        
          <ul>
            {blocks.map((block) => (
              <li
                key={block.type}
                draggable
                onClick={() => addBlock({ type: block.type, content: "" })}
                onDragStart={(e) => {
                  e.dataTransfer.setData("blockType", block.type);
                }}
                style={{ cursor: "pointer" }}
              >
                {block.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar footer: Logout + Profile */}
        <div className="sidebar-footer">
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>

          
        </div>
      </div>
    </>
  );
}





