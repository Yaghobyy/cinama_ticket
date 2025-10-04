import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import BlurCircle from '../../components/BlurCircle';
import { assets, dummyBookingData } from '../../assets/assets';
import timeFormat from '../../lib/timeFormat';
import dateFormat from '../../lib/dateFormat';
import AppLayout from '../../layouts/AppLayout';
import PanelLayout from './panelLayout';
import { Link, router, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';

const MyBooking = ({reservations}) => {

  const currency = 'تومان';

  const [bookings,setBookings] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  const {props} = usePage();

  const getMyBookings = async ()=>{
    setBookings(dummyBookingData);
    setIsLoading(false);
  }

  function isPaid(reservation){
    return reservation.payments.some(payment=>payment.status === 'paid');
  }

  useEffect(()=>{
    getMyBookings();
    console.log(reservations);
    
  },[])

  useEffect(()=>{
    if(props.is_paid){
      toast.success('پرداخت موفق');
    }else{
      toast.error('پرداخت ناموفق');
    }
  },[props?.is_paid]);


  return !isLoading ?(
    <PanelLayout>
      <div className='relative min-h-[80vh]'>
      <BlurCircle top='100px' right='100px' />
      <div>
        <BlurCircle bottom='0px' right='600px' />
      </div>
      <h1 className='text-lg font-semibold mb-4'>رزرو های من</h1>
      {
        reservations.map((reservation)=>(
          <div key={reservation.id} className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl '>
            <div className="flex flex-col md:flex-row">
              <img src={reservation.show_time.movie.poster_url} alt="poster" className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded' />
              <div className="flex flex-col p-4">
                <p className='text-lg font-semibold'>{reservation.show_time.movie.title}</p>
                <p className="text-gray-400 text-sm mt-auto">
                  {`${reservation.show_time.start_time.split(':').slice(0,2).join(':')} - ${reservation.show_time.end_time.split(':').slice(0,2).join(':')}`}
                </p>                
                <p className="text-gray-400 text-sm mt-auto">{dateFormat(reservation.show_time.show_date)}</p>
              </div>
            </div>
            <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
              <div className="flex items-center gap-4">
                <p className='text-2xl font-semibold mb-3'>
                  {new Intl.NumberFormat('fa-IR').format((reservation.price * reservation.seats.length))}
                  <span className='text-base mx-2'>{currency}</span>
                  </p>
                {
                  !isPaid(reservation) && 
                  <a href={`/panel/payment/${reservation.id}`} target='_blank' className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'>
                    پرداخت
                  </a>
                }
              </div>
              <div className='text-sm'>
                <p className='flex items-center justify-between'>
                  <span className='text-gray-400'>مجموع بلیط ها:</span>
                  {reservation.seats.length}
                </p>
                <p className='flex items-center justify-between'>
                  <span className='text-gray-400'>شماره صندلی(ها):</span>
                  {reservation.seats.map(seat=>seat.row + seat.number).join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))
      }
      </div>
    </PanelLayout>
  ) : (
    <Loading />
  )
}

export default MyBooking;