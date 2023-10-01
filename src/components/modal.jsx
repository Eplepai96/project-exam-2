import { Modal, Button } from 'react-bootstrap';
import React, { useState, useCallback } from 'react';

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState(null);

  const openModal = useCallback((title, message, confirmCallback) => {
    setModalTitle(title);
    setModalMessage(message);
    setOnConfirm(() => () => {
      confirmCallback();
      setIsOpen(false);
    });
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    modalTitle,
    modalMessage,
    openModal,
    closeModal,
    onConfirm,
  };
}


export function CustomModal({ show, title, message, onConfirm, onHide }) {
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }