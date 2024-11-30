import React, { useEffect, useState, useTransition } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { stripePromise } from "../App.js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import LoginError from "./LoginError.jsx"

const ShowPage = () => {
  const { showId } = useParams();
  const [show, setShow] = useState({});
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoggedin, setLoggedIn] = useState(localStorage.getItem("jwtToken") !== null);
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
const [contentForModal, setContentForModal]= useState("");
const [loginErrorPopUp, setLoginErrorPopUp]= useState("");

  const appearance = {
    theme: "stripe",
  };

  const handleSeatChange = (e) => {
    setSelectedSeats(Number(e.target.value));
  };
  let jwtToken=""
  if(localStorage.getItem('jwtToken')){
     jwtToken= localStorage.getItem('jwtToken');
  }

  const handleBookSeats = () => {
      if (localStorage.getItem("jwtToken")) {
        setLoggedIn(true);
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/booking/create-checkout`,  {
          method: "POST",
          headers: { "Content-Type": "application/json", jwttoken: jwtToken },
          body: JSON.stringify({
            seats: selectedSeats,
            price: show.ticketPrice,
            showId,
          }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }else{
        setLoggedIn(false)
        setContentForModal("Please login !!!!!")
        
        setLoginErrorPopUp(true);
      }
    
   
  };


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/show/${showId}`, {
      headers: {
        jwttoken: jwtToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setShow({
          ...data,
          availableSeats: data.totalSeats - data.bookedSeats?.length,
        });
      });
  }, []);

  useEffect(() => {

    const transactionId = searchParams.get("payment_intent");
    if (transactionId) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/booking/confirm`,  {
        method: "POST",
        headers: { "Content-Type": "application/json", jwttoken: jwtToken },
        body: JSON.stringify({
          transactionId: searchParams.get("payment_intent"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate("/profile/bookings");
        });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen p-4 bg-lightgold">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Show Details</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            Theatre: {show.theater?.name}
          </h3>
          <p className="text-gray-700 mb-2">
            <strong>Movie:</strong> {show.movie?.title}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Duration:</strong> {show.movie?.duration} min
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Show Time:</strong> {show.time}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Ticket Price:</strong>Rs. {show.ticketPrice}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Total Seats:</strong> {show.totalSeats}
          </p>
          <p className="text-gray-700 mb-6">
            <strong>Available Seats:</strong> {show.availableSeats}
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center mb-6">
          <label
            htmlFor="seats"
            className="text-gray-700 text-lg mb-2 md:mb-0 md:mr-4"
          >
            Select Seats:
          </label>
          <select
            id="seats"
            value={selectedSeats}
            onChange={handleSeatChange}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 md:mb-0"
          >
            {Array.from({ length: show.availableSeats }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <button
            onClick={handleBookSeats}
            className="bg-lightgold hover:text-white text-maroon font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Book Seat
          </button>
        </div>

        {clientSecret && (
          <Elements
            options={{
              clientSecret,
              appearance,
            }}
            stripe={stripePromise}
          >
            <div class="border-2 border-lightgold p-4 rounded-lg">
            <CheckoutForm successUrl={window.location.href}  clientSecret={clientSecret} />
            </div>
          </Elements>
        )}
      </div>
      {!isLoggedin && (
        <LoginError message={contentForModal} onClose={() => setLoginErrorPopUp(false)} />
      )}
    </div>
  );
};

export default ShowPage;

// http://localhost:3002/bookings?
// payment_intent=pi_3Pn9ywSHyBJaG3xB0Wo1tAP8&
// payment_intent_client_secret=pi_3Pn9ywSHyBJaG3xB0Wo1tAP8_secret_BjnCp8KnkNd1u8ABDuIvm4VMG&
// redirect_status=succeeded