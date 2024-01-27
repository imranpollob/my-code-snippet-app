"use client";

import React, { useEffect, useState } from "react";

const SnippetsComponent = ({ snippets }) => {
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
