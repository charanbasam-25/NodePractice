import moment from "moment";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";


const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newMovie, setNewMovie] = useState({
    poster: "",
    title: "",
    description: "",
    genre: [],
    language: [],
    releaseDate: "",
    duration: "",
  });
  let jwtToken=""
  if(localStorage.getItem('jwtToken')){
     jwtToken= localStorage.getItem('jwtToken');
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "genre" || name === "language") {
      value = value.split(",").map(item => item.trim());
    }
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleAddMovie = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/movie", {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: {
        "Content-Type": "application/json",
        jwttoken: jwtToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 401) {
          return;
        }
        setMovies([...movies, newMovie]);
        setNewMovie({
          poster: "",
          title: "",
          description: "",
          genre: [],
          language: [],
          releaseDate: "",
          duration: "",
        });
        setModalIsOpen(false);
      })
      .catch((e) => {
        window.alert(e.message);
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/movie", {
      headers: {
        jwttoken: jwtToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div className="min-h-screen p-4 bg-lightgold">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Movies</h2>
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by movie"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-sm"
          />
          <button
            onClick={() => setModalIsOpen(true)}
            className="bg-lightgold hover:text-white text-maroon font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Movie
          </button>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr  className="border-b-2 border-maroon"> 
              <th className="py-2 px-4 border-b border-gray-200 text-center">Poster</th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">Title</th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">
                Description
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">Genres</th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">Languages</th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">
                Release Date
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">Duration</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-12 h-12"
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {movie.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {movie.description}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {movie.genre?.join(", ")}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {movie.language?.join(", ")}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {moment(movie.releaseDate).format("DD-MM-YYYY")}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {movie.duration} min
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Movie"
        className="w-11/12 sm:w-96 bg-white p-8 rounded-lg shadow-lg mt-12 max-h-[90vh] overflow-y-auto absolute top-0 right-0 bottom-0"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-2xl font-bold mb-4">Add Movie</h2>
        <form onSubmit={handleAddMovie}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="poster"
            >
              Poster URL
            </label>
            <input
              type="text"
              id="poster"
              name="poster"
              value={newMovie.poster}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Poster URL"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newMovie.title}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Title"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newMovie.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Description"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="genre"
            >
              Genres
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={newMovie.genre}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Genres"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="language"
            >
              Languages
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={newMovie.language}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Languages"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="releaseDate"
            >
              Release Date
            </label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={newMovie.releaseDate}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="duration"
            >
              Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={newMovie.duration}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Duration (in minutes)"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setModalIsOpen(false)}
              className="bg-lightgold hover:text-white text-maroon py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-lightgold hover:text-white text-maroon font-bold py-2 px-4 rounded"
            >
              Add Movie
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MovieList;
