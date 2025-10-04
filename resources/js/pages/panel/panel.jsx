import { ChartLineIcon, CircleDollarSignIcon, icons, PlayCircleIcon, StarIcon, UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import BlurCircle from '../../components/BlurCircle';
import dateFormat from '../../lib/dateFormat';
import AppLayout from '../../layouts/AppLayout';
import PanelLayout from './panelLayout';


const Panel = ({reservation_count,seat_count}) => {

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
      title:"تعداد صندلی های رزرو شده",
      value:seat_count || '0',
      icon:ChartLineIcon 
    },
    {
      title:"تعداد فیلم های رزرو شده",
      value:reservation_count || '0',
      icon:PlayCircleIcon
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
    <PanelLayout>
      <Title text1='پنل' text2='کاربر' />
      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top='-100px' right='0px' />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-4  w-full">
          {DashboardCards.map((card, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center 
                        px-4 py-6 bg-primary/10 border border-primary/20 
                        rounded-md h-40 w-full text-center"
            >
              <card.icon className="w-8 h-8 mb-2" />
              <h1 className="text-sm">{card.title}</h1>
              <p className="text-xl font-medium mt-1">{card.value}</p>  
            </div>
          ))}
        </div>
      </div>
    </PanelLayout>
  ) : (
    <Loading />
  )
}

export default Panel;