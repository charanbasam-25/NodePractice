
import Booking from "../Modal/booking.modal.js";
import Stripe from 'stripe';
import dotenv from 'dotenv';
import {stripe} from '../index.js'
import {transporter}  from '../index.js'
// const stripe = new Stripe(process.env.stripe_secret_key);


// export const getPaymentClientSecret = async (req, res) => {
//   try {
//     const bookingDetails = req.body;

//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: bookingDetails.seats * bookingDetails.price * 100,
//       currency: "inr",
//       payment_method_types: ["card"],
//       metadata: {
//         showId: bookingDetails.showId,
//         seats: bookingDetails.seats,
//       },
//     });

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (e) {
//     res.status(500).send({
//       success: false,
//       message: e.message,
//     });
//   }
// };

export const makePayment= async(req,res)=>{
  try {
    const bookingDetails = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: bookingDetails.seats * bookingDetails.price * 100,
      currency: "inr",
      payment_method_types: ["card"],
      metadata: {
        showId: bookingDetails.showId,
        seats: bookingDetails.seats,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }

}

export const createBooking = async (req, res) => {
  try {
    // UserId > req.user (jwttoken)
    // Transaction Id > req.transactionId (get transaction details from /make-payment)
    // Seats > req.seats (verify if selected seats are really available, updated bookedSeats in Show collection)
    // showId > req.showId

    const bookingDetails = req.body;
    // console.log(bookingDetails,"bookingdetail--------")
    const paymentIntent = await stripe.paymentIntents.retrieve(
      bookingDetails.transactionId
    );
    console.log(paymentIntent,"paymentIntent-----------")
    const booking = new Booking({
      ...bookingDetails,
      seats: paymentIntent.metadata.seats,
      show: paymentIntent.metadata.showId,
    });
    console.log(req.user,"req--------")
    booking.user = req.user.id;
    await booking.save();

    const info = await transporter.sendMail({
      from: '"Charan Kumar" <charanfrondev@gmail.com>', // sender address
      to: req.user.email, // list of receivers
      subject: "Booking is confirmed", // Subject line
      text: "Booking Got Confirmed. Have Fun", // plain text body
      html: "<b>Yayyyy!!!  Your Booking is confirmed</b>", // html body
    });

    console.log(info,"info-------")

    res.send({
      success: true,
      message: "Booking is confirm",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

export const getBookingDetail = async (req, res) => {
  
  try {
     let userObject={}
    if(req.query.forUser){
      userObject={
        user:req.user.id,
      }
    }
    console.log(userObject)
    const bookingDetail = await Booking.find(userObject)
      .populate("user")
      .populate({
        path: "show",
        model: "shows",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        model: "shows",
        populate: {
          path: "theater",
          model: "theaters",
        },
      });
      console.log(bookingDetail,"bookingdetials-----")
    res.send(bookingDetail);
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};
