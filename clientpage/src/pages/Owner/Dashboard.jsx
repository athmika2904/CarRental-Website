import React, { useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import TitleOwner from '../../components/Owner/TitleOwner'

const Dashboard = () => {
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0
  })

  const dashboardcards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored },
    { title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored }
  ]

  useEffect(() => {
    setData(dummyDashboardData)
  }, [])

  return (
    <div className='px-4 pt-10 md:px-10 flex-1'>
      
      <TitleOwner 
        title="Admin Dashboard" 
        subtitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities" 
      />

      {/* Dashboard Cards */}
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-4xl'>
        {dashboardcards.map((card, index) => (
          <div key={index} className='flex items-center justify-between p-4 rounded-md border border-borderColor'>
            <div>
              <h1 className='text-xs text-gray-500'>{card.title}</h1>
              <p className='text-lg font-semibold'>{card.value}</p>
            </div>
            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary/10'>
              <img src={card.icon} alt="" className='h-4 w-4' />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className='flex flex-col lg:flex-row items-start gap-6 mb-8 w-full'>

        {/* Recent Bookings */}
        <div className='p-4 md:p-6 border border-borderColor rounded-md w-full lg:max-w-lg'>
          <h1 className='text-lg font-medium'>Recent Bookings</h1>
          <p className='text-gray-500'>Latest customer bookings</p>

          <div className='mt-4 space-y-4'>
            {data.recentBookings.map((booking, index) => (
              <div key={index} className='flex items-center justify-between'>
                
                <div className='flex items-center gap-3'>
                  <div className='hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10'>
                    <img src={assets.listIconColored} alt="" className='h-5 w-5' />
                  </div>

                  <div>
                    <p className='font-medium'>
                      {booking.car.brand} {booking.car.model}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {booking.createdAt.split('T')[0]}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <p className='text-sm text-gray-500'>
                    ₹{booking.price}
                  </p>
                  <p className='px-3 py-0.5 border border-borderColor rounded-full text-sm'>
                    {booking.status}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className='p-4 md:p-6 border border-borderColor rounded-md w-full md:max-w-xs'>
          <h1 className='text-lg font-medium'>Monthly Revenue</h1>
          <p className='text-gray-500'>Revenue for current month</p>

          <p className='text-3xl mt-6 font-semibold text-primary'>
            ₹{data.monthlyRevenue}
          </p>
        </div>

      </div>
    </div>
  )
}

export default Dashboard