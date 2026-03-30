import React from 'react'
import { assets, cityList } from '../assets/assets'
import { useState } from 'react';
const Hero = () => {
    const [pickupLocation,setPickupLocation]=useState(" ");
  return (
    <div className="flex flex-col items-center pt-28 pb-10 gap-8 bg-gray-100 text-center">

  <h1 className="text-4xl md:text-5xl font-semibold">
    Luxury cars on Rent!
  </h1>

 <form
  className="flex flex-col md:flex-row items-center md:items-end
  gap-4 md:gap-6
  px-6 md:px-10 py-6
  bg-white rounded-2xl md:rounded-full
  shadow-lg mt-8">

    {/* Pickup Location */}
    <div className="flex flex-col items-start">
      <label className="text-sm font-medium">Pickup Location</label>
      <select
        required
        value={pickupLocation}
        onChange={(e)=>setPickupLocation(e.target.value)}
        className="border rounded-lg px-4 py-2 text-base text-gray-700 w-full md:w-auto"

      >
        <option value="">Select location</option>
        {cityList.map((city)=>(
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>

    {/* Pickup Date */}
    <div className="flex flex-col items-start">
      <label className="text-sm font-medium">Date of Pick-up</label>
      <input
        type="date"
        min={new Date().toISOString().split("T")[0]}
        className="border rounded-lg px-4 py-2 text-base text-gray-700 w-full md:w-auto"
        required
      />
    </div>

    {/* Return Date */}
    <div className="flex flex-col items-start">
      <label className="text-sm font-medium">Return Date</label>
      <input
        type="date"
        className="border rounded-md px-3 py-1.5 text-sm text-gray-600"
        required
      />
    </div>

    <button
  className="flex items-center justify-center gap-2
  px-8 py-3 bg-blue-800 hover:bg-blue-900
  text-white text-base font-medium rounded-full
  w-full md:w-auto">
      <img src={assets.search_icon} className="w-4 brightness-0 invert"/>
      Search
    </button>

  </form>
  <img src={assets.main_car} alt="maincar" className="w-full max-w-4xl mt-10 mb-10 px-6 object-contain"/>
</div>
  )
}

export default Hero
