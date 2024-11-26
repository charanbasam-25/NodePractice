import React, { useEffect, useState } from 'react';



const Bookings = () => {
  let jwtToken=""
  if(localStorage.getItem('jwtToken')){
     jwtToken= localStorage.getItem('jwtToken');
  }
  
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/booking`, {
      headers: {
        jwttoken: jwtToken
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  console.log(bookings, "bookings------------");

  return (
    <div className="min-h-screen p-4 bg-lightgold">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Bookings</h2>
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by show"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-sm"
          />
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className='border-b-2 border-maroon'>
              <th className="py-2 px-4 border-b border-gray-200 text-center">Name</th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">Movie</th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">Date</th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">Time</th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">Total Seats</th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking, index) => (
              <tr key={index} >
                <td className="py-2 px-4 border-b border-gray-200 text-center text-center">{booking.user?.name || 'N/A'}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center text-center">{booking?.show?.movie?.title || 'N/A'}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center text-center">
                  {new Date(booking.show?.date).toLocaleDateString() || 'N/A'}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center text-center">{booking.show?.time || 'N/A'}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center text-center">{booking.show?.totalSeats || 'N/A'}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center text-center">{booking.show?.ticketPrice || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
