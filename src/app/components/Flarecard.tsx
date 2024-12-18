import React from 'react'
import { Button, Card as AntCard } from 'antd';
import { Bookmark, CirclePlay } from 'lucide-react';
import { useEffect, useState } from 'react';
import { favouriteAction, getArrayFromLocalStorage } from '../ultilities/localStorageManager';
import Link from 'next/link';

export default function Flarecard({ item, className, isFav, showFav, }: any) {

  const [Fav, setFav] = useState(isFav);
  async function getFav(data: any) {
    const tempData = await getArrayFromLocalStorage('favData');
    const result = tempData.find((item: any) => data?.stationID === item.stationID) ? true : false;
    return result;
}

useEffect(() => {
    async function checkFav() {
        const fav = await getFav(item); 
        setFav(fav)
    }

    checkFav();
}, [item]);

  return (
    <div>
      <AntCard
        className={`lg:min-w-[400px] rounded-3xl overflow-hidden h-fit shadow-md max-w-[410.5px] ${className}`}
        cover={
          <div className="relative h-[280px]">
            {item?.image_url && <img draggable={false}
              alt="Station"
              src={`${item && item?.image_url || "/images/irpc-logo.png"}`} // Replace with your image source
              className="brightness-90 object-cover w-full h-full relative z-0"
            />}
            {showFav !== false && <button className='' onClick={e => {
              e.preventDefault()
              favouriteAction(item,'flare',Fav);
            }}>
              <div onClick={e => setFav((prev: Boolean) => !prev)} className=" absolute top-4 right-4 p-2 duration-150 shadow-sm hover:border-[--primary] hover:bg-[--primary] bg-white/20 glass border-[1px] border-white/80  rounded-full">
                <Bookmark className={`text-white size-4 text-lg ${Fav && "fill-white"}`} />
              </div>
            </button>}
          </div>
        }
      >
        <div className="grid">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[24px] font-semibold">{item?.nameEN}</h3>
          </div>
          <div className="grid grid-cols-2 items-center gap-6 h-12">
            <Link href={`flare/detail/${item?.stationID}/steaming/${item?.stationID}`} className='flex items-center justify-center text-[14px] font-bold h-12'><Button className='w-full' style={{height:'40px'}}><CirclePlay className="size-5" /><span className='font-bold text-base'>ดูสด</span></Button></Link>
            <Button type="primary" className=" py-2 text-[14px] font-bold" style={{height:'40px'}} ><span className='font-bold text-base'>ดูรายละเอียด</span></Button>
          </div>
        </div>
      </AntCard>
    </div>
  )
}
