import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
const Testimonial = () => {
    const testimonials=[{
  id: 1,name: "Aaravi Sharma",address: "Mumbai, India",
  image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200",rating: 5,
  testimonial: "Booking a luxury car was super easy. The vehicle was spotless, pickup was on time, and the entire process felt premium. Definitely using this service again!"
},
{
  id: 2,name: "Riya Patel",address: "Delhi, India",
  image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=200",
  rating: 4,testimonial: "Great experience overall! The car was in excellent condition and the booking process was very smooth. Perfect for weekend trips and special occasions."
},
{
  id: 3,name: "Arjun Reddy",address: "Bengaluru, India",
  image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=200",
  rating: 5,testimonial: "Amazing service! I rented a car for a business trip and everything was handled professionally. Quick booking, verified drivers, and secure payment made it stress-free."
}]
  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
            <Title title="What Our Customers Say" subtitle="Discover why discerning travelers choose GoDrive for
            their luxury accomodations around the world."/>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {testimonials.map((testimonial,index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:translate-y-1 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className=" text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img src={assets.star_icon} alt="star" key={index} />
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.testimonial}"</p>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Testimonial
