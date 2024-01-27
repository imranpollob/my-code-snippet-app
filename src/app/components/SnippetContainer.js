"use client";

import React, { useState, useEffect } from "react";
import SnippetForm from "./SnippetForm";
import SnippetsComponent from "./SnippetsComponent";
import { db } from "../../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const SnippetContainer = () => {
  const [snippets, setSnippets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    setIsLoading(true);
    try {
      const snippetsCol = collection(db, "snippets");
      const snapshot = await getDocs(snippetsCol);
      const snippetsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSnippets(snippetsList);
    } catch (error) {
      console.error("Error fetching snippets:", error);
    }
    setIsLoading(false);
  };

  const addSnippet = async (newSnippet) => {
    if (!newSnippet.title && !newSnippet.data) return;
    setIsLoading(true);
    try {
      await addDoc(collection(db, "snippets"), newSnippet);
      await fetchSnippets(); // Refresh the snippets list
    } catch (error) {
      console.error("Error adding new snippet:", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <SnippetForm addSnippet={addSnippet} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <SnippetsComponent snippets={snippets} />
      )}
    </div>
  );
};

export default SnippetContainer;
