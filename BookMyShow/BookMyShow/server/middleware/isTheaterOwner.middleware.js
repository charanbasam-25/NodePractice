import Theater from "../Modal/theater.modal.js";

const isTheaterOwner = async (req, res, next) => {
  console.log("Checking if user is the theater owner...");
  console.log(req.body,"theaterbodyyyy")
  try {
    // Assuming the theater ID is passed in req.body, but you could also use req.params or req.query
    const theaterId = req.body.theater || req.params.theaterId;
    
    // If the theater ID isn't provided in either body or params, return an error
    if (!theaterId) {
      return res.status(400).send({
        success: false,
        message: "Theater ID is required.",
      });
    }


    // Fetch theater details from the database using the theater ID
    const theaterDetails = await Theater.findById(theaterId);

    // If no theater is found, return an error
    if (!theaterDetails) {
      return res.status(404).send({
        success: false,
        message: "Theater not found.",
      });
    }

    console.log("Theater details found:", theaterDetails);

    // Check if the logged-in user is the owner
    if (theaterDetails.owner.toString() !== req.user.id) {
      throw new Error(`You are not the owner of ${theaterDetails.name}`);
    }

    // If the user is the owner, proceed to the next middleware
    next();
  } catch (e) {
    console.error("Error:", e.message); // Log the error for debugging
    res.status(403).send({
      success: false,
      message: e.message || "Unauthorized access.",
    });
  }
};

export default isTheaterOwner;
