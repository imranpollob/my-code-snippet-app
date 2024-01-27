"use client";

import React, { useState } from "react";

const SnippetsComponent = ({ snippets, updateSnippet, deleteSnippet }) => {
  const [editId, setEditId] = useState(null);
  const [editedSnippet, setEditedSnippet] = useState({ title: "", data: "" });

  const handleCardClick = (snippet) => {
    setEditId(snippet.id);
    setEditedSnippet({ title: snippet.title, data: snippet.data });
  };

  const handleChange = (e) => {
    setEditedSnippet({ ...editedSnippet, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateSnippet(editId, editedSnippet);
    setEditId(null); // Exit edit mode
  };

  const truncateText = (text, wordLimit = 100) => {
    const words = text.split(/\s+/);
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="cards-container">
      {snippets.map((snippet) => (
        <div
          key={snippet.id}
          className="card"
          onClick={() => handleCardClick(snippet)}
        >
          {editId === snippet.id ? (
            <div>
              <input
                name="title"
                value={editedSnippet.title}
                onChange={handleChange}
              />
              <textarea
                name="data"
                value={editedSnippet.data}
                onChange={handleChange}
              />
              <button onClick={handleSave}>Update</button>
              <button onClick={() => deleteSnippet(snippet.id)}>Delete</button>
            </div>
          ) : (
            <>
              <h3>{snippet.title}</h3>
              <p>{truncateText(snippet.data, 100)}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SnippetsComponent;
