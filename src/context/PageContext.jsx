import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [blocks, setBlocks] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const saveHistory = () => setHistory([...history, { blocks: [...blocks], images: [...images] }]);

  // Add block
  const addBlock = (block) => {
    saveHistory();
    const newBlock = { ...block, id: uuidv4() };
    setBlocks([...blocks, newBlock]);
  };

  // Update block
  const updateBlock = (id, newProps) => {
    saveHistory();
    setBlocks(blocks.map(b => (b.id === id ? { ...b, ...newProps } : b)));
  };

  // Delete block
  const deleteBlock = (id) => {
    saveHistory();
    setBlocks(blocks.filter(b => b.id !== id));
  };

  // Add image
// Add image as a block
const addImage = (img) => {
  saveHistory();
  const newBlock = { ...img, id: uuidv4() }; // treat image as a block
  setBlocks([...blocks, newBlock]);
};

  // Update image
  const updateImage = (id, newProps) => {
    saveHistory();
    setImages(images.map(img => (img.id === id ? { ...img, ...newProps } : img)));
  };

  // Undo / Redo
  const undo = () => {
    if (!history.length) return;
    const prev = history[history.length - 1];
    setFuture([{ blocks: [...blocks], images: [...images] }, ...future]);
    setBlocks(prev.blocks);
    setImages(prev.images);
    setHistory(history.slice(0, -1));
  };

  const redo = () => {
    if (!future.length) return;
    const next = future[0];
    setHistory([...history, { blocks: [...blocks], images: [...images] }]);
    setBlocks(next.blocks);
    setImages(next.images);
    setFuture(future.slice(1));
  };

  return (
    <PageContext.Provider
      value={{
        blocks,
        images,
        selectedBlockId,
        setSelectedBlockId,
        addBlock,
        updateBlock,
        deleteBlock,
        addImage,
        updateImage,
        undo,
        redo
      }}
    >
      {children}
    </PageContext.Provider>
  );
};





