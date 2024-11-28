import Theater from "../Modal/theater.modal.js";

export const addTheater = async (req, res) => {
  try {
    const newTheater = new Theater(req.body);
    newTheater.owner = req.user.id;
    const theaterDetails = await newTheater.save();
    return res.status(200).send(theaterDetails);
  } catch (e) {
    console.error("Error in addTheater:", e);
    return res.status(500).send({ success: false, message: e.message });
  }
};

export const getTheaterById = async (req, res) => {
  try {
    const theaterId = req.params.theaterId;
    const theaterData = await Theater.findById(theaterId);
    res.status(200).send(theaterData);
  } catch (e) {
    res.status(500).send({
      success: false,
      Message: e.message,
    });
    console.log(e, "---Error");
  }
};
export const getAllTheater = async (req, res) => {
  try {
    const ownerId = req.query.ownerId;
    const filter = {};
    if (ownerId) {
      filter.owner = ownerId;
    }
    // if owner id is ther we wil get the dtails of owener belopnged theaters, else we wil get the all the theaters as we are passing {}
    const theaterDetails = await Theater.find(filter);
    res.status(200).send(theaterDetails);
  } catch (e) {
    res.status(500).send({
      success: false,
      Message: e.message,
    });
    console.log(e, "---Error");
  }
};

export const updateTheater = async (req, res) => {
  try {
const theaterData= await Theater.updateOne({_id:req.params.theaterId},{$set:req.body});
res.status(200).send(theaterData);
  } catch (e) {
    res.status(500).send({
      success: false,
      Message: e.message,
    });
    console.log(e, "---Error");
  }
};
export const deleteTheater = async (req, res) => {
  try {
    const theaterData= await Theater.findByIdAndDelete(req.params.theaterId);
    console.log(theaterData,"tehaterData----------")
    res.status(200).send({
        success:true,
        Message:"Deleted Successfully",
        ...theaterData
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      Message: e.message,
    });
    console.log(e, "---Error");
  }
};

