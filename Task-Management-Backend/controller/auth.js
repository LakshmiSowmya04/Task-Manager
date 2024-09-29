import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/auth.js"

export const signup =async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const existinguser=await User.findOne({email});
        if(existinguser){
            return res.status(404).json({message:"User already exist..."});
        }
        
        //hashing the password
        const hashedPassword= await bcrypt.hash(password,12);//12 is salt value 
        const newUser=await User.create({name,email,password:hashedPassword});//inserting newuser into User database of atlas and geting it into newUser variable
        const token=jwt.sign({email:newUser.email , id:newUser._id},process.env.JWT_SECRET,{expiresIn:"1h"})//generating token for authentication . here "test" is highly confidential things
        res.status(200).json({result:newUser,token});
    }
    catch(error){
        req.status(500).json("Something went wrong");
    }
    
}

export const login =async(req,res)=>{
    const {email,password}=req.body;//after this we got email and password field form login page
    try{
        //since we are logining so if we found that user then and only then we need to allow.
        const existinguser=await User.findOne({email});
        
        
        if(!existinguser){
            return res.status(404).json({message:"User dosen't exist..."});//if user not exist then return message
        }
        
        const isPasswordCrt=await bcrypt.compare(password,existinguser.password);
        
        if(!isPasswordCrt){
            return res.status(400).json({message:"Invalid credentials Password not match"});
        }

        const token=jwt.sign({email:existinguser.email , id:existinguser._id},process.env.JWT_SECRET,{expiresIn:"1h"})//generating token for authentication . here "test" is highly confidential things
        res.status(200).json({result:existinguser,token}); 
    }   
    catch(error){
        req.status(500).json("Something went wrong");
    }
}


