import jwt from 'jsonwebtoken';

const authMiddleware= function (req,res,next){
    try{
        const jwtToken = req.get('jwtToken');
        const userData= jwt.verify(jwtToken, process.env.jwt_secret_salt);
        if(userData){
            req.user= userData;
            next();
        }
        else{
            throw new Error('User token is not valid')
        }
        
    }
    catch(e){
        res.status(401).send({
            success:false,
            Message:e.message
        })
    }
}

export default authMiddleware;