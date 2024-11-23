import express from "express";
import UserRoutes from "./routes/user.routes.js";
import connectToDB from "./database/Mongodb.js";
import TheaterRoutes from "./routes/theater.routes.js"
import MovieRoutes from "./routes/movie.routes.js"
import ShowRoutes from "./routes/shows.routes.js"
import env from 'dotenv';
env.config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());

app.use('/api/user',UserRoutes);
app.use("/api/theater", TheaterRoutes)
app.use("/api/movie", MovieRoutes)
app.use("/api/show", ShowRoutes)


// app.all('*',(req,res)=>{
//     res.status(404).send("Page not Found");
// })

app.listen(5000,()=>{
    console.log("Server is running at http://localhost:5000");
    connectToDB();
})