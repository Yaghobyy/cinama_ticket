import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import dateFormat from '../../lib/dateFormat';

const ListShow = () => {

  const currency = 'تومان';

  const [shows,setShows] = useState([]);

  const [isLoading,setIsLoading] = useState(true);

  const getAllShows = async()=>{
    try{
      setShows([
        {
          movie:dummyShowsData[0],
          showDateTime:'2025-06-30',
          showPrice:59,
          occupiedSeats:{
            A1:'user_1',
            B1:'user_2',
            C1:'user_3'
          }
        }
      ]);
      setIsLoading(false);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllShows();
  },[]);

  return !isLoading ? (
    <div>
      <Title text1='لیست' text2='فیلم ها' />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-primary/20 text-right text-white'>
              <th className='p-2 font-medium pl-5'>نام فیلم</th>
              <th className='p-2 font-medium'>زمان نمایش</th>
              <th className='p-2 font-medium'>تعداد رزرو ها</th>
              <th className='p-2 font-medium'>درآمد</th>
            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {
              shows.map((show,index)=>(
                <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                  <td className='p-2 min-w-45 pl-5'>
                    {show.movie.title}
                  </td>
                  <td className='p-2'>
                    {dateFormat(show.showDateTime)}
                  </td>
                  <td className='p-2'>
                    {Object.keys(show.occupiedSeats).length}
                  </td>
                   <td className='p-2'>
                    {Object.keys(show.occupiedSeats).length * show.showPrice} {currency} 
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

export default ListShow;