import React from 'react'
import CustomNavbar from '../components/user/navbar/navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/user/footer/Footer'

export default function UserLayout() {
  return (
    <>
    <CustomNavbar/>
    <div className='min-vh-100'>
      <Outlet />
    </div>
    <Footer />
    </>
  )
}
