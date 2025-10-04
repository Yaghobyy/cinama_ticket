import { ChartLineIcon, CircleDollarSignIcon, icons, PlayCircleIcon, StarIcon, UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import BlurCircle from '../../components/BlurCircle';
import dateFormat from '../../lib/dateFormat';
import AppLayout from '../../layouts/AppLayout';


const Dashboard = () => {

  const currency = 'تومان';

  const [dashboardData,setDashboardData] = useState({
    totalBookings:0,
    totalRevenue:0,
    activeShows:[],
    totalUser:0
  });

  const [isLoading,setIsLoading] = useState(true);

  const DashboardCards = [
    {
      title:"تعداد رزرو ها",
      value:dashboardData.totalBookings || '0',
      icon:ChartLineIcon 
    },
    {
      title:"مجموع درآمد",
      value:dashboardData.totalRevenue || '0',
      icon:CircleDollarSignIcon
    },
    {
      title:"فیلم های فعال",
      value:dashboardData.activeShows.length || '0',
      icon:PlayCircleIcon
    },
     {
      title:"تعداد کاربران",
      value:dashboardData.totalUser || '0',
      icon:UserIcon
    },
  ];

  const fetchDashboardData = async ()=>{
    setDashboardData(dummyDashboardData);
    setIsLoading(false);
  }

  useEffect(()=>{
    fetchDashboardData();
  },[])

  return !isLoading ? (
    <AppLayout>
      <Title text1='داشبورد' text2='مدیر' />
      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top='-100px' right='0px' />
        <div className="flex flex-wrap gap-4 w-full">
          {
            DashboardCards.map((card,index)=>(
              <div key={index} className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full">
                <div>
                  <h1 className='text-sm'>{card.title}</h1>
                  <p className='text-xl font-medium mt-1'>{card.value}</p>  
                </div>
                <card.icon className='w-6 h-6' />    
              </div>
            ))
          }
        </div>
      </div>
      <p className='mt-10 text-lg font-medium'>فیلم های فعال</p>
      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
        <BlurCircle top='100px' right='-10%' />
        {
          dashboardData.activeShows.map((show)=>(
            <div key={show._id} className="w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300">
              <img src={show.movie.poster_path} alt="movie" className=' h-60 w-full object-cover' />
              <p className="font-medium p-2 truncate">{show.movie.title}</p>
              <div className="flex items-center justify-between px-2">
                <p className='font-medium text-lg'>{currency}{show.showPrice}</p>
                <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                  <StarIcon className='w-4 h-4 text-primary fill-primary' />
                  {show.movie.vote_average.toFixed(1)}
                </p>
              </div>
              <p className="px-2 pt-2 text-sm text-gray-400">
                {dateFormat(show.showDateTime)}
              </p>
            </div>
          ))
        }
      </div>
    </AppLayout>
  ) : (
    <Loading />
  )
}

export default Dashboard;