import React, { useEffect, useState } from 'react'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import Loading from '../components/Loading';
import { ArrowLeftIcon, Clock, ClockIcon } from 'lucide-react';
import isoTimeFormat from '../lib/isoTimeFormat';
import BlurCircle from '../components/BlurCircle';
import toast from 'react-hot-toast';
import { router, usePage } from '@inertiajs/react';
import AppLayout from '../layouts/AppLayout';

const SeatLayout = ({movie,showTimes,seats}) => {

  const {props} = usePage();


  const [selectedSeats,setSelectedSeats] = useState([]);
  const [selectTime,setSelectTime] = useState(null);
  const [show,setShow] = useState(null);

  const [reservationSeats,setReservationSeats] = useState([]);

  
  const handleSeatClick = (seatId)=>{
    if(!selectTime){
      return toast("لطفا در ابتدا سانس خود را انتخاب کنید");
    }
    if(!selectedSeats.includes(seatId) && selectedSeats.length > 4){
      return toast("شما می توانید حداکثر 5 صندلی انتخاب کنید");
    }

    if (reservationSeats.some(rs => rs.id == seatId)) {
      toast.error("این صندلی قبلاً رزرو شده است");
      return; // اینجا جلوی انتخاب رو می‌گیریم
      }  

    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat != seatId) : [...prev,seatId])

  }

  const handleReserveShowtime = ()=>{
    if(selectedSeats.length == 0){
      return toast("لطفا در ابتدا صندلی(ها) خود را انتخاب کنید");
    }

    const isAuthenticated = Boolean((props && props.auth && props.auth.user) || props?.user);
    if (!isAuthenticated) {
      const currentUrl = window.location.pathname + window.location.search;
      return router.visit(`/login?redirect=${encodeURIComponent(currentUrl)}`, { replace: true });
    }

    router.post('/reservation',{
        show_time_id : selectTime.id,
        seat_ids : selectedSeats
      },{onError:(errors)=>{
        if(errors.seat_ids){
          toast.error('صندلی(های) مورد نظر خود را انتخاب کنید');
        }

        if(errors.show_time_id){
          toast.error('سانس خود را انتخاب کنید');
        }
      }});

  }


  const renderSeats = (groupSeats)=>{

    const row = groupSeats[0];

    return (
      <div key={row} className='flex gap-2 mt-2'>
        <div className='flex items-center justify-center flex-wrap gap-2'>
          {
              groupSeats[1].map((seat)=>{
                return (
                  <button key={seat.id} onClick={()=> handleSeatClick(seat.id)}
                    className={`h-8 w-8 rounded border border-primary/60  ${selectedSeats.includes(seat.id) && "bg-primary text-white"} ${reservationSeats.find(rs => rs.id == seat.id) ? "bg-primary/50 text-white cursor-default" : "cursor-pointer" } `}>
                    {row +  seat.number}
                  </button>
                );
              })
          }
        </div>
      </div>
    )
  
  }

  const handleSelectShowTime = (showTime)=>{
    setSelectTime(showTime);

    if(showTime.reservations.length > 0){

      const allSeatReservation = showTime.reservations.flatMap((reservation=>{

        if(reservation.seats && reservation.seats.length > 0){
          return reservation.seats;
        }

        return [];

      }))
      
      setReservationSeats(allSeatReservation);
    }else{
      setReservationSeats([]);
    }
    
  }

  useEffect(()=>{
    console.log(reservationSeats)
    setShow({
      movie:movie,
      showTimes
    });
  },[reservationSeats])

  return show ?  (
    <AppLayout>
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>

      {/* avaliable timings  */}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
        <p className='text-lg font-semibold px-6'>سانس های موجود</p>
        <div className='mt-5 space-y-1'>
          {
            showTimes.map((showTime)=>(
              <div key={showTime.id} onClick={()=> handleSelectShowTime(showTime)}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectTime?.start_time == showTime.start_time ? "bg-primary text-white" : "hover:bg-primary/20"}`}>
                <ClockIcon className='w-4 h-4' />
                <p className='text-sm'>{isoTimeFormat(showTime.start_time) + ' - ' + isoTimeFormat(showTime.end_time)}</p>
              </div>
            ))
          }
        </div>
      </div>

      {/* seat layout  */}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
          <BlurCircle top='-100px' left='-100px' />
          <BlurCircle top='0px' left='0px' />
          <h1 className="text-2xl font-semibold mb-4">صندلی خود را انتخاب کنید</h1>
          <img src={assets.screenImage} alt="screen" className='' />
          <p className='text-gray-400 text-sm mb-6'>سمت صحفه نمایش</p>
          <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
              <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
                {
                 Object.entries(seats).slice(0,2).map((groupSeats)=>{
                  return renderSeats(groupSeats)
                 })
                }
              </div>
              <div className='grid grid-cols-2 gap-11'>
                {
                 Object.entries(seats).slice(2).map((groupSeats)=>{
                  return renderSeats(groupSeats)
                 })
                }
              </div>
          </div>

          <button onClick={handleReserveShowtime} className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dark transition font-medium rounded-full cursor-pointer active:scale-95'>
              ادامه و رزرو کردن
              <ArrowLeftIcon strokeWidth={3} className='w-4 h-4' />  
          </button>     

      </div>

    </div>
    </AppLayout>
  ) : (
    <Loading />
  )
}

export default SeatLayout;