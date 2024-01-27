import jwt from 'jsonwebtoken';
import userModel from '../../DB/user.model.js';
export const roles = {
    Admin:'Admin',User:'User',hr:'HR',super:'super'
}


export const auth = (accessRoles = [])=>{
    return async (req,res,next)=>{
        const {authorization} = req.headers;
        if(!authorization?.startsWith(process.env.BEARERKEY)){
            return res.status(400).json({message:"Invalid authorization"});

        }
        const token = authorization.split(process.env.BEARERKEY)[1];
       
       const decoded = jwt.verify(token,process.env.LOGINSECRET);
        if(!decoded){
            return res.status(400).json({message:"Invalid authorization"});
        }
        const user = await userModel.findById(decoded._id).select(" userName role");
        if(!user){
            return res.status(404).json({message:"not registered user"});
        }

        const changePasswordTimeInSeconds = parseInt(user.changePasswordTime?.getTime() / 1000);
        const tokenIssuedAtInSeconds = decoded.iat;

        if(changePasswordTimeInSeconds > tokenIssuedAtInSeconds){
            return next(new Error("expired token , plz login"),{cause:400})

        }
        if(!accessRoles.includes(user.role)){
            return res.status(403).json({message:"not auth user"});
        }
        req.user=user;
        next();
    }
   
   

    
}
