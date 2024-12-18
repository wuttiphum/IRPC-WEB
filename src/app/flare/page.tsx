'use client'

import { Input, Radio } from 'antd';
import { Grid2X2, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import MapPick from '../components/MapPick';
import Link from 'next/link';
import Flarecard from '../components/Flarecard';
import SegmentMenu from '../components/SegmentMenu';
import Image from 'next/image';
import { getData } from '../ultilities/api';
import Pagination from '../components/Pagination';
import Badges from '../components/Badges';
import { FullDateFormator } from '../ultilities/DateFormater';

export default function flare() {

  const [display, setDisplay] = useState<'List' | 'Map'>('List');
  const [flare, setFlare] = useState<any>([]) // [ตัวเเปร,ฟังชั้นเอาไว่้เซ็ตค่าตัวเเปรข้างหน้า]

  const fetchData = async () => {
    const result = await getData('/forWeb/getFlareLast.php')
    setFlare(result.stations || [])
    
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    if (flare) {
      setSelectedPlace(flare[0])
      flare && localStorage.setItem('flare', flare?.length)
    }
  }, [flare])

  const [selectedPlace, setSelectedPlace] = useState<any>();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 1;
  const today = FullDateFormator(new Date())

  const [FlareFiltered, setFlareFiltered] = useState<any>({
    0: "",
    1: ""
  });

  const handleSearch = async (keyword: string, index: number) => {
    setFlareFiltered((prev: any) => ({
      ...prev,
      [index]: keyword,
    }));
  };

  return (
    <>
      <section id="header" className="px-10 py-4 bg-white">
        <SegmentMenu />
        <div className="text-[18px] text-[--primary] font-bold">ประจำวันจันทร์{today}</div>
        <div className="text-[36px] font-bold">สถานีแฟลร์ทั้งหมด</div>

        <div className="flex justify-between pt-10 items-center lg:flex-nowrap  md:flex-wrap-reverse flex-wrap-reverse ">
          <Badges name='other' />
          <div className="badges flex flex-wrap items-center gap-2 lg:w-auto md:w-full w-full">
            <div className="search lg:w-auto md:w-full w-full"> <Input onChange={e => handleSearch(e.target.value, 0)} size="middle" placeholder="ค้นหา" style={{ fontFamily: "prompt", padding: "0px 5px" }} className="text-slate-500 noto-sans shadow-sm py-2  rounded-lg" prefix={<Search className=' ml-2 size-5 text-[#667085]' />} /></div>
            <div className="tabs py-4 lg:w-auto md:w-full w-full  ">
              <Radio.Group
                value={display}
                size='large'
                onChange={(e) => setDisplay(e.target.value)}
                className="lg:w-auto md:w-full w-full "
              >
                <Radio.Button value="List" className="w-1/2">
                  <div className='flex gap-2 items-center justify-center w-full'>
                    <Grid2X2 />รายการ
                  </div>
                </Radio.Button>
                <Radio.Button value="Map" className="w-1/2">
                  <div className='flex gap-2 items-center justify-center w-full'>
                    <Image src="/icons/map.svg" className="p-[1px]" width={24} height={24} alt="wind icon" />
                    แผนที่
                  </div>
                </Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </div>
      </section>

      <section id="lists" className='px-10 bg-white py-5'>
        {display == "List" && <div className="lg:grid md:grid lg:grid-cols-3 md:grid-cols-2 hidden gap-5 justify-center">
          {
            flare.filter((item: any) => {
              if (!FlareFiltered[0]) return item
              return item?.nameTH?.toLowerCase().includes(FlareFiltered[0].toLowerCase())
            }).map((item: any) =>
              <Link href={`/flare/detail/${item.stationID}`} key={item.stationID}>
                <Flarecard className="lg:min-w-full" item={item}></Flarecard>
              </Link>
            )
          }
        </div>}

        {display == "List" && <div className="lg:hidden md:hidden flex flex-col gap-5 justify-center">
          <Pagination
            pageSize={pageSize}
            simple={{ readOnly: true }}
            current={currentPage}
            onChange={setCurrentPage}
            total={flare?.length}
            className="lg:hidden md:hidden flex justify-center py-3"
          >
            {[flare[currentPage]].map((item: any, index: number) =>
              <Link key={index} href={`/flare/detail/${item?.stationID}`}>
                <Flarecard className="lg:min-w-full" item={item}></Flarecard>
              </Link>
            )}
          </Pagination>

        </div>}
        {display == "Map" && <div className="flex lg:flex-row flex-col gap-5">
          {selectedPlace &&
            <div className="basis-2/5 lg:block flex justify-center">
              <Link href={`/flare/detail/${selectedPlace?.stationID}`}>
                <Flarecard className="lg:min-w-full" item={selectedPlace}></Flarecard>
              </Link>
            </div>
          }
          <div className="w-full lg:h-auto md:h-[50vh] h-[50vh]">
            <MapPick data={flare} name="flare" setState={setSelectedPlace} unit="mg/L" key="COD" />
          </div>
        </div>}
      </section>
    </>
  );
}