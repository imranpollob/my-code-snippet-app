"use client";

import React, { useState } from "react";

const SnippetForm = ({ addSnippet }) => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSnippet({ title, data });
    setTitle("");
    setData("");
  };

  return (
    <div className="create-snippet-card">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title Enter your code here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter your code here..."
          value={data}
          onChange={(e) => setData(e.target.value)}
          autoFocus
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SnippetForm;
