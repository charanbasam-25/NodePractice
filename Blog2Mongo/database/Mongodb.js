import mongoose from "mongoose";

const connectToDB= async()=>{
    try{
        console.log("connecting to database")
        const {connection}= await mongoose.connect('mongodb+srv://becharankumar:UB6MDC2tRLJLZ4gr@cluster0.smi7z.mongodb.net/charansclaer?retryWrites=true&w=majority&appName=Cluster0')
        // console.log(connection,"connected------")
        if(connection){
            console.log(`Successfully connected to , ${connection.host}`);
        }
    }
    catch(e){
        console.log("Error connecting to database", e)
    }
};


export default connectToDB;