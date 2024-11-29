import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

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
  const jwtToken = Cookies.get("jwtToken");
  console.log(jwtToken, "show----------");
  useEffect(() => {
    if (localStorage.getItem("jwtToken") == undefined) {
      console.log("inside------ias dmin----");
      localStorage.setItem("isadmin", false);
    }
    console.log(localStorage.getItem("isadmin"), "isadmin--------");

    fetch("http://localhost:5000/api/movie", {
      headers: {
        jwttoken: jwtToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div className="min-h-screen bg-lightgold p-4">
      <div className="max-w-7xl mx-auto bg-maroon p-8 rounded-xl shadow-lg">
        <h2 className="text-5xl font-semibold text-white mb-6 font-merriweather animate-slide-in-left">
        <span class="text-lightgold">||</span> Movies <span class="text-lightgold">||</span>
        </h2>
        <input
          type="text"
          placeholder="Search for movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="shadow-sm border-2 border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayMovies.map((movie) => (
            <Link key={movie._id} to={`/movie/${movie._id}`}>
              <div className="bg-lightgold p-2 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-56 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {movie.title}
                  </h3>
                  <p className="text-gray-600">{movie?.language?.join(", ")}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <ReactPaginate
            previousLabel={<span className="text-lg font-semibold">←</span>}
            nextLabel={<span className="text-lg font-semibold">→</span>}
            breakLabel={"..."}
            pageCount={Math.ceil(filteredMovies.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"flex items-center space-x-3"}
            pageClassName={"page-item"}
            pageLinkClassName={
              "px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md text-sm transition-all duration-300 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
            previousClassName={
              "page-item disabled cursor-not-allowed px-3 py-2 bg-gray-300 text-gray-500 border border-gray-400 rounded-md"
            }
            previousLinkClassName={"page-link"}
            nextClassName={
              "page-item disabled cursor-not-allowed px-3 py-2 bg-gray-300 text-gray-500 border border-gray-400 rounded-md"
            }
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={
              "px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md text-sm"
            }
            activeClassName={"bg-blue-600 text-white font-bold border-blue-600"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
