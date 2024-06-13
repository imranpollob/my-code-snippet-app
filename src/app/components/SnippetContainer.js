"use client";

import React, { useState, useEffect, useRef } from "react";
import GoogleAuthButton from "./GoogleAuthButton";
import SnippetForm from "./SnippetForm";
import SnippetsComponent from "./SnippetsComponent";
import Modal from "./Modal";
import { auth, db, onAuthStateChanged } from "../../../firebase";

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchSnippets(user.uid);
      } else {
        setUser(null);
        setSnippets([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const openModal = (snippet) => {
    setCurrentSnippet(snippet);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchSnippets = async (uid) => {
    setIsLoading(true);
    try {
      const snippetsCol = collection(db, "snippets");
      const q = query(snippetsCol, where("uid", "==", uid));
      const snapshot = await getDocs(q);
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
      const snippetWithUid = { ...newSnippet, uid: user.uid };
      const docRef = await addDoc(collection(db, "snippets"), snippetWithUid);
      const newSnippetWithId = { id: docRef.id, ...snippetWithUid };
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
      // closeModal();
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

  const typingTimeoutRef = useRef(null);

  const handleUpdateSnippet = (snippetId, updatedData) => {
    setCurrentSnippet(updatedData);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      updateSnippet(snippetId, updatedData);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

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
      <div className="top-bar">
        <div>
          <input
            className="search-input"
            type="text"
            placeholder="Search snippets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <GoogleAuthButton />
      </div>

      {user ? (
        <>
          <SnippetForm addSnippet={addSnippet} />

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
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
                      // onChange should call handleUpdateSnippet with the snippet id and updated data
                      onChange={(e) =>
                        handleUpdateSnippet(currentSnippet.id, {
                          ...currentSnippet,
                          title: e.target.value,
                        })
                      }
                    />
                    <textarea
                      className="big-display-card-textarea"
                      value={currentSnippet.data}
                      onChange={(e) =>
                        handleUpdateSnippet(currentSnippet.id, {
                          ...currentSnippet,
                          data: e.target.value,
                        })
                      }
                    />
                    <div className="big-display-card-buttons">
                      <div className="big-display-card-buttons-left">
                        <button
                          className="delete-button"
                          onClick={() => deleteSnippet(currentSnippet.id)}
                        >
                          Delete
                        </button>
                      </div>
                      <div className="big-display-card-buttons-right">
                        <button className="close-button" onClick={closeModal}>
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Modal>
            </>
          )}
        </>
      ) : (
        <p className="guest-message">Please log in to manage snippets.</p>
      )}
    </div>
  );
};

export default SnippetContainer;
