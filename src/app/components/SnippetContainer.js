"use client";

import React, { useState, useEffect } from "react";
import SnippetForm from "./SnippetForm";
import SnippetsComponent from "./SnippetsComponent";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

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
      await fetchSnippets();
    } catch (error) {
      console.error("Error adding new snippet:", error);
    }
    setIsLoading(false);
  };

  const updateSnippet = async (snippetId, updatedData) => {
    const snippetRef = doc(db, "snippets", snippetId);
    try {
      await updateDoc(snippetRef, updatedData);
      console.log("Snippet successfully updated!");
      await fetchSnippets();
    } catch (error) {
      console.error("Error updating snippet:", error);
    }
  };

  const deleteSnippet = async (snippetId) => {
    const snippetRef = doc(db, "snippets", snippetId);
    try {
      await deleteDoc(snippetRef);
      console.log("Snippet successfully deleted!");
      await fetchSnippets();
    } catch (error) {
      console.error("Error deleting snippet:", error);
    }
  };

  return (
    <div>
      <SnippetForm addSnippet={addSnippet} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <SnippetsComponent
          snippets={snippets}
          updateSnippet={updateSnippet}
          deleteSnippet={deleteSnippet}
        />
      )}
    </div>
  );
};

export default SnippetContainer;
