import React from 'react'
import { assets } from '../../assets/assets';
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

const AdminSidebar = () => {

    const {props} = usePage();

    const user = {
        firstName: props.auth.user.name,
        lastName: '',
        imageUrl: assets.profile
    };

    const adminNavLinks = [
        { name:'داشبورد', path:'/panel', icon:LayoutDashboardIcon },
        { name:'لیست رزرو ها', path:'/panel/my-bookings', icon:ListCollapseIcon },
    ];

    const { url } = usePage(); // مسیر فعلی از Inertia

    return (
        <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm'>
            <img src={user.imageUrl} alt="user" className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' />
            <p className="mt-2 text-base max-md:hidden">
                {user.firstName} {user.lastName}
            </p>
            <div className="w-full">
                {adminNavLinks.map((link, index) => {
                    const isActive = (url  == link.path);

                    return (
                        <Link
                            key={index}
                            href={link.path}
                            className={`relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pr-10 first:mt-6 text-gray-400 
                                ${isActive ? "bg-primary/15 text-primary group" : ""}`}
                        >
                            <link.icon className='w-5 h-5' />
                            <p className='max-md:hidden'>{link.name}</p>
                            {isActive && (
                                <span className="w-1.5 h-10 rounded-l left-0 absolute bg-primary"></span>
                            )}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminSidebar;
