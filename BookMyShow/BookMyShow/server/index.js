import express from "express";
import UserRoutes from "./routes/user.routes.js";
import connectToDB from "./database/Mongodb.js";
import TheaterRoutes from "./routes/theater.routes.js";
import MovieRoutes from "./routes/movie.routes.js";
import ShowRoutes from "./routes/shows.routes.js";
import BookingRoutes from './routes/booking.routes.js'
import env from 'dotenv';
import cors from 'cors';
import Stripe from 'stripe'
// import nodemailer  from 'nodemailer';

env.config();

// export const transporter = nodemailer.createTransport({
//     host: "smtp.mandrillapp.com",
//     port: 587,
//     auth: {
//         user: 'xyz@gmail.com',
//         pass: process.env.mailchimp_key
//     }
// })

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());

// CORS configuration (Allow requests only from React frontend)
const allowedOrigins = ['http://localhost:3000', 'https://checkout.stripe.com'];

app.use(cors());
// Routes
app.use('/api/user', UserRoutes);
app.use("/api/theater", TheaterRoutes);
app.use("/api/movie", MovieRoutes);
app.use("/api/show", ShowRoutes);
app.use("/api/booking", BookingRoutes);

// Handle 404 for undefined routes
app.all('*', (req, res) => {
    res.status(404).send("Page not Found");
});
export const stripe = new Stripe(process.env.stripe_secret_key)
// Start server
app.listen(5000, () => {
    console.log(process.env.stripe_secret_key,"secret key-222---")
    console.log("Server is running at http://localhost:5000");
    connectToDB();
});
