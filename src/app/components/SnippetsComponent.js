"use client";

import React, { useEffect, useState } from "react";
import { fetchSnippets } from "../../../firebase";

const SnippetsComponent = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSnippets().then((data) => {
      setSnippets(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="cards-container">
      {snippets.map((snippet) => (
        <div key={snippet.id} className="card">
          <h3>{snippet.title}</h3>
          <p>{snippet.data}</p>
        </div>
      ))}
    </div>
  );
};

export default SnippetsComponent;
