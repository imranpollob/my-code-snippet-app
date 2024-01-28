"use client";

import React, { useState, useRef } from "react";

const SnippetForm = ({ addSnippet }) => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSnippet({ title, data });
    setTitle("");
    setData("");
    adjustHeight(true);
  };

  const adjustHeight = (reset = false) => {
    if (reset) {
      textareaRef.current.style.height = null;
    } else {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="create-snippet-card">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          ref={textareaRef}
          rows={2}
          placeholder="Enter your snippet"
          value={data}
          onChange={(e) => setData(e.target.value)}
          autoFocus
          onInput={() => adjustHeight()}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SnippetForm;
