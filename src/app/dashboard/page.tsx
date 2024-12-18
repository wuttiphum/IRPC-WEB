'use client'
import { Button } from "antd";
import SegmentMenu from "../components/SegmentMenu";
import { FullDateFormator } from "../ultilities/DateFormater";
import { CloudDownload, RefreshCw } from "lucide-react";
import Image from "next/image";
import Footer from "../components/Footer";
import Link from "next/link";
import { getData } from "../ultilities/api";
import { useEffect } from "react";
import { total } from "../globals";

export default function Page() {

    const fetchAll = async () => {
        const air = await getData('/forWeb/getAirLast.php')
        const water = await getData('/forWeb/getWaterLast.php')
        const cems = await getData('/forWeb/getCemsLast.php')
        const sound = await getData('/forWeb/getSoundLast.php')
    
    
        air?.stations && localStorage.setItem("air",air?.stations?.length)
        water?.stations && localStorage.setItem("water",water?.stations?.length)
        cems?.stations && localStorage.setItem("environment",cems?.stations?.length)
        sound?.stations && localStorage.setItem("sound",sound?.stations?.length)
      }
    

    return <>

        <section id="header" className="px-10 py-4 bg-white">

            <SegmentMenu />
            <div className="flex flex-wrap gap-5 justify-between items-end">
                <div className="">
                    <div className="text-[18px] text-[--primary] font-bold">ประจำ{FullDateFormator(new Date())}</div>
                    <div className="text-[36px] font-bold">Dashboard</div>
                </div>
                <div className="text-[16px] font-bold flex gap-2">
                    <Button onClick={()=>{
                        fetchAll();
                        window.location.reload();
                    }} className=" w-[150px]"><RefreshCw className='size-[14px]' /> อัปเดต</Button>
                </div>
            </div>

        </section>


        <div className="bg-white grid lg:grid-cols-2 md:grid-cols-2  gap-5 px-10 py-10 ">
            <Link href="/Dashboard/air" className=" rounded-xl p-5 border-2">
                <div className="flex gap-2 items-center pb-5">
                <Image src="/images/sulu3.svg" alt="" width={300} height={300} className="w-10 " >
                </Image><div className="text-xl font-bold text-[--primary]">คุณภาพอากาศ</div>
                </div>
                <div className="grid">
                    <div className="text-sm text-gray-800">สถานีตรวจวัดทั้งหมด</div>
                    <div className="text-[36px] font-bold">{total['air']}</div>
                </div>
            </Link>


            <Link  href="/Dashboard/sound" className=" rounded-xl p-5 border-2">
                <div className="flex gap-2 items-center pb-5">
                <Image src="/images/speakericon.svg" alt="" width={300} height={300} className="w-10 " >
                </Image><div className="text-xl font-bold text-[--primary]">ระดับเสียง</div>
                </div>
                <div className="grid">
                    <div className="text-sm text-gray-800">สถานีตรวจวัดทั้งหมด</div>
                    <div className="text-[36px] font-bold">{total['sound']}</div>
                </div>
            </Link>


            <Link  href="/Dashboard/water" className=" rounded-xl p-5 border-2">
                <div className="flex gap-2 items-center pb-5">
                <Image src="/images/watericon.svg" alt="" width={300} height={300} className="w-10 " >
                </Image><div className="text-xl font-bold text-[--primary]">คุณภาพน้ำ</div>
                </div>
                <div className="grid">
                    <div className="text-sm text-gray-800">สถานีตรวจวัดทั้งหมด</div>
                    <div className="text-[36px] font-bold">{total['water']}</div>
                </div>
            </Link>


            <Link  href="/Dashboard/cems" className=" rounded-xl p-5 border-2">
                <div className="flex gap-2 items-center pb-5">
                <Image src="/images/waveicon.svg" alt="" width={300} height={300} className="w-10 " >
                </Image><div className="text-xl font-bold text-[--primary]">Cems</div>
                </div>
                <div className="grid">
                    <div className="text-sm text-gray-800">สถานีตรวจวัดทั้งหมด</div>
                    <div className="text-[36px] font-bold">{total['environment']}</div>
                </div>
            </Link>

        </div>


        <Footer />

    </>
}