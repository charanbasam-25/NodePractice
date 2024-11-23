import jwt from 'jsonwebtoken';

const isAdminMiddleware= function (req,res,next){
    try{
        // we are setting user in auth middleware
        if(req.user.isadmin){
            console.log("Is----admin--sucessfulll")
            next();
        }
        else{
            throw new Error('You dont have permission')
        }
        
    }
    catch(e){
        console.log(e,"e---in isadmin")
        res.status(403).send({
            success:false,
            Message:e.message
        })
    }
}

export default isAdminMiddleware;