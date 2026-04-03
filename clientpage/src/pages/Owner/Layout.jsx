import React from 'react'
import Navbarowner from '../../components/Owner/Navbarowner'
import Sidebar from '../../components/Owner/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col'>
      <Navbarowner/>
      <div className='flex'>
        <Sidebar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout
