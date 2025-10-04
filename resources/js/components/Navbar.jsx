import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { assets } from '../assets/assets';
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react';


const Navbar = () => {

  const [isOpen,setIsOpen] = useState(false);
  const [user,setUser] = useState(null);

  const {props} = usePage();

  useEffect(()=>{
    setUser(props.auth.user);
    
  },[props]);

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
       <Link to='/' className='max-md:flex-1'>
        <img src={assets.logo} alt="logo" className='w-36 h-auto' />
       </Link>

       <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300
           ${isOpen ? 'max-md:w-full' : 'max-md:w-0'} `}>
          <XIcon onClick={()=> setIsOpen(!isOpen)} className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' />

          <Link onClick={()=> {scrollTo(0,0);setIsOpen(false)}} href='/'>خانه</Link>
          <Link onClick={()=> {scrollTo(0,0);setIsOpen(false)}} href='/movies'>فیلم ها</Link>
          <Link onClick={()=> {scrollTo(0,0);setIsOpen(false)}} href=''>تئاتر</Link>
          <Link onClick={()=> {scrollTo(0,0);setIsOpen(false)}} href=''>ریلز</Link>
          <Link onClick={()=> {scrollTo(0,0);setIsOpen(false)}} href='/favorite'>علاقه مندی ها</Link>
       </div>

       <div className='flex items-center gap-8'>
          <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer'/>
          {
            user ? (
            <Link href='/panel' className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dark transition rounded-full font-medium cursor-pointer'>داشبورد</Link>    
            ):
            (
             <Link href='/login' className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dark transition rounded-full font-medium cursor-pointer'>ورود</Link>    
            )
          }
       </div>

       <MenuIcon onClick={()=> setIsOpen(!isOpen)} className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' />

    </div>
  );
}

export default Navbar;
