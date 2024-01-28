"use client";

import React, { useState, useEffect } from "react";
import SnippetForm from "./SnippetForm";
import SnippetsComponent from "./SnippetsComponent";
import Modal from "./Modal";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const SnippetContainer = () => {
  const [snippets, setSnippets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchSnippets();
  }, []);

  const openModal = (snippet) => {
    setCurrentSnippet(snippet);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      const docRef = await addDoc(collection(db, "snippets"), newSnippet);
      const newSnippetWithId = { id: docRef.id, ...newSnippet };
      setSnippets([...snippets, newSnippetWithId]);
    } catch (error) {
      console.error("Error adding new snippet:", error);
    }
    setIsLoading(false);
  };

  const updateSnippet = async (snippetId, updatedData) => {
    const snippetRef = doc(db, "snippets", snippetId);
    try {
      await updateDoc(snippetRef, updatedData);
      setSnippets(
        snippets.map((snippet) =>
          snippet.id === snippetId ? { ...snippet, ...updatedData } : snippet
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating snippet:", error);
    }
  };

  const deleteSnippet = async (snippetId) => {
    const snippetRef = doc(db, "snippets", snippetId);
    try {
      await deleteDoc(snippetRef);
      setSnippets(snippets.filter((snippet) => snippet.id !== snippetId));
      closeModal();
    } catch (error) {
      console.error("Error deleting snippet:", error);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      // No additional action needed here if you're filtering
      // snippets directly in the render method.
    }
  };

  const filteredSnippets = searchQuery
    ? snippets.filter((snippet) => {
        const query = searchQuery.toLowerCase();
        return (
          snippet.title.toLowerCase().includes(query) ||
          snippet.data.toLowerCase().includes(query)
        );
      })
    : snippets;

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Search snippets..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
      />
      <SnippetForm addSnippet={addSnippet} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <React.Fragment>
          <SnippetsComponent
            snippets={filteredSnippets}
            onCardClick={openModal}
            searchQuery={searchQuery}
          />
          <Modal show={isModalOpen} onClose={closeModal}>
            {currentSnippet && (
              <div className="big-display-card">
                <input
                  className="big-display-card-title"
                  type="text"
                  value={currentSnippet.title}
                  onChange={(e) =>
                    setCurrentSnippet({
                      ...currentSnippet,
                      title: e.target.value,
                    })
                  }
                />
                <textarea
                  className="big-display-card-textarea"
                  value={currentSnippet.data}
                  onChange={(e) =>
                    setCurrentSnippet({
                      ...currentSnippet,
                      data: e.target.value,
                    })
                  }
                />
                <div className="big-display-card-buttons">
                  <div className="big-display-card-buttons-left">
                    <button className="close-button" onClick={closeModal}>
                      Close
                    </button>
                  </div>
                  <div className="big-display-card-buttons-right">
                    <button
                      className="update-button"
                      onClick={() =>
                        updateSnippet(currentSnippet.id, currentSnippet)
                      }
                    >
                      Update
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => deleteSnippet(currentSnippet.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </React.Fragment>
      )}
    </div>
  );
};

export default SnippetContainer;
