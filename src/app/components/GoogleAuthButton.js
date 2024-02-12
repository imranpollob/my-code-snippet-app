"use client";

import React, { useState, useEffect } from "react";
import {
  auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "../../../firebase";

const GoogleAuthButton = () => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error during Google Sign In", error);
    }
  };

  const signOutFromGoogle = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during Google Sign Out", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="auth-container">
      {user ? (
        <img
          src={user.photoURL}
          alt="Profile"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      ) : (
        <img
          src="/robot-avatar.jpg"
          alt="Guest"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      )}
      <button
        className="hover-button"
        onClick={user ? signOutFromGoogle : signInWithGoogle}
      >
        {user ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default GoogleAuthButton;
