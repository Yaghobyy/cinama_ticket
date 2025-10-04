import React from 'react'
import { assets } from '../../assets/assets';
import { Link, router } from '@inertiajs/react';
import { LogOutIcon } from 'lucide-react';

const AdminNavbar = () => {
  return (
    <nav className='flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30'>
        <Link href="/" >
            <img src={assets.logo} alt="logo" className='w-36 h-auto' />
        </Link>
        <button onClick={()=> router.post('/logout')} className='flex items-center gap-2 px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dark transition rounded-full font-medium cursor-pointer'>
          <span>خروج</span>  
          <LogOutIcon className='w-5 h-5 bg-primary' />
        </button>
    </nav>
  )
}

export default AdminNavbar;