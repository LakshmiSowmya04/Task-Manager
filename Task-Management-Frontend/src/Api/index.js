//this file is for handle request for send data and retrive data from backend
import axios from 'axios'

const API=axios.create({baseURL : "http://localhost:5000"})


export const logIn=(authData)=>API.post("/user/login",authData);
export const signUp=(authData)=>API.post("/user/signup",authData);