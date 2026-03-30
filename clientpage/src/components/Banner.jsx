import React from 'react'
import { assets } from '../assets/assets'
const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row items-center md:items-start justify-between
    px-8 md:px-14 py-10
    bg-linear-to-r from-[#0558FE] to-[#A9CFFF]
    max-w-4xl mx-3 md:mx-auto
    rounded-2xl overflow-hidden'>

      <div className='text-white max-w-lg'>
        <h2 className='text-3xl md:text-4xl font-semibold'>
          Own a Luxury Car?
        </h2>

        <p className='mt-3 text-sm md:text-base'>
          Turn your premium vehicle into a steady source of income.
        </p>

        <p className='mt-1'>
          List your car with us and we handle bookings, driver verification,
          insurance, and secure payments.
        </p>

        <button
          className='px-6 py-2 bg-white hover:bg-slate-100
          transition-all text-blue-600 rounded-lg
          text-sm mt-5 cursor-pointer'>
          List your car
        </button>
      </div>

      <img
        src={assets.banner_car_image}
        alt="car"
        className='max-h-48 md:max-h-52 mt-8 md:mt-0'
      />

    </div>
  )
}

export default Banner
