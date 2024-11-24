import Booking from "../Modal/booking.modal";

export const makePayment = async (req, res) => {
    try {
  
  
    } catch (e) {
      res.status(500).send({
        success: false,
        Message: e.message,
      });
    }
  };
  

export const createBooking = async (req, res) => {
  try {
// transction id got from payemnt 
//seats -> boook the seat and update the booked seats
//show id

    const bookingDetails= req.body;
    const booking= new Booking(bookingDetails);
    booking.user= req.user.id;
    await booking.save();


    // update booked seats in seats collections 
  } catch (e) {
    res.status(500).send({
      success: false,
      Message: e.message,
    });
  }
};

export const getBooking = async (req, res) => {
  try {
    const bookingDetails = await Booking.find(req.query.bookingId)
      .populate("user")
      .populate({
        path: "show",
        model: "shows",
        populate: { path: "movie", model: "movies" },
      })
      .populate({
        path: "show",
        model: "shows",
        populate: { path: "theater", model: "theaters" },
      });
      res.status(200).send(bookingDetails);
  } catch (e) {
    res.status(500).send({
      success: false,
      Message: e.message,
    });
  }
};
