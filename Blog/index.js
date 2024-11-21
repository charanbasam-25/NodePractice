import express from "express";
import UserRoutes from "./routes/user.routes.js";
import BlogRoutes from './routes/blog.routes.js';
const app = express();


app.use(express.json());

app.use('/api/user',UserRoutes);
app.use('/api/blog',BlogRoutes);


// app.all('*',(req,res)=>{
//     res.status(404).send("Page not Found");
// })

app.listen(5000,()=>{
    console.log("Server is running at http://localhost:5000");
})