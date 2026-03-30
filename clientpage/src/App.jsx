import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { useLocation,Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cars from './pages/Cars';
import carDetails from './pages/carDetails';
import MyBookings from './pages/MyBookings';
import Footer from './components/Footer';
const App = () => {
  const [showlogin,setShowLogin]=useState(false);
  const isOwnerpath=useLocation().pathname.startsWith('/owner')
  return (
    <>
      {!isOwnerpath && <Navbar setShowLogin={setShowLogin}/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/car-details/:id' element={<carDetails/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
      </Routes>
      {!isOwnerpath && <Footer/>}
    </>
  )
}

export default App

