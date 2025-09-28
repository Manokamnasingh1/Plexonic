// src/pages/Page.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Page() {
  const { pageId } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`https://plexonicbackend-1.onrender.com/api/pages/${pageId}`);
        if (!res.ok) throw new Error("Page not found");
        const data = await res.json();
        setPage(data);
      } catch (err) {
        console.error(err);
        setPage(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [pageId]);

  if (loading) return <p>Loading...</p>;
  if (!page) return <p>Page not found!</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{page.title}</h1>
      {page.blocks.map((block) => {
        if (block.type === "text")
          return (
            <p
              key={block.id}
              style={{
                fontSize: block.fontSize || "16px",
                color: block.color || "#000",
                textAlign: block.textAlign || "left",
                backgroundColor: block.backgroundColor || "transparent",
                padding: block.padding || "0px",
                margin: block.margin || "0px",
                whiteSpace: "pre-wrap",
              }}
            >
              {block.content}
            </p>
          );
        if (block.type === "image")
          return (
            <img
              key={block.id}
              src={block.src}
              alt={block.alt || ""}
              style={{ width: block.width || "200px", height: block.height || "auto" }}
            />
          );
        if (block.type === "button")
          return (
            <button key={block.id} style={{ margin: "5px 0" }}>
              {block.content || "Button"}
            </button>
          );
        if (block.type === "list")
          return (
            <ul key={block.id}>
              {block.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        return null;
      })}
    </div>
  );
}

