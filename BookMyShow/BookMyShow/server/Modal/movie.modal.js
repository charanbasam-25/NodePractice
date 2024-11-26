import { model, Schema } from "mongoose";

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: [true],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    genre: {
      type: [String],
      enum: [
        "Thriller",
        "Action",
        "Fantasy",
        "Comedy",
        "Drama",
        "Romance",
        "Adventure",
        "Period",
        "Animation",
        "Family"
      ],
      required: true,
    },
    language: {
      type: [String],
      enum: ["English", "Hindi", "Telugu", "Kannada", "Malayalam", "Bengali"],
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Movie = model("movies", movieSchema);

export default Movie;
