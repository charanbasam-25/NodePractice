import jwt from 'jsonwebtoken';

const isAdminMiddleware= function (req,res,next){
    try{
        // we are setting user in auth middleware
        if(req.user.isadmin){
            next();
        }
        else{
            throw new Error('You dont have permission')
        }
        
    }
    catch(e){
        res.status(403).send({
            success:false,
            Message:e.message
        })
    }
}

export default isAdminMiddleware;