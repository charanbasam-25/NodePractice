import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useLocation, useParams } from "react-router-dom";
import ErrorModal from "./ErrorModalPopUp"; // Make sure you have this ErrorModal component
import moment from "moment";

const ShowsList = () => {
  const [shows, setShows] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditClicked, setEditClicked]= useState(false);
  const { theaterId } = useParams();
  const [movies, setMovies] = useState([]);
  const [contentForModal, setContentForModal] = useState("");
  const [errorModalPopUp, setErrorModalPopUp] = useState(false);
  const [newShow, setNewShow] = useState({
    name: "",
    movie: "",
    theater: theaterId,
    date: "",
    time: "",
    totalSeats: "",
    ticketPrice: "",
    id:"",
  });

  let jwtToken = "";
  if (localStorage.getItem("jwtToken")) {
    jwtToken = localStorage.getItem("jwtToken");
  }

  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShow({ ...newShow, [name]: value });
  };

  const handleAddShow = (e) => {
    e.preventDefault();
    if (!localStorage.getItem("isadmin")) {
      setContentForModal(
        "You do not have permission to add show. Only admins can perform this action. If you encounter any issues, please contact the administrators."
      );
      setErrorModalPopUp(true);
    } else {
      console.log("handle--adshow----")
      fetch("http://localhost:5000/api/show", {
        method: "POST",
        body: JSON.stringify(newShow),
        headers: {
          "Content-Type": "application/json",
          jwttoken: jwtToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setShows([...shows, newShow]);
          setNewShow({
            name: "",
            movie: "",
            date: "",
            time: "",
            theater: theaterId,
            totalSeats: "",
            ticketPrice: "",
            id:""
          });
          setModalIsOpen(false);
        })
        .catch((e) => {
          window.alert(e.message);
        });
    }
  };

  // Function to handle editing a show
  const handleEdit = (showId) => {
    // Fetch show details by showId
    console.log(theaterId); 
    console.log(newShow,"newshow------")
    setEditClicked(true);
    fetch(`http://localhost:5000/api/show/${showId}`, {
      method: "GET",
      headers: {
        jwttoken: jwtToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Populate the form with the existing data for editing
        console.log(data,"data-----------")
        setNewShow({
          name: data.name,
          movie: data.movie,
          theater: theaterId,
          date: data.date,
          time: data.time,
          totalSeats: data.totalSeats,
          ticketPrice: data.ticketPrice,
          id:data._id
        });
        setShows((prevShows) => [...prevShows, data]);
        setModalIsOpen(true); // Open the modal to edit
      })
      .catch((e) => {
        console.error(e);
        setContentForModal("Error fetching show details.");
        setErrorModalPopUp(true);
      });
  };
  const updateAddShow = (showId) => {
    console.log(newShow, "Updating Show Data");
  
    fetch(`http://localhost:5000/api/show/${showId}`, {
      method: "PUT",
      body: JSON.stringify(newShow),
      headers: {
        "Content-Type": "application/json",
        jwttoken: jwtToken,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.status !== 204 ? res.json() : null;
      })
      .then((data) => {
        if (data) {
          console.log("Show updated successfully", data);
          setShows((prevShows) =>
            prevShows.map((show) =>
              show._id === data._id ? { ...show, ...data } : show
            )
          );
        }
      })
      .catch((error) => {
        console.error("Error updating show:", error);
      });
  };
  

  const handleDelete = (showId) => {
    if (!window.confirm("Are you sure you want to delete this show?")) return;

    fetch(`http://localhost:5000/api/show/${showId}`, {
      method: "DELETE",
      headers: {
        jwttoken: jwtToken,
      },
    })
      .then(() => {
        setShows(shows.filter((show) => show._id !== showId));
      })
      .catch((e) => {
        console.error(e);
        setContentForModal("Error deleting show.");
        setErrorModalPopUp(true);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/show?theater=${theaterId}`, {
      headers: {
        jwttoken: jwtToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setShows(data));

    fetch("http://localhost:5000/api/movie", {
      headers: {
        jwttoken: jwtToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);
console.log(shows,"shoiws---------")
  return (
    <div className="min-h-screen p-4 bg-lightgold">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Shows</h2>
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by show"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-sm"
          />
          {location.pathname.startsWith("/owner") && (
            <button
              onClick={() => setModalIsOpen(true)}
              className="bg-lightgold hover:text-white text-maroon font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Show
            </button>
          )}
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-center">
                Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">
                Movie
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">
                Date
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">
                Time
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">
                Total Seats
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">
                Price
              </th>
              {location.pathname.startsWith("/owner") && (
                <th className="py-2 px-4 border-b border-gray-200 text-center">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {shows.map((show, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {show.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {movies.find((movie) => movie._id === show.movie_id)?.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {moment(show.date).format("DD-MM-YYYY")}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {show.time}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {show.totalSeats}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {show.ticketPrice}
                </td>
                {location.pathname.startsWith("/owner") && (
                  <td className="py-2 px-4 border-b border-gray-200 text-center flex space-x-2">
                    <button
                      onClick={() => handleEdit(show._id)}
                      data-attribute={show._id}
                      className="bg-lightgold hover:text-white text-maroon font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(show._id)}
                      className="bg-lightgold hover:text-white text-maroon font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add or Edit Show"
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-12"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4">
          {newShow.name ? "Edit Show" : "Add Show"}
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newShow.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="movie"
            >
              Movie
            </label>
            <select
              id="movie"
              name="movie"
              value={newShow.movie}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Movie</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={newShow.date}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="time"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={newShow.time}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="totalSeats"
            >
              Total Seats
            </label>
            <input
              type="number"
              id="totalSeats"
              name="totalSeats"
              value={newShow.totalSeats}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="ticketPrice"
            >
              Ticket Price
            </label>
            <input
              type="number"
              id="ticketPrice"
              name="ticketPrice"
              value={newShow.ticketPrice}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {!isEditClicked ? (
            <button
              onClick={handleAddShow}
              type="submit"
              className="bg-lightgold hover:text-white text-maroon font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              "Add Show"
            </button>
          ) : (
            <button
              onClick={()=>updateAddShow(newShow.id)}
              type="submit"
              className="bg-lightgold hover:text-white text-maroon font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              "Update Show"
            </button>
          )}
        </form>
      </Modal>

      <ErrorModal
        isOpen={errorModalPopUp}
        onRequestClose={() => setErrorModalPopUp(false)}
        message={contentForModal}
      />
    </div>
  );
};

export default ShowsList;
