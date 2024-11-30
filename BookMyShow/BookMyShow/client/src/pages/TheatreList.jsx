import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import ErrorModal from "./ErrorModalPopUp";

const TheatreList = () => {
  const [theaters, setTheatres] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contentForModal, setContentForModal] = useState("");
  const [newTheatre, setNewTheatre] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
  });
  const [errorModalPopUp, setErrorModalPopUp] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (/^\d{0,10}$/.test(value)) {
        setNewTheatre({ ...newTheatre, [name]: value });
      }
    } else {
      setNewTheatre({ ...newTheatre, [name]: value });
    }
  };

  let jwtToken = "";
  if (localStorage.getItem("jwtToken")) {
    jwtToken = localStorage.getItem("jwtToken");
  }

  const validateForm = () => {
    const errors = {};
    if (!newTheatre.name) errors.name = "Please fill in the name.";
    if (!newTheatre.location) errors.location = "Please fill in the location.";
    if (!newTheatre.phone) errors.phone = "Please fill in the phone number.";
    if (!newTheatre.email) errors.email = "Please fill in the email.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddTheatreSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return; 

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/theater`, {
      method: "POST",
      body: JSON.stringify(newTheatre),
      headers: {
        "Content-Type": "application/json",
        jwttoken: jwtToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTheatres([...theaters, data]);
        setNewTheatre({
          name: "",
          location: "",
          phone: "",
          email: "",
        });
        setModalIsOpen(false);
      })
      .catch((e) => {
        window.alert(e.message);
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/theater`, {
      headers: {
        jwttoken: jwtToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setTheatres(data));
  }, []);
  const handleAddTheater = () => {
    if (JSON.parse(localStorage.getItem("isadmin"))) {
      setModalIsOpen(true);
    } else {
      setContentForModal(
        "You do not have permission to add theaters. Please contact the Admin for assistance. If you are a distributor, request the Admin to add theaters on your behalf."
      );
      setErrorModalPopUp(true);
    }
  };
  const handleDeleteTheater = (theaterId) => {
    if (!JSON.parse(localStorage.getItem("isadmin"))) {
      setContentForModal(
        "You do not have permission to delete this theater. Only admins can perform this action. If you encounter any issues, please contact the administrators."
      );
      setErrorModalPopUp(true);
    } else {
      try {
       
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/theater/${theaterId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            jwttoken: jwtToken,
          },
        })
          .then((res) => res.json())
          .then((data) =>
            setTheatres(theaters.filter((theater) => theater._id !== theaterId))
          );
      } catch (e) {
        console.log(e, "error in deleting data");
      }
    }
  };

  return (
    <div className="min-h-screen p-4 bg-lightgold">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Theatres</h2>
        <div className="mb-4 flex justify-between items-center">
          {location.pathname === "/owner/theaters" && (
            <button
              onClick={handleAddTheater}
              className="bg-lightgold hover:text-white text-maroon font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Theatre
            </button>
          )}
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b-2 border-maroon">
              <th className="py-2 px-4 border-b border-gray-200 text-center">
                Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">
                Location
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">
                Phone
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">
                Email
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">
                Shows
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {theaters?.map((theater, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {theater.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {theater.location}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {theater.phone}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {theater.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  <button
                    onClick={() =>
                      navigate(`/owner/theaters/${theater._id}/shows`)
                    }
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Shows
                  </button>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {location.pathname === "/owner/theaters" ? (
                    <button
                      onClick={() => handleDeleteTheater(theater._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  ) : (
                    <>
                      <button className="bg-lightgold hover:text-white text-maroon font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                        Approve
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Theatre"
        className="max-w-lg mx-auto w-96 bg-white p-8 rounded-lg shadow-lg mt-12"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4">Add Theatre</h2>
        <form onSubmit={handleAddTheatreSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-bold text-gray-700 mb-2"
              htmlFor="name"
            >
              Theatre Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newTheatre.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.name && (
              <div className="text-red-500 text-sm">{formErrors.name}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold text-gray-700 mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={newTheatre.location}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.location && (
              <div className="text-red-500 text-sm">{formErrors.location}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold text-gray-700 mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={newTheatre.phone}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.phone && (
              <div className="text-red-500 text-sm">{formErrors.phone}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold text-gray-700 mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={newTheatre.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formErrors.email && (
              <div className="text-red-500 text-sm">{formErrors.email}</div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Theatre
            </button>
            <button
              type="button"
              onClick={() => setModalIsOpen(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <ErrorModal
        isOpen={errorModalPopUp}
        onClose={() => setErrorModalPopUp(false)}
        content={contentForModal}
      />
    </div>
  );
};

export default TheatreList;
