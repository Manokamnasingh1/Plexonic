import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const blocks = [
    { type: "text", label: "Text" },
    { type: "image", label: "Image" },
    { type: "button", label: "Button" },
    { type: "container", label: "Container" },
    { type: "divider", label: "Divider" },
    { type: "card", label: "Card" },
    { type: "list", label: "List" },
  ];

  return (
    <div className="sidebar">
      <div className="logo">🏠 MyWebsite</div>
      <ul className="sidebar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/editor/new">Editor</Link></li>
      </ul>

      {/* Blocks section */}
      <div className="blocks-section">
        <h3>Blocks</h3>
        <ul>
          {blocks.map(block => (
            <li key={block.type} draggable>
              {block.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}




