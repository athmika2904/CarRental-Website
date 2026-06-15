import React, { useEffect, useState } from 'react'
import TitleOwner from '../../components/Owner/TitleOwner';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
const Managebookings = () => {
  const {axios}=useAppContext();
  const[book,setBook]=useState([]);
  const fetchBooking=async()=>{
    try {
      const {data}=await axios.get('/api/bookings/owner')
      data.success? setBook(data.bookings):toast.error(data.message)
    } catch (error) {
      toast.error(error.message);
    }
  }
  const changeBookingStatus=async(bookingId,status)=>{
    try {
      const {data}=await axios.post('/api/bookings/change-status',{bookingId,status})
      if(data.success){
        toast.success(data.message)
        fetchBooking()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    fetchBooking();
  },[])
  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <TitleOwner title="Manage Bookings" subtitle="Track all customer bookings, 
      approve or cancel requests, and manage booking statuses."/>
      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-md:hidden'>Date range</th>
              <th className='p-3 font-medium'>Total</th>
              <th className='p-3 font-medium max-md:hidden'>Payment</th>
              <th className='p-3 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {book.map((b,index)=>(
              <tr key={index} className='border-t border-borderColor text-gray-500'>
                <td className='p-3 flex items-center gap-3'>
                  <img src={b.car.image} alt="" className='h-12 w-12 aspect-square
                  rounded-md object-cover'/>
                    <p className='font-medium max-md:hidden'>{b.car.brand} {b.car.model}</p>
                  
                </td>
                <td className='p-3 max-md:hidden'>
                  {b.pickupDate?.split('T')[0]} to {b.returnDate?.split('T')[0]}
                </td>
                <td className='p-3'>₹{b.price}</td>
                <td className='p-3 max-md:hidden'>
                  <span className='bg-gray-100 px-3 py-1 rounded-full text-xs'>offline
                  </span>
                </td>
                <td className='p-3'>
                  {b.status==='pending'?(
                    <select className='px-2 py-1.5 mt-1 text-gray-500 border
                    border-borderColor rounded-md outline-none' value={b.status} onChange={e=>changeBookingStatus(b._id,e.target.value)}>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ):(
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${b.status==='confirmed'?'bg-green-100 text-green-500':'bg-red-100 text-red-500'}`}>{b.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Managebookings
