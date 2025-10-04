import React from 'react'
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <>
      <footer className="px-6 md:px-16 lg:px-36 mt-40 w-full text-gray-300">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14">
                <div className="md:max-w-96">
                    <img alt="logo" className="w-36 h-auto" src={assets.logo} />
                    <p className="mt-6 text-sm">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                        <img src={assets.googlePlay} alt="google play" className="h-9 w-auto" />
                        <img src={assets.appStore} alt="app store" className="h-9 w-auto" />
                    </div>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
                    <div>
                        <h2 className="font-semibold mb-5">دسترسی سریع</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="#">خانه</a></li>
                            <li><a href="#">درباره ما</a></li>
                            <li><a href="#">تماس باما</a></li>
                            <li><a href="#">سیاست ها و قوانین</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5">با ما در تماس باشید</h2>
                        <div className="text-sm space-y-2">
                            <p>0912-000-0000</p>
                            <p>yaghoob004242@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-sm pb-5">
                Copyright {new Date().getFullYear()} ©  Created By <a href="#">yaghoob</a>
            </p>
        </footer>
    </>
  )
}

export default Footer;