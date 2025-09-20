import { createContext, useState } from "react";

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [blocks, setBlocks] = useState([]);

  const addBlock = (block) => setBlocks([...blocks, block]);
  const updateBlock = (index, newBlock) => {
    const updated = [...blocks];
    updated[index] = newBlock;
    setBlocks(updated);
  };

  return (
    <PageContext.Provider value={{ blocks, addBlock, updateBlock, setBlocks }}>
      {children}
    </PageContext.Provider>
  );
};
