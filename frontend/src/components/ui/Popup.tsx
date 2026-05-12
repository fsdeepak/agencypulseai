"use client";
import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function HomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <Popup open={isOpen} closeOnDocumentClick onClose={closeModal} modal>
        <div style={styles.modal}>
          <button style={styles.close} onClick={closeModal}>
            &times;
          </button>
          <div style={styles.content}>
            <p>Please click on the link to start the backend server</p>

            <a
              href="https://agencypulseai.onrender.com/api/health"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.linkButton}
            >
              Start Backend Server
            </a>
          </div>
        </div>
      </Popup>
    </div>
  );
}

const styles = {
  modal: {
    fontSize: "16px",
    padding: "20px",
    textAlign: "center",
    background: "#111130",
    color: "white",
  },
  close: {
    cursor: "pointer",
    position: "absolute",
    display: "block",
    padding: "2px 5px",
    lineHeight: "20px",
    right: "-10px",
    top: "-10px",
    fontSize: "24px",
    background: "#111130",
    color: "white",
    borderRadius: "11px",
  },
  content: {
    width: "100%",
    padding: "10px 5px",
    color: "white",
  },
  linkButton: {
    display: "inline-block",
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#111855",
    color: "white",
    textDecoration: "none",
    borderRadius: "10px",
    fontWeight: "bold",
  },
};
export default HomePopup;
