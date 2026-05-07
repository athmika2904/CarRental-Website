import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { useLocation,Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/carDetails';
import MyBookings from './pages/MyBookings';
import Footer from './components/Footer';
import Layout from './pages/Owner/Layout';
import Dashboard from './pages/Owner/Dashboard';
import ManageCars from './pages/Owner/ManageCars';
import Addcar from './pages/Owner/Addcar';
import Managebookings from './pages/Owner/Managebookings';
import Login from './components/Login';
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext';
const App = () => {
  const {showlogin}=useAppContext();
  const isOwnerpath=useLocation().pathname.startsWith('/owner')

  return (
    <>
    <Toaster/>
    {showlogin && <Login />}
    
      {!isOwnerpath && <Navbar />}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/car-details/:id' element={<CarDetails/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/owner' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-car' element={<Addcar/>}/>
          <Route path='manage-cars' element={<ManageCars/>}/>
          <Route path='manage-bookings' element={<Managebookings/>}/>
        </Route>
      </Routes>
      {!isOwnerpath && <Footer/>}
    </>
  )
}

export default App

