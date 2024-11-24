import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { jtwToken } from "../constants/authToken";
import { Link } from "react-router-dom";

const itemsPerPage = 9;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const displayMovies = filteredMovies.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    fetch("http://localhost:5000/api/movie", {
      headers: {
        jwttoken: jtwToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Movies</h2>
        <input
          type="text"
          placeholder="Search for movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayMovies.map((movie) => (
            <Link to={`/movie/${movie._id}`}>
              <div
                key={movie._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                  <p className="text-gray-600">{movie?.language?.join(", ")}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(filteredMovies.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"flex space-x-2"}
            pageClassName={"page-item"}
            pageLinkClassName={
              "px-4 py-2 bg-white border border-gray-300 rounded-full text-sm leading-tight text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
            previousClassName={
              "page-item disabled cursor-not-allowed px-3 py-2 bg-gray-200 border border-gray-300 rounded-full text-gray-400"
            }
            previousLinkClassName={"page-link text-gray-400 cursor-not-allowed"}
            nextClassName={
              "page-item disabled cursor-not-allowed px-3 py-2 bg-gray-200 border border-gray-300 rounded-full text-gray-400"
            }
            nextLinkClassName={"page-link text-gray-400 cursor-not-allowed"}
            breakClassName={"page-item"}
            breakLinkClassName={
              "px-3 py-1.5 bg-white border border-gray-300 rounded-full text-gray-700"
            }
            activeClassName={"bg-blue-600 text-white font-semibold"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
