import React from 'react'
import { assets, cityList } from '../assets/assets'
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import {motion} from 'motion/react'
const Hero = () => {
    const [pickupLocation,setPickupLocation]=useState("");
    const {pickupDate,setPickupDate,returnDate,setReturnDate,navigate}=useAppContext()
    const handleSearch=(e)=>{
      e.preventDefault()
      navigate('/cars?pickupLocation='+pickupLocation.toLowerCase()+'&pickupDate='+pickupDate+'&returnDate='+returnDate)
    }
  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}} transition={{duration:0.8}}
    className="flex flex-col items-center pt-28 pb-10 gap-8 bg-gray-100 text-center">

  <motion.h1 initial={{y:50,opacity:0}}
    animate={{y:0,opacity:1}} transition={{duration:0.8,delay:0.2}}
     className="text-4xl md:text-5xl font-semibold">
    Luxury cars on Rent!
  </motion.h1>

 <motion.form
 initial={{scale:0.95,y:50,opacity:0}} animate={{scale:1,y:0,opacity:1}} transition={{duration:0.6,delay:0.4}}
  className="flex flex-col md:flex-row items-center md:items-end
  gap-6 md:gap-8
  px-10 md:px-14 py-8
  bg-white rounded-2xl md:rounded-full
  shadow-xl mt-8" onSubmit={handleSearch}>


<div className='flex flex-col  items-start '>
    <label className='text-sm font-medium'>Pickup Location</label>
      <select
        required
        value={pickupLocation}
        onChange={(e)=>setPickupLocation(e.target.value)}
        className="border rounded-lg px-4 py-3 text-base text-gray-700 w-full md:w-auto"
      >
        <option value="">Select location</option>
        {cityList.map((city)=>(
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
  </div>
    

    <div className="flex flex-col items-start">
      <label className="text-sm font-medium">Date of Pick-up</label>
      <input
        type="date"
        min={new Date().toISOString().split("T")[0]}
        className="border rounded-lg px-4 py-3 text-base text-gray-700 w-full md:w-auto"
        required value={pickupDate} onChange={e=>setPickupDate(e.target.value)}
      />
    </div>

    <div className="flex flex-col items-start">
      <label className="text-sm font-medium">Return Date</label>
      <input
        type="date"
        className="border rounded-lg px-4 py-3 text-base text-gray-700 w-full md:w-auto"
        required value={returnDate} onChange={e=>setReturnDate(e.target.value)}
      />
    </div>

    <motion.button
    whileHover={{scale:1.05}} whileTap={{scale:0.95}}
      className="flex items-center justify-center gap-2
      px-10 py-3 bg-blue-800 hover:bg-blue-900
      text-white text-base font-medium rounded-full
      w-full md:w-auto">
      <img src={assets.search_icon} className="w-4 brightness-0 invert"/>
      Search
    </motion.button>
        
  </motion.form>

  <motion.img
  initial={{y:100,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.8,delay:0.6}}
    src={assets.main_car}
    alt="maincar"
    className="w-full max-w-4xl mt-4 mb-10 px-6 object-contain"
  />

</motion.div>
  )
}

export default Hero
