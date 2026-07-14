import { useContext } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
export const AppContext=createContext();
export const AppProvider=({children})=>{
    const navigate=useNavigate();
    const [token,setToken]=useState(localStorage.getItem('token')||null)
    const [user,setUser]=useState(null)
    const [isOwner,setIsOwner]=useState(false);
    const [showlogin,setShowLogin]=useState(false);
    const [pickupDate,setPickupDate]=useState("");
    const [returnDate,setReturnDate]=useState("");
    const [cars,setCars]=useState([])
    const fetchUser=async()=>{
        try {
            const {data}=await axios.get('/api/user/data');
            
            if(data.success){
                setUser(data.user);
                setIsOwner(data.user.role==='owner');
            }
            else{
                navigate('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const fetchcars = async () => {
  try {
    const { data } = await axios.get('/api/user/cars');

    console.log("API RESPONSE:", data);

    if (data.success) {
      console.log("SETTING CARS:", data.cars);
      setCars(data.cars);
    }
  } catch (error) {
    console.log(error);
  }
}
    const logout=()=>{
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        axios.defaults.headers.common['Authorization']=''
        toast.success('You have been logged out!')
    }
    useEffect(()=>{
        
        fetchcars();
    },[])
    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization']=`Bearer ${token}`
            fetchUser();
        }
    },[token])
    const value={
        navigate,axios,user,setUser,token,setToken,isOwner,setIsOwner,fetchUser,showlogin,setShowLogin,logout,fetchcars,cars,setCars,pickupDate,
        setPickupDate,returnDate,setReturnDate
    }
    return(
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>)
}
export const useAppContext=()=>{
    return useContext(AppContext);
}