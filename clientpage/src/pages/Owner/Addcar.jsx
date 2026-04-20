import React, { useState } from 'react'
import TitleOwner from '../../components/Owner/TitleOwner';
import { assets } from '../../assets/assets';

const Addcar = () => {
  const [img,setImg]=useState(null);
  const [car,setCar]=useState({
    brand:"",model:"",year:0,pricePerDay:0,category:"",
    transmission:'',fuel_type:"",seating_capacity:"",location:"",description:""
  })
  const submitHandler=async(e)=>{

  }
  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      <TitleOwner title="Add New Car" subtitle="Fill in details to list a new car for
      booking, including pricing,availability, and car specifications"/>
      <form onSubmit={submitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>
        <div className='flex items-center gap-2-w-full'>
          <label htmlFor="car-image">
            <img src={img?URL.createObjectURL(img):assets.upload_icon} alt="" className='h-14 rounded cursor-pointer' />
            <input type="file" id='car-image' accept='image/*' hidden onChange={e=>setImg(e.target.files[0])}/>
          </label>
          <p className='text-sm text-gray-500 px-5'>Upload a picture of your car</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label >Brand</label>
            <input type="text" placeholder='e.g. BMW, MErcedes, Audi...'
            required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.brand} onChange={e=>setCar({...car,brand:e.target.value})} />
          </div>
          <div className='flex flex-col w-full'>
            <label >Model</label>
            <input type="text" placeholder='e.g. XS, E-Class, M4...'
            required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.model} onChange={e=>setCar({...car,model:e.target.value})} />
          </div>
        </div>
        <div className='grid grid-cols-1 sm:griid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label >Year</label>
            <input type="number" placeholder='2025'
            required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.year} onChange={e=>setCar({...car,year:e.target.value})} />
          </div>
          <div className='flex flex-col w-full'>
            <label >Daily Price (₹)</label>
            <input type="text" placeholder='10000'
            required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.pricePerDay} onChange={e=>setCar({...car,pricePerDay:e.target.value})} />
          </div>
          <div className='flex flex-col w-full'>
            <label >Category</label>
            <select onChange={e=>setCar({...car,category:e.target.value})}
              value={car.category} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline none'>
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:griid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label >Transmission</label>
            <select onChange={e=>setCar({...car,transmission:e.target.value})}
              value={car.transmission} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline none'>
              <option value="">Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="manual">Manual</option>
              <option value="semi-automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label >Fuel Type</label>
            <select onChange={e=>setCar({...car,fuel_type:e.target.value})}
              value={car.fuel_type} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline none'>
              <option value="">Select a Fuel type</option>
              <option value="gas">Gas</option>
              <option value="diesel">Diesel</option>
              <option value="petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label >Seating Capacity</label>
            <input type="number" placeholder='4'
            required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.seating_capacity} onChange={e=>setCar({...car,seating_capacity:e.target.value})} />
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <label >location</label>
            <select onChange={e=>setCar({...car,location:e.target.value})}
              value={car.location} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline none'>
              <option value="">Select a Location</option>
              <option value="mumbai">Mumbai</option>
              <option value="bengaluru">Bengaluru</option>
              <option value="Delhi">Delhi</option>
              <option value="kolkata">Kolkata</option>
            </select>
        </div>
        <div className='flex flex-col w-full'>
            <label >Description</label>
            <textarea rows={5} type="text" placeholder='about the car'
            required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.description} onChange={e=>setCar({...car,description:e.target.value})} />
          </div>
          <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary
          text-white rounded-md font-medium w-max cursor-pointer'>
            <img src={assets.tick_icon} alt="" />
            List Your Car
          </button>
      </form>
    </div>
  )
}

export default Addcar
