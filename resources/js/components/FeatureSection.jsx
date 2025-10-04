import { ArrowLeft } from 'lucide-react';
import React from 'react'
import BlurCircle from './BlurCircle';
import { dummyShowsData } from '../assets/assets';
import MovieCard from './MovieCard';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';

const FeatureSection = ({movies }) => {

  useEffect(()=>{
    console.log(movies);

  },[])


  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
        <div className='relative flex items-center justify-between pt-20 pb-10'>
            <BlurCircle top='0' right='-80px'/>
            <p className='text-gray-300 font-medium text-lg'> در حال اکران</p>
            <button onClick={()=> navigate('/movies')} className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer'>
                مشاهده همه
                <ArrowLeft className='group-hover:translate-x-0.5 transition w-4.5 h-4.5' />
            </button>
        </div>
        <div className='flex flex-wrap max-sm:justify-center gap-8 mt-8'>
          {
            (Array.isArray(movies) ? movies : []).slice(0,4).map((movie)=>(
              <MovieCard key={movie.id} movie={movie} />
            ))
          }
        </div>
        <div className="flex items-center justify-center mt-20">
          <Link
          href={'/movies'}
          onClick={()=> {scrollTo(0,0)}}  
          className='px-10 py-3 text-sm bg-primary hover:bg-primary-dark transition rounded-md font-medium cursor-pointer'>نمایش  بیشتر</Link>
        </div>
    </div>
  )
}

export default FeatureSection;