//this file defines the database schema of out authentication

import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
});

export default mongoose.model("User",userSchema); //we have given this model name as User