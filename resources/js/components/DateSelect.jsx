import React, { useState } from 'react'
import BlurCircle from './BlurCircle';
import { ChevronLeftCircle, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { router } from '@inertiajs/react';

const DateSelect = ({dates = [], id}) => {


    const [selected,setSelected] = useState(null);

    const onBookHandler = ()=>{
        if(!selected){
            return toast("لطفا یک تاریخ انتخاب کنید");
        }

        router.visit(`/movies/${id}/${selected}`)
        scrollTo(0,0);
    }

  return (
    <div id='date-select' className='pt-30'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg'>
            <BlurCircle top='-100px' left='-100px' />
            <BlurCircle top='100px' left='0px' />
            <div>
                <p className="text-lg font-semibold">انتخاب تاریخ</p>
                <div className="flex items-center gap-6 text-sm mt-5">
                    <ChevronRightIcon width={28} />
                    <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
                        {
                            (Array.isArray(dates) ? dates : []).map((date)=>(
                                <button key={date} onClick={()=> setSelected(date)}
                                 className={`flex flex-col items-center justify-center h-14 w-14 n aspect-square rounded cursor-pointer ${selected == date ? "bg-primary text-white" : "border border-primary/70" }`}>
                                    <span>{new Intl.DateTimeFormat('fa-IR-u-ca-persian', { day: '2-digit' }).format(new Date(date + 'T00:00:00'))}</span>
                                    <span>{new Intl.DateTimeFormat('fa-IR-u-ca-persian', { month: 'short' }).format(new Date(date + 'T00:00:00'))}</span>
                                </button>
                            ))
                        }
                    </span>
                    <ChevronLeftIcon width={28} />
                </div>
            </div>
            <button onClick={onBookHandler} className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'>رزرو کنید</button>
        </div>
    </div>
  )
}

export default DateSelect;