import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PreviewPanel from "../components/PreviewPanel";

export default function Preview() {
  const { pageId } = useParams();
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/pages/public/${pageId}`);
        const data = await res.json();
        setBlocks(data.blocks || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPage();
  }, [pageId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Page Preview</h2>
      <PreviewPanel blocks={blocks} />
    </div>
  );
}



