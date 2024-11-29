import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm({ successUrl, clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPayNowClicked, setPaynowClciked]= useState(false);

  useEffect(() => {
    if (!stripe || !clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        setMessage("Unable to retrieve payment status.");
        return;
      }
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaynowClciked(true)

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: successUrl,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="bg-lightgold hover:text-white text-maroon font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
      </button>
      {message&& isPayNowClicked && <div id="payment-message">{message}</div>}
    </form>
  );
}
