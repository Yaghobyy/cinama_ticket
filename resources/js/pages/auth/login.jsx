import React, { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import OtpInput from "../../components/OtpInput";
import { Form } from '@inertiajs/react';
import {usePage} from '@inertiajs/react';
import { useRef } from 'react';
import AppLayout from '../../layouts/AppLayout';


const Login = () => {


  const [mobile, setMobile] = useState("");
  const [isOtp,setIsOtp] = useState(false);
  const [otp, setOtp] = useState('');

  const otpForm = useRef();

  const {props} = usePage();

  useEffect(()=>{
    if(props.is_otp){
      setIsOtp(true);
      
    }
    
  },[props])

  const formatMobile = (value) => {
    // فقط عددها
    let digits = value.replace(/\D/g, '')

    // محدودیت 11 رقم
    digits = digits.substring(0, 11)

    // الگوی 4-3-4
    return digits.replace(/(^09\d{0,2})(\d{0,3})(\d{0,4})/, function(_, p1, p2, p3) {
      let formatted = p1
      if (p2) formatted += ' ' + p2
      if (p3) formatted += ' ' + p3
      return formatted
    })
  }

  const validateMobile = (value) => {
    let digits = value.replace(/\D/g, ''); // حذف همه غیر عددها
    const regex = /^09\d{9}$/; // شماره ایران با 09 شروع و 11 رقم
    return regex.test(digits);
  };

  const handleChange = (e) => {
    const value = e.target.value
    setMobile(formatMobile(value))
    if(!validateMobile(value)){
      toast('فرمت شماره موبایل اشتباه می باشد');
      return;
    }
  }

  return (
    <AppLayout>
      <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='border-2 border-gray-300 rounded-2xl px-3 py-10 max-w-lg mx-auto'>
        <h1 className='text-center text-2xl font-medium'>ورود به حساب کاربری</h1>
        <Form action="/send-otp" method='post'
             onSuccess={()=> {
              setIsOtp(true);
              localStorage.setItem('mobile',mobile.replace(/\D/g,''));
             }}

             transform={(data)=> ({...data,mobile:mobile.replace(/\D/g,'')})}
             className='flex flex-col gap-4 mt-5'>
              {
                ({errors})=>{
                    // useEffect(()=>{
                    //   if(errors.mobile){
                    //     toast.error(errors.mobile);
                    //   }  
                    // },[errors])
                  return (
                    <>
                      { errors.mobile && toast(errors.mobile)}
                      <div className='flex flex-col gap-1'>
                      <label className='text-base font-medium' htmlFor="mobile">شماره موبایل</label>
                      <input name='mobile' value={mobile} onChange={handleChange} className='text-right text-lg font-semibold border border-gray-300 px-5 py-2 rounded-xl focus-visible:outline-0 focus-visible:border-gray-100 placeholder:text-base' placeholder='09xx xxx xxxx' type="tel" id="mobile" />
                      </div>
                      <button type='submit'  className='px-6 py-2 sm:px-10 sm:py-2 bg-primary hover:bg-primary-dark transition rounded-xl font-medium cursor-pointer'>ارسال کد</button>
                    </>
                  )
                }
              }
            </Form>
      </div>
    </div>
    </AppLayout>
  )
}

export default Login;