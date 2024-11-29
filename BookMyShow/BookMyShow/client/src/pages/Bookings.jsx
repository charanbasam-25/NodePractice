import React, { useEffect, useState } from "react";
import ErrorModal from "./ErrorModalPopUp";
import LoginError from "./LoginError";

const Bookings = () => {
  let jwtToken = "";
  if (localStorage.getItem("jwtToken")) {
    jwtToken = localStorage.getItem("jwtToken");
  }

  const [bookings, setBookings] = useState([]);
  const [forUser, setForUser] = useState(true);
  const [errorModalPopUp, setErrorModalPopUp] = useState(false);
  const [contentForModal, setContentForModal] = useState("");
  const [isLoggedin, setLoggedIn] = useState(localStorage.getItem("jwtToken") !== null);
  const [loginErrorPopUp, setLoginErrorPopUp]= useState("");

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      fetch(`http://localhost:5000/api/booking?forUser=${forUser}`, {
        headers: {
          jwttoken: jwtToken,
        },
      })
        .then((res) => res.json())
        .then((data) => setBookings(data));
    } else {
      setLoggedIn(false);
    }
  }, []);

  console.log(bookings, "bookings------------");
  const handleAllBookings = () => {
    if (!localStorage.getItem("isadmin")) {
      setForUser(false);
      fetch(`http://localhost:5000/api/booking`, {
        headers: {
          jwttoken: jwtToken,
        },
      })
        .then((res) => res.json())
        .then((data) => setBookings(data));
    } else {
      setContentForModal(
        "Only admins have access to view all bookings. If you're interested in owning a theater and gaining access to all bookings, please contact the admin."
      );
      setErrorModalPopUp(true);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-lightgold">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          {forUser ? "Your Bookings" : "All Bookings"}
        </h2>
        {forUser && (
          <div className="mb-4 flex justify-between items-center">
            <button
              onClick={handleAllBookings}
              className="bg-lightgold hover:text-white text-maroon font-bold py-2 px-4 rounded"
            >
              All Bookings
            </button>
          </div>
        )}
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b-2 border-maroon">
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
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200 text-center text-center">
                  {booking.user?.name || "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center text-center">
                  {booking?.show?.movie?.title || "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center text-center">
                  {new Date(booking.show?.date).toLocaleDateString() || "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center text-center">
                  {booking.show?.time || "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center text-center">
                  {booking.show?.totalSeats || "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center text-center">
                  {booking.show?.ticketPrice || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ErrorModal
        isOpen={errorModalPopUp}
        onClose={() => setErrorModalPopUp(false)}
        content={contentForModal}
      />
      {!isLoggedin && (
        <LoginError
          message={contentForModal}
          onClose={() => setLoginErrorPopUp(false)}
        />
      )}
    </div>
  );
};

export default Bookings;
