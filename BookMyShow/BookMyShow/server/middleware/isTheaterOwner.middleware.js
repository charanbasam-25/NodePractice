import Theater from "../Modal/theater.modal.js";

const isTheaterOwner = async (req, res, next) => {
  try {
    const theaterId = req.body.theaterId || req.params.theaterId|| req.query.theaterId
    if (!theaterId) {
      return res.status(400).send({
        success: false,
        message: "Theater ID is required.",
      });
    }
    const theaterDetails = await Theater.findById(theaterId);
    if (!theaterDetails) {
      return res.status(404).send({
        success: false,
        message: "Theater not found.",
      });
    }

    console.log("Theater details found:", theaterDetails);
    if (theaterDetails.owner.toString() !== req.user.id) {
      throw new Error(`You are not the owner of ${theaterDetails.name}`);
    }
    next();
  } catch (e) {
    console.error("Error:", e.message);
    res.status(403).send({
      success: false,
      message: e.message || "Unauthorized access.",
    });
  }
};

export default isTheaterOwner;
