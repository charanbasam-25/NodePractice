import Show from "../Modal/show.modal.js";
import Theater from "../Modal/theater.modal.js";

export const addShow = async (req, res) => {
  try {
    // const theaterDetials = await Theater.findById(req.body.theater);
    // console.log(theaterDetials, "theatr details-=---");
    // // if(theaterDetials.owner != req.user.id){
    // //     return res.status(403).send({
    // //         success:false,
    // //         Messagge:`You are the owner of ${theaterDetials.name}`
    // //     })
    // // }
    const showDetials = new Show(req.body);
    await showDetials.save();
    res.status(200).send({ sucess: true, ...showDetials });
  } catch (e) {
    res.status(500).send({
      success: false,
      Message: e.message,
    });
  }
};
export const updateShow = async (req, res) => {
  try {
    console.log(req.body, "Incoming Request Body");

    const updatedDetails = await Show.findOneAndUpdate(
      { _id: req.params.showId },
      { $set: req.body },
      { new: true }
    )
      .populate("movie", "name") // Populate specific fields for testing
      .populate("theater", "name");

    if (!updatedDetails) {
      return res.status(404).send({ success: false, message: "Show not found" });
    }

    console.log(updatedDetails, "Updated Details");

    res.status(200).send(updatedDetails); // Send the updated details
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};


export const deleteShow = async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.params.showId);

    res.status(200).send({
      success: true,
      Message: "Delted the Show",
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      Message: e.message,
    });
  }
};
export const getShowById = async (req, res) => {
  try {
    const showDetail = await Show.findOne({ _id: req.params.showId }).populate([
      "theater",
      "movie",
    ]);
    console.log(showDetail, "showDetial--------");
    res.send(showDetail);
  } catch (e) {
    res.status(500).send({
      success: false,
      Message: e.message,
    });
  }
};
export const getShowByFilter = async (req, res) => {
  try {
    const { movie, theater, date } = req.query;
    const filter = {};
    if (movie) {
      filter.movie = movie;
    }
    if (theater) {
      filter.theater = theater;
    }
    if (date) {
      filter.date = date;
    }
    const showDetails = await Show.find(filter)
      .populate("theater")
      .populate("movie");
    res.status(200).send(showDetails);
    console.log(showDetails,"showdeatils-------")
  } catch (e) {
    res.status(500).send({
      success: false,
      Message: e.message,
    });
  }
};
