'use client'

import { FlagOff } from "lucide-react";
import { useEffect, useState } from "react";
import { getArrayFromLocalStorage } from "../ultilities/localStorageManager";
import Card from "./Card";
import WaterCard from "./WaterCard";
import SoundCard from "./SoundCard";
import EnvironmentCard from "./EnvironmentCard";
import StationCard from "./StationCard";
import Flarecard from "./Flarecard";
import { useDragScroll } from "./Draggable";
import Link from "next/link";


export default function Favourite({ className }: any) {
    const [ref] = useDragScroll();
    const [Fav, setFav] = useState<any>([]);

    function getFav() {
        const localFav = getArrayFromLocalStorage('favData');
        // console.log(localFav)
        setFav(localFav || []);
    }

    useEffect(() => {
        getFav();
    }, []);

    return <section className="bg-[#F9FAFB] max-w-[90vw] py-10 mx-auto">
        <div className="text-[24px] font-bold py-5">รายการโปรด ({Fav?.length || 0})</div>
        <div ref={ref} className={`flex gap-10 overflow-x-auto py-5 px-2 w-[90vw] ${className}`}>
            {Fav?.map((item: any) => {
                return <>
                    {item?.type == "air" && <Link key={item?.stationID} href={`/air/detail/${item.stationID}`}><Card data={item} isFav={true}  className=" lg:min-w-[400px] prevent-select min-w-[330px] min-h-[510px]"></Card></Link>}
                    {item?.type == "water" && <Link key={item?.stationID} href={`/water/detail/${item.stationID}`}><WaterCard data={item} isFav={true}  className=" lg:min-w-[400px] prevent-select min-w-[330px] min-h-[510px]"></WaterCard></Link>}
                    {item?.type == "sound" && <Link key={item?.stationID} href={`/sound/detail/${item.stationID}`}><SoundCard data={item} isFav={true}  className=" lg:min-w-[400px] prevent-select min-w-[330px] min-h-[510px]"></SoundCard></Link>}
                    {item?.type == "flare" && <Link key={item?.stationID} href={`/flare/detail/${item.stationID}`}><Flarecard item={item} isFav={true}  className=" lg:min-w-[400px] prevent-select min-w-[330px] min-h-[510px]"></Flarecard></Link>}
                    {item?.type == "env" && <Link key={item?.stationID} href={`/environment/detail/${item.stationID}`}><EnvironmentCard data={item} isFav={true}  className=" lg:min-w-[400px] prevent-select min-w-[330px] min-h-[510px]"></EnvironmentCard></Link>}
                    {item?.type == "eqms" && <Link key={item?.stationID} href={`/EQMs/detail/${item.stationID}`}><StationCard data={item} isFav={true}  className=" lg:min-w-[400px] prevent-select min-w-[330px] min-h-[510px]"></StationCard></Link>}
                </>

            })}
            {Fav?.length == 0 && <div className="w-full flex justify-center flex-col gap-5 items-center">
                <FlagOff className="size-[48px] text-[--primary]"></FlagOff>
                No have favourites.</div>}

        </div>



    </section>
}