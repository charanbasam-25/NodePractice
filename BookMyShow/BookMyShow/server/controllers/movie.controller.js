import Movie from "../Modal/movie.modal.js";

export const addMovie = async (req, res) => {
  try {
    console.log(req.body,"body-0-------")
    const newMovie = new Movie(req.body);
    newMovie.owner = req.user.id;
    const movieDetails = await newMovie.save();
    console.log(movieDetails,"moviedetails-----")
    return res.status(200).send(movieDetails);
  } catch (e) {
    console.error("Error in addMovie:", e);
    return res.status(500).send({ success: false, message: e.message });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const movieData = await Movie.findById(movieId);
    res.status(200).send(movieData);
  } catch (e) {
    res.status(500).send({
      success: false,
      Message: e.message,
    });
    console.log(e, "---Error");
  }
};
export const getAllMovie = async (req, res) => {
  try {
    const ownerId = req.query.ownerId;
    const filter = {};
    if (ownerId) {
      filter.owner = ownerId;
    }
    console.log(req.cookies,"cookies-----")
        // if owner id is ther we wil get the dtails of owener belopnged movies, else we wil get the all the movies as we are passing {}
    const movieDetails = await Movie.find(filter);
    res.status(200).send(movieDetails);
  } catch (e) {
    res.status(500).send({
      success: false,
      Message: e.message,
    });
    console.log(e, "---Error");
  }
};

export const updateMovie = async (req, res) => {
  try {
const movieData= await Movie.updateOne({_id:req.params.movieId},{$set:req.body});
res.status(200).send(movieData);
  } catch (e) {
    res.status(500).send({
      success: false,
      Message: e.message,
    });
    console.log(e, "---Error");
  }
};
export const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.movieId);
    res.send({
        success: true,
        message:"Sucessfully Deleted"
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      Message: e.message,
    });
    console.log(e, "---Error");
  }
};
