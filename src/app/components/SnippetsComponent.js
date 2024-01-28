"use client";

import React, { useState } from "react";

const SnippetsComponent = ({ snippets, onCardClick, searchQuery }) => {
  const truncateText = (text, wordLimit) => {
    const words = text.split(/\s+/);
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="cards-container">
      {snippets.map((snippet) => (
        <div
          key={snippet.id}
          className="card"
          onClick={() => onCardClick(snippet)}
        >
          <h3>{highlightMatch(snippet.title, searchQuery)}</h3>
          <p>{highlightMatch(truncateText(snippet.data, 50), searchQuery)}</p>
        </div>
      ))}
    </div>
  );
};

export default SnippetsComponent;
