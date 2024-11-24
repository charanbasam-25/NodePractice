import express from "express";
import UserRoutes from "./routes/user.routes.js";
import connectToDB from "./database/Mongodb.js";
import TheaterRoutes from "./routes/theater.routes.js";
import MovieRoutes from "./routes/movie.routes.js";
import ShowRoutes from "./routes/shows.routes.js";
import env from 'dotenv';
import cors from 'cors';

env.config();

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());

// CORS configuration (Allow requests only from React frontend)
app.use(cors({
  origin: 'http://localhost:3000',  // Only allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Routes
app.use('/api/user', UserRoutes);
app.use("/api/theater", TheaterRoutes);
app.use("/api/movie", MovieRoutes);
app.use("/api/show", ShowRoutes);

// Handle 404 for undefined routes
app.all('*', (req, res) => {
    res.status(404).send("Page not Found");
});

// Start server
app.listen(5000, () => {
    console.log("Server is running at http://localhost:5000");
    connectToDB();
});
