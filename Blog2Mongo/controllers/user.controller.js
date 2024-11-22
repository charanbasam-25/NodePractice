import User from "../Modal/user.modal.js";

export const getUserById= async( req,res)=>{
    try{
        const userId= req.params.id;
    const userDetail= await User.findById(userId);
    res.status(200).send(userDetail);
    }
    catch(e){
        console.log("error ar get UserID contoller", e)
    }
     
}

export const createUser=async(req,res )=>{
    try{
    const userData= req.body;
    const newUserData= await User.create(userData);
    res.status(200).send(newUserData);
    
    }catch(e){
        console.log("error at create User", e)
    }

    
}
export const updateUser= async ( req, res)=>{
    try{
        const userId= req.params.userId;
        const newUserData= req.body;
        const userData= await User.updateOne({_id:userId},{$set: newUserData});
        res.status(200).send(userData);
    }
    catch(e){
        console.log("error in updating data", e);
    }
    
}

export const deleteUser= async(req, res)=>{
    try{
        const userId= req.params.userId;
        const newUserData= await User.findByIdAndDelete(userId)
        res.status(200).send(newUserData);
    }
    catch(e){
        console.log("error at delete the user", e)
    }
    
}


