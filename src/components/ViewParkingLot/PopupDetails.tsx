import React from 'react';
import Modal from 'react-modal';

// Ensure the root element exists in your HTML file
Modal.setAppElement('#__next'); // Adjust this if your root element has a different ID

const PopupDetails = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Popup Details"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Chi tiết</h2>
      <button onClick={onRequestClose}>Đóng</button>
      {/* Nội dung modal */}
    </Modal>
  );
};

export default PopupDetails;