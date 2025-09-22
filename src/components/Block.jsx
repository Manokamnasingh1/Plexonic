import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";


export default function Block({ block }) {
  const { selectedBlockId, setSelectedBlockId, updateBlock } = useContext(PageContext);

  const handleChange = (e) => {
    updateBlock(block.id, { content: e.target.value });
  };

  const isSelected = selectedBlockId === block.id;

  switch (block.type) {
    case "text":
      return (
        <textarea
          className={`block textarea ${isSelected ? "selected" : ""}`}
          value={block.content || ""}
          onChange={handleChange}
          onClick={() => setSelectedBlockId(block.id)}
        />
      );

    case "image":
      return (
        <img
          className={`block image ${isSelected ? "selected" : ""}`}
          src={block.content || "https://via.placeholder.com/150"}
          alt=""
          onClick={() => setSelectedBlockId(block.id)}
        />
      );

    case "button":
      return (
        <button
          className={`block button ${isSelected ? "selected" : ""}`}
          onClick={() => setSelectedBlockId(block.id)}
        >
          {block.content || "Button"}
        </button>
      );

    case "container":
      return (
        <div
          className={`block container ${isSelected ? "selected" : ""}`}
          onClick={() => setSelectedBlockId(block.id)}
        >
          Container
        </div>
      );

    case "divider":
      return <hr className="block divider" />;

    default:
      return null;
  }
}



