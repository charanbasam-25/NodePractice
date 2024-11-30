import mongoose from "mongoose";

const connectToDB= async()=>{
    try{
        console.log("connecting to database")
        const {connection}= await mongoose.connect(process.env.mongodb_url)
        if(connection){
            console.log(`Successfully connected to , ${connection.host}`);
        }
    }
    catch(e){
        console.log("Error connecting to database", e)
    }
};


export default connectToDB;