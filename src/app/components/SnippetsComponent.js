"use client";

import React, { useState } from "react";

const SnippetsComponent = ({ snippets, onCardClick }) => {
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
          onClick={() => onCardClick(snippet)}
        >
          <h3>{snippet.title}</h3>
          <p>{truncateText(snippet.data, 100)}</p>
        </div>
      ))}
    </div>
  );
};

export default SnippetsComponent;
