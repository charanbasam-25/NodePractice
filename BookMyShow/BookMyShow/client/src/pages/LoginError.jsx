import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorModal = ({ message, onClose }) => {
  const navigate = useNavigate();

  const handleModalClick = () => {
    // Close the modal (could also navigate directly from here)
    onClose();
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold text-maroon mb-4">Attention</h2>
        <p className="text-gray-700">{message}</p>
        <button
          onClick={handleModalClick}
          className="mt-4 bg-lightgold text-maroon p-2 rounded-lg w-full hover:bg-maroon hover:text-lightgold"
        >
            Please Login to Book
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
