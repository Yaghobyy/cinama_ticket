import React, { useEffect, useState } from 'react'
import {dummyShowsData} from '../assets/assets';
import BlurCircle from '../components/BlurCircle';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import timeFormat from '../lib/timeFormat';
import DateSelect from '../components/DateSelect';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import { Link } from '@inertiajs/react';
import AppLayout from '../layouts/AppLayout';

const MovieDetails = ({movie,movies,show_dates}) => {

  

  const [show,setShow] = useState(null);

  useEffect(()=>{
    setShow({
      movie : movie,
      dates : Array.isArray(show_dates) ? show_dates : []
    });
  },[movie, show_dates])


  return show ? (
    <AppLayout>
      <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        <img src={show.movie.poster_url} alt="movie" className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover' />
        <div className='relative flex flex-col gap-3'>
          <BlurCircle top='-100px' left='-100px' />
          <p className='text-primary'>{show.movie.language}</p>
          <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</h1>
          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className='w-5 h-5 text-primary fill-primary' />
            {show.movie.rate} امتیاز کاربران
          </div>
          <div className="text-gray-400 mt-2 text-sm leading-tight max-w-xl"
          
            dangerouslySetInnerHTML={{__html:show.movie.description || ''}}>
            
          </div>
          <p>
            {timeFormat(show.movie.duration)} . 
            {show.movie.genres.map((genre)=> genre.name).join(', ')} . 
            {show.movie.release_year}
          </p>
          <div className='flex items-center gap-4 flex-wrap mt-4'>
            <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
              <PlayCircleIcon className='w-5 h-5' />
              تماشای تیزر
              </button>
            <a href="#date-select" className='px-10 py-3 text-sm bg-primary hover:bg-primary-dark transition rounded-md font-medium cursor-pointer active:scale-95'>خرید بلیط</a>
            <button>
              <Heart className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>

      <p className='text-lg font-medium mt-20'>بازیگران فیلم</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className='flex items-center gap-4 w-max px-4'>
          {
            show.movie.artists.slice(0,12).map((artist,index)=>(
              <div key={index}>
                <img src={artist.image_url} alt="profile" className='rounded-full h-20 md:h-20 aspect-square object-cover' />
                <p className='font-medium text-xs mt-3'>{artist.name}</p>
              </div>
            ))
          }
        </div>
      </div>

      <DateSelect dates={show.dates} id={show.movie.id} />    

      <p className='text-lg font-medium mt-20 mb-8'>سایر فیلم های پیشنهادی برای شما</p> 
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
          {
            movies.map((movie,index)=>(
              <MovieCard movie={movie} key={index}/>
            ))
          }
      </div>

      <div className='flex justify-center mt-20'>
          <Link href='/movies' onClick={()=> {scrollTo(0,0)}} className='px-10 py-3 text-sm bg-primary hover:bg-primary-dark transition rounded-md font-medium cursor-pointer'>
            نمایش بیشتر
          </Link>
      </div>


    </div>
    </AppLayout>
  ) : (
    <Loading />
  )
}

export default MovieDetails;