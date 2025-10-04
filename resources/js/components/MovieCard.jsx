import { StarIcon } from 'lucide-react';
import React from 'react'
import { Link, router } from '@inertiajs/react';
import timeFoarmat from '../lib/timeFormat';

const MovieCard = ({movie}) => {
  return (
    <div className='flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:translate-y-1 transition duration-300 w-66'>
        <Link href={`/movies/${movie.id}`}>
        <img
         onClick={()=> {scrollTo(0,0)}}
         src={movie.poster_url} alt="movie" className='rounded-lg h-52 w-full object-center cursor-pointer' />
        </Link>
        <p className='font-semibold mt-2 truncate'>{movie.title}</p>
        <p className='text-sm text-gray-400 mt-2'>
            {movie.release_year} . {movie.genres.slice(0,2).map(item=>item.name).join(' | ')} . {timeFoarmat(movie.duration)}
        </p>
        <div className='flex items-center justify-between mt-4 pb-3'>
            <button 
            onClick={()=> {router.visit(`/movies/${movie.id}`); scrollTo(0,0)}}
            className='px-4 py-2 text-xs bg-primary hover:bg-primary-dark transition rounded-full font-medium cursor-pointer'>خرید بلیط</button>
            <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
                <StarIcon className='w-4 h-4 text-primary fill-primary' />
                {movie.rating}
            </p>
        </div>
    </div>
  )
}

export default MovieCard;