import { useContext } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
export const AppContext=createContext();
export const AppProvider=({child})=>{
    const navigate=useNavigate();
    const [token,setToken]=useState(null)
    const [user,setUser]=useState(null)
    const [isOwner,setisOwner]=useState(false);
    const [showlogin,setShowLogin]=useState(false);
    const [pickupDate,setpickupdate]=useState("");
    const [returnDate,setreturndate]=useState("");
    const [cars,setCars]=useState([])
    const fetchUser=async()=>{
        try {
            const {data}=await axios.get('/api/user/data');
            
            if(data.success){
                setUser(data.user);
                setisOwner(data.user.role==='owner');
            }
            else{
                navigate('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const fetchcars=async()=>{
        try {
            const {data}=await axios.get('/api/user/cars')
            data.success?setCars(data.cars):toast.error(data.message)
        } catch (error) {
             toast.error(error.message)
        }
    }
    const logout=()=>{
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setisOwner(false);
        axios.defaults.headers.common['Authorization']=''
        toast.success('You have been logged out!')
    }
    useEffect(()=>{
        const token=localStorage.getItem('token');
        setToken(token);
        fetchcars();
    },[])
    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization']=`${token}`
            fetchUser();
        }
    },[token])
    const value={
        navigate,axios,user,setUser,token,setToken,isOwner,setisOwner,fetchUser,showlogin,setShowLogin,logout,fetchcars,cars,setCars,pickupDate,
        setpickupdate,returnDate,setreturndate
    }
    return(
    <AppContext.Provider value={value}>
        {child}
    </AppContext.Provider>)
}
export const useAppContext=()=>{
    return useContext(AppContext);
}