import React from 'react'
import { assets } from '../assets/assets';
import { ArrowLeft, ArrowRight, Calendar1Icon, ClockIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import backgroundImage from '../assets/backgroundImage.png';

const HeroSection = () => {   

  return (
    <div style={{backgroundImage: `url(${backgroundImage})`}} className={`flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 
         bg-cover bg-center h-screen`}>
        <img src={assets.marvelLogo} alt="logo" className='max-h-11 lg:h-11 mt-20' />
        <h1 className='text-5xl md:text-[70px] md:leading-16 font-semibold max-w-110'>نگهبانان <br /> کهکشان</h1>    
        <div className='flex items-center gap-4 text-gray-300'>
            <span>اکشن | ماجراجویی | هیجان انگیز</span>
            <div className='flex items-center gap-1'>
                <Calendar1Icon className='w-4.5 h-4.5' />
                2018
            </div>
            <div className='flex items-center gap-1'>
                <ClockIcon className='w-4.5 h-4.5' />
                2 ساعت 8 دقیقه
            </div>
        </div>
        <p className='max-w-md text-gray-300'>
            در فیلم نگهبانان کهکشان : درباره پنج ابرقهرمان بین کهکشانی است که برای مقابله با یک نیروی شیطانی که قصد نابودی کهکشان را دارد، متحد شده و گروه نگهبانان کهکشان را تشکیل میدهند...
        </p>
        <Link href={'/movies'} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dark transition rounded-full font-medium cursor-pointer'>
            فیلم های بیشتر
            <ArrowLeft className='w-5 h-5' />
        </Link>
    </div>
  )
}

export default HeroSection;