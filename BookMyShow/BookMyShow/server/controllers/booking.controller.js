
import Booking from "../Modal/booking.modal.js";

import {stripe} from '../index.js'
import {transporter}  from '../index.js'

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

    const bookingDetails = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(
      bookingDetails.transactionId
    );
    const booking = new Booking({
      ...bookingDetails,
      seats: paymentIntent.metadata.seats,
      show: paymentIntent.metadata.showId,
    });
    booking.user = req.user.id;
    await booking.save();

    const info = await transporter.sendMail({
      from: `"Your Admin" <${process.env.email_user}>`, 
      to: req.user.email, 
      subject: "Booking is confirmed", 
      text: "Booking Got Confirmed. Have Fun", 
      html: "<b>Yayyyy!!! Your Booking is confirmed</b>",
  });
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
    res.send(bookingDetail);
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};
