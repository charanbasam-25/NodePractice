import React from "react";
import Modal from "react-modal";

const ErrorModal = ({ isOpen, onClose, content }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Error Modal"
      className="w-11/12 sm:w-96 bg-white p-8 rounded-lg shadow-lg mt-12 max-h-[90vh] overflow-y-auto absolute top-0 right-0 bottom-0"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="text-center">
        <h1 className="text-lg font-semibold text-red-600 mb-4">
          Access Denied
        </h1>
        <p className="text-sm text-gray-600">{content}</p>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
