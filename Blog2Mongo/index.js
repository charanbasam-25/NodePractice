import express from "express";
import UserRoutes from "./routes/user.routes.js";
import BlogRoutes from './routes/blog.routes.js';
import connectToDB from "./database/Mongodb.js";
const app = express();


app.set('view engine', 'ejs');
app.use(express.json());

app.use('/api/user',UserRoutes);
app.use('/api/blog',BlogRoutes);
app.use('/blog/list',BlogRoutes);


// app.all('*',(req,res)=>{
//     res.status(404).send("Page not Found");
// })

app.listen(5000,()=>{
    console.log("Server is running at http://localhost:5000");
    connectToDB();
})