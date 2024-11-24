import Theater from "../Modal/theater.modal.js";

const istheaterOwner = async function (req, res, next) {
  try {
    const theaterDetails = await Theater.findById(req.body.theater);
    console.log(theaterDetails,"theaterDEtails--------")
    if (theaterDetails.owner!= req.user.id) {
       throw new Error(`You are not the owner of ${theaterDetails.name}`);
    }
    next();
  } catch (e) {
    res.status(403).send({
      success: false,
      message: e.message,
    });
  }
};
export default istheaterOwner;
