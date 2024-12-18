'use client'
import { Card as AntCard } from 'antd';
import { Bookmark } from 'lucide-react';
import Image from 'next/image';
import Badge from './Badge';
import { favouriteAction, getArrayFromLocalStorage } from '../ultilities/localStorageManager';
import { useEffect, useState } from 'react';
import { ShortDateFormator } from '../ultilities/DateFormater';
import { isOnline } from './OnlineDot';

export default function Card({ data, className, isFav, showFav }: any) {
    const [Fav, setFav] = useState(isFav);

    async function getFav(data: any) {
        const tempData = await getArrayFromLocalStorage('favData');
        const result = tempData.find((item: any) => data?.stationID === item.stationID) ? true : false;
        return result;
    }

    useEffect(() => {
        async function checkFav() {
            const fav = await getFav(data); 
            setFav(fav)
        }

        checkFav();
    }, [data]);

    return <>
        <AntCard
            className={`lg:min-w-[400px] rounded-3xl overflow-hidden shadow-md  h-fit  max-w-[410.5px] ${className}`}
            cover={
                <div className="relative h-[280px]">
                    {data?.image_url && <img draggable={false}
                        alt="Station"
                        src={`${data && data?.image_url || "/images/irpc-logo.png"}`} // Replace with your image source
                        className="brightness-90 object-cover w-full h-full relative z-0"
                    />}
                    {showFav !== false && <button className='' onClick={async (e) => {
                        e.preventDefault()

                        favouriteAction(data, 'air', Fav);

                    }}>

                        <div onClick={e => setFav((prev: Boolean) => !prev)} className=" absolute top-4 right-4 p-2 duration-150 shadow-sm hover:border-[--primary] hover:bg-[--primary] bg-white/20 glass border-[1px] border-white/80  rounded-full">
                            <Bookmark className={`text-white size-4 text-lg ${Fav && "fill-white"}`} />
                        </div>
                    </button>}

                    <div className="bg-black/20 backdrop-blur-md border-t-[1px] border-white/30 absolute flex w-full justify-between bottom-0 px-4 py-6 items-center z-1">

                        <div className=" text-white ">
                            <span className="text-4xl font-bold">{data?.LastUpdate?.AQI?.aqi}</span>
                            <span className="text-lg pl-2">AQI</span>
                        </div>
                        <div className=" text-white">
                            <p className="text-sm">ความเร็วลม</p>
                            <p className="text-sm font-semibold flex gap-2 items-center"><span><Image src="/icons/wind.svg" width={15} height={15} alt="wind icon"></Image></span>
                                {data?.LastUpdate?.WS?.value} ms</p>
                        </div>

                    </div>
                </div>
            }
        >
            <div className="grid justify-items-evenly">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[24px] font-semibold text-ellipsis line-clamp-1" >{data?.nameTH}</h3>
                    <Badge className=" " status={data?.LastUpdate?.AQI?.color_id || "-"}></Badge>
                </div>
                <div className="flex justify-between py-1 items-center text-[16px] text-[#475467]">
                    <p>PM<sub>2.5</sub></p>
                    <p className="font-bold">{data?.LastUpdate?.PM25?.value} µg/m<sup>3</sup></p>
                </div>
                <div className="bg-[#EAECF0] h-[1px] w-full"></div>
                <div className="flex justify-between py-1 items-center text-[16px] text-[#475467] mt-1">
                    <p> PM <sub>10</sub></p>
                    <p className="font-bold">{data?.LastUpdate?.PM10?.value} µg/m<sup>3</sup></p>
                </div>
                <div className="flex font-light text-[#475467]">
                    <p className="flex gap-2 relative items-center ">
                        {isOnline(new Date(`${data?.LastUpdate?.date}T${data?.LastUpdate?.time}`))}
                        อัพเดทล่าสุด: </p>
                    <p> &nbsp; {ShortDateFormator(new Date(`${data?.LastUpdate?.date}T${data?.LastUpdate?.time}`))}</p>
                </div>

            </div>
        </AntCard>
    </>
}