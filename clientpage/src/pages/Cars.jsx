import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets, dummyCarData } from '../assets/assets'
import Carcard from '../components/Carcard';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';
const Cars = () => {
  const [searchParams]=useSearchParams()
  const pickupLocation=searchParams.get('pickupLocation')
  const pickupDate=searchParams.get('pickupDate')
  const returnDate=searchParams.get('returnDate')
  const {cars,axios}=useAppContext();
  console.log("CONTEXT CARS:", cars);
console.log("TYPE:", typeof cars);
console.log("IS ARRAY:", Array.isArray(cars));
  const [input,setInput]=useState('');
  const isSearchData=pickupLocation && pickupDate && returnDate
  const [filteredCars,setFilteredCars]=useState([])
  console.log(pickupLocation);
  const applyFilter=async()=>{
    if(input===''){
      setFilteredCars(cars)
      return null
    }
    const filtered=cars.slice().filter((c)=>{
      return c.brand.toLowerCase().includes(input.toLowerCase())
      || c.model.toLowerCase().includes(input.toLowerCase())
      || c.category.toLowerCase().includes(input.toLowerCase())
      || c.transmission.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)
  }
  const searchCarAvailability=async()=>{
    try{
      console.log("API CALLED");
    const {data}=await axios.post('/api/bookings/check-availability',{location:pickupLocation,pickupDate,returnDate})
    console.log(data);
    if(data.success){
      console.log("SETTING FILTERED CARS");
      setFilteredCars(data.availableCars)
      if(data.availableCars.length===0){
        toast('No cars available')
      }
      return null
    }
    }
    catch(error){
      toast.error(error.message);
    }
  }
  useEffect(() => {
  if (isSearchData) {
    searchCarAvailability();
  }
}, [pickupLocation, pickupDate, returnDate]);
  useEffect(() => {
  console.log("FILTERED CARS UPDATED:", filteredCars);
}, [filteredCars]);
useEffect(() => {
  if (Array.isArray(cars) && !isSearchData) {
    applyFilter();
  }
}, [input, cars, isSearchData]);
  return (
    <div>
      <motion.div
      initial={{y:30,opacity:0}}
      animate={{y:0,opacity:1}} transition={{duration:0.6,ease:"easeOut"}}
      className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title='Available Cars' subtitle='Browse our selection of permium vehicles available for 
        your next adventure'></Title>
        <motion.div
        initial={{y:20,opacity:0}}
      animate={{y:0,opacity:1}} transition={{duration:0.5,delay:0.3}}
        
        className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'>
          <img src={assets.search_icon} alt="search" className='w-4.5 h-4.5 mr-2'/>
          <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Search by make, model, or features' className='
          w-full h-full outline-none text-gray-500'/>
          <img src={assets.filter_icon} alt="search" className='w-4.5 h-4.5 ml-2'/>
        </motion.div>
      </motion.div>
      <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}} transition={{duration:0.5,delay:0.6}}
      className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-gray-500 mb-2'>Showing {filteredCars.length} Cars</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
            {filteredCars.map((car,index)=>(
              <motion.div
              initial={{y:20,opacity:0}}
      animate={{y:0,opacity:1}} transition={{duration:0.4,delay:0.1*index}}
              key={index}>
                <Carcard car={car}/>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Cars
