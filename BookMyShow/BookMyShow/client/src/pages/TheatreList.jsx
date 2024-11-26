import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate, useLocation } from 'react-router-dom';
import { jtwToken } from '../constants/authToken';

const TheatreList = () => {
  const [theaters, setTheatres] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTheatre, setNewTheatre] = useState({
    name: '',
    location: '',
    phone: '',
    email: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTheatre({ ...newTheatre, [name]: value });
  };

  const handleAddTheatre = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/theater", {
      method: "POST",
      body: JSON.stringify(newTheatre),
      headers: {
        "Content-Type": "application/json",
        jwttoken: jtwToken
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTheatres([...theaters, newTheatre]);
        setNewTheatre({
          name: '',
          location: '',
          phone: '',
          email: '',
        });
        setModalIsOpen(false);
      })
      .catch((e) => {
        window.alert(e.message);
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/theater", {
      headers: {
        jwttoken: jtwToken
      },
    })
      .then((res) => res.json())
      .then((data) => setTheatres(data));
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Theatres</h2>
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by theater"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-sm"
          />
          {
            location.pathname === '/owner/theaters' && (
                <button
                    onClick={() => setModalIsOpen(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Add Theatre
                </button>
            )
          }
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Location</th>
              <th className="py-2 px-4 border-b border-gray-200">Phone</th>
              <th className="py-2 px-4 border-b border-gray-200">Email</th>
              <th className="py-2 px-4 border-b border-gray-200">Shows</th>
              <th className="py-2 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {theaters?.map((theater, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200">{theater.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{theater.location}</td>
                <td className="py-2 px-4 border-b border-gray-200">{theater.phone}</td>
                <td className="py-2 px-4 border-b border-gray-200">{theater.email}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => navigate(`/owner/theaters/${theater._id}/shows`)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Shows
                  </button>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {location.pathname === '/owner/theaters' ? (
                    <>
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
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
        <form onSubmit={handleAddTheatre}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newTheatre.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={newTheatre.location}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Location"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={newTheatre.phone}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Phone"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={newTheatre.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleAddTheatre}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
    </div>
  );
}

export default TheatreList;