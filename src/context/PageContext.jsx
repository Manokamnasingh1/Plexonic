// src/context/PageContext.jsx
import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const addBlock = (block) => {
    let newBlock = { ...block, id: uuidv4(), children: [] };

    // Add defaults for image block
    if (block.type === "image") {
      newBlock = {
        ...newBlock,
        content: "",
        alt: "",
        width: "100%",
        height: "auto",
        link: ""
      };
    }

    setHistory([...history, blocks]);
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id, newProps) => {
    setHistory([...history, blocks]);
    setBlocks(blocks.map(b => (b.id === id ? { ...b, ...newProps } : b)));
  };

  const deleteBlock = (id) => {
    setHistory([...history, blocks]);
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const undo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setFuture([blocks, ...future]);
    setBlocks(prev);
    setHistory(history.slice(0, -1));
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setHistory([...history, blocks]);
    setBlocks(next);
    setFuture(future.slice(1));
  };

  return (
    <PageContext.Provider
      value={{
        blocks,
        addBlock,
        updateBlock,
        deleteBlock,
        selectedBlockId,
        setSelectedBlockId,
        undo,
        redo,
        setBlocks
      }}
    >
      {children}
    </PageContext.Provider>
  );
};


