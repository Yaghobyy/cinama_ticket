import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import dateFormat from '../../lib/dateFormat';

const ListBookings = () => {

  const currency = 'تومان';
  
    const [bookings,setBookings] = useState([]);
  
    const [isLoading,setIsLoading] = useState(true);

    const getAllBookings = async ()=>{
      setBookings(dummyBookingData);
      setIsLoading(false);
    }

    useEffect(()=>{
      getAllBookings();
    },[]);

  return !isLoading ?  (
    <div>
      <Title text1='لیست' text2='رزرو ها' />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-primary/20 text-right text-white'>
            <th className='p-2 font-medium pl-5'>رزرو کننده</th>
              <th className='p-2 font-medium'>نام فیلم</th>
              <th className='p-2 font-medium'>زمان نمایش</th>
              <th className='p-2 font-medium'>صندلی ها</th>
              <th className='p-2 font-medium'>مبلغ</th>
            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {
              bookings.map((item,index)=>(
                <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                  <td className='p-2 min-w-45 pl-5'>
                    {item.user.name}
                  </td>
                  <td className='p-2'>
                    {item.show.movie.title}
                  </td>
                  <td className='p-2'>
                    {dateFormat(item.show.showDateTime)}
                  </td>
                  <td className='p-2'>
                    {Object.keys(item.bookedSeats).map((seat)=> item.bookedSeats[seat]).join(', ') }
                  </td>
                   <td className='p-2'>
                    {item.amount} {currency} 
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default ListBookings;