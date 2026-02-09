import React from 'react'
import { Link } from 'react-router-dom'
import { TbLayoutDashboard } from "react-icons/tb";
import { MdAddShoppingCart } from "react-icons/md";
import { MdInventory2, MdPerson, MdSettings, MdLogout } from "react-icons/md";




import AdminProfile from '../sub-components/AdmiProfile'

export const VerticalNavbar = () => {
  return (
    <div className='w-85 h-max-w-screen bg-[#052030] shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]'>

      <div className=' pt-3 h-50  text-black'>
        <AdminProfile />
      </div>

      <div className='w-80 h-200 '>

        <Link to='/' className='text-white  tracking-wider ml-10 flex gap-5 items-center font-semibold 
                                       text-[21px] mt-8'><TbLayoutDashboard />
          Dashboard</Link>


        <Link to='/add-product' className='text-white  tracking-wider ml-10 flex gap-5 items-center font-semibold 
                                       text-[21px] mt-8'><MdAddShoppingCart />
          Add Product</Link>


        <Link to='/product-management' className='text-white  tracking-wider ml-10 flex gap-5 items-center font-semibold 
                                       text-[21px] mt-8'><MdInventory2/>
          Products Management</Link>


        <Link to='/profile' className='text-white  tracking-wider ml-10 flex gap-5 items-center font-semibold 
                                       text-[21px] mt-8'><MdPerson/>
          Profile</Link>


        <Link to='/settings' className='text-white  tracking-wider ml-10 flex gap-5 items-center font-semibold 
                                       text-[21px] mt-8'><MdSettings/>
          Setings</Link>


        <Link to='/logout' className='text-white  tracking-wider ml-10 flex gap-5 items-center font-semibold 
                                       text-[21px] mt-8'><MdLogout/>
          Logout</Link>


      </div>

</div>
  )
}
