'use client'

import { Input, Radio } from 'antd';
import { Grid2X2,  Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import WaterCard from '../components/WaterCard';
import Table from '../components/Table';
import MapPick from '../components/MapPick';
import DateFormator, { FullDateFormator } from '../ultilities/DateFormater';
import Link from 'next/link';
import SegmentMenu from '../components/SegmentMenu';
import Image from 'next/image';
import Badges from '../components/Badges';
import Pagination from '../components/Pagination';
import { Water } from '../models/models';
import { getData } from '../ultilities/api';

export default function Page() {


  const [display, setDisplay] = useState<'List' | 'Map'>('List');
  const [waters, setWater] = useState<any>([]);

  const [selectedPlace, setSelectedPlace] = useState<any>();

  const [currentPage,setCurrentPage] = useState(0);
  const today = FullDateFormator(new Date())
  const pageSize = 1;
  const [waterFiltered, setWaterFiltered] = useState<any>({
    0: "",
    1: ""
  });
  const handleSearch = async (keyword: string, index: number) => {
    setWaterFiltered((prev: any) => ({
      ...prev,
      [index]: keyword,
    }));
  };

  const fetchData = async () => {
    const result = await getData('/forWeb/getWaterLast.php')
    setWater(result.stations || [])

  }

  useEffect(() => {
    if (waters) {
      setSelectedPlace(waters[0])
    }
  }, [waters])

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <section id="header" className="px-10 py-4 bg-white">
        <SegmentMenu />
        <div className="text-[18px] text-[--primary] font-bold">ประจำ{today}</div>
        <div className="text-[36px] font-bold">รายงานคุณภาพน้ำ</div>

        <div className="flex justify-between pt-10 items-center lg:flex-nowrap  md:flex-wrap-reverse flex-wrap-reverse ">
          <Badges name="other"/>
          <div className="badges flex flex-wrap items-center gap-2 lg:w-auto md:w-full w-full">
            <div className="search lg:w-auto md:w-full w-full"> <Input onChange={e => handleSearch(e.target.value,0)} size="middle" placeholder="ค้นหา" style={{ fontFamily: "prompt" ,padding:"0px 5px"}}  className="text-slate-500 noto-sans shadow-sm py-2  rounded-lg" prefix={<Search className='text-slate-500 ml-2'/>} /></div>
            <div className="tabs py-4 lg:w-auto md:w-full w-full  ">
              <Radio.Group
                value={display}
                 size='large'
                onChange={(e) => setDisplay(e.target.value)}
                className="lg:w-auto md:w-full w-full "
              >
                <Radio.Button value="List" className="w-1/2">
                  <div className='flex gap-2 items-center justify-center w-full'>
                    <Grid2X2 className='w-[34px]' />รายการ
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
          {waters.filter((item: any) => {
              if(!waterFiltered[0]) return item
              return item?.nameTH?.toLowerCase().includes(waterFiltered[0].toLowerCase())
            }).map((item: Water) => <Link key={item.stationID} href={`water/detail/${item.stationID}`}>
            <WaterCard className="lg:min-w-full" key={item.stationID} data={item}></WaterCard>
          </Link>)}
        </div>}

        {display == "List" && <div className="lg:hidden md:hidden flex flex-col gap-5 justify-center">
          <Pagination pageSize={pageSize} simple={{ readOnly: true }} current={currentPage} onChange={setCurrentPage} total={waters.length} className="lg:hidden md:hidden flex justify-center py-3" >
            {[waters[currentPage]].map((item: Water) => <Link key={item?.stationID} href={`water/detail/${item?.stationID}`}>
              <WaterCard className="lg:min-w-full" key={item?.stationID} data={item}></WaterCard>
            </Link>)}
          </Pagination>
        </div>}

        {display == "Map" && <div className="flex lg:flex-row flex-col  gap-5 ">
          <div className="lg:basis-2/5 basis-full flex justify-center">
            <Link href={`water/detail/${selectedPlace?.stationID!}`}>
              <WaterCard className="lg:min-w-full" data={selectedPlace}></WaterCard>
            </Link>
          </div>
          <div className={`w-full lg:h-auto md:h-[50vh] h-[50vh]`}>
            <MapPick data={waters} setState={setSelectedPlace} unit="mg/L" key="COD"/>
          </div>
        </div>}
      </section>

      <section id="table" className="px-10 py-10">
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="text-[20px] font-bold">ตารางตรวจวัดคุณภาพน้ำ</div>
          <div className="search"> <Input size="middle" placeholder="ค้นหา" style={{ fontFamily: "prompt" ,padding:"0px 5px"}}  className="text-slate-500 noto-sans" prefix={<Search className='text-slate-500 ml-2'/>} /></div>
        </div>

        <div className='py-5'>
          <Table
            data={
              //   [
              //   {
              //     key: '1',
              //     station: 'แขวงการทางสมุทรสาคร',
              //     COD: 51.3,
              //     Flow: 63.6,
              //     PH: 66.2,
              //     updated: DateFormator(new Date()),
              //   },
              // ]
              waters.filter((item: any) => {
                if(!waterFiltered[1]) return item
                return item?.nameTH?.toLowerCase().includes(waterFiltered[1].toLowerCase())
              })
            }

            columns={[
              {
                title: <div className="text-[#475467]">สถานี</div>,
                dataIndex: 'nameTH',
              },
              {
                title: <div className="text-[#475467]">COD (mg/L)</div>,
                dataIndex: 'LastUpdate',
                sorter: {
                  compare: (a: { COD: number; }, b: { COD: number; }) => a.COD - b.COD,
                  multiple: 3,
                },
                render: (text: string, record: any) => record.LastUpdate?.COD == "N/A"? '-':record.LastUpdate?.COD || '-',
              },
              {
                title: <div className="text-[#475467]">Flow (m³/s)</div>,
                dataIndex: 'Flow',
                sorter: {
                  compare: (a: { Flow: number; }, b: { Flow: number; }) => a.Flow - b.Flow,
                  multiple: 3,
                },
                render: (text: string, record: any) => record.LastUpdate?.Flow == "N/A"? '-':record.LastUpdate?.Flow || '-',
              },
              {
                title: <div className="text-[#475467]">pH</div>,
                dataIndex: 'pH',
                sorter: {
                  compare: (a: { PH: number; }, b: { PH: number; }) => a.PH - b.PH,
                  multiple: 3,
                },
                render: (text: string, record: any) => record.LastUpdate?.pH == "N/A"? '-':record.LastUpdate?.pH || '-',
              },
              {
                title: <div className="text-[#475467]">เวลาอัพเดต</div>,
                dataIndex: 'updated',
                render: (text: string, record: any) => `${DateFormator(new Date(record.LastUpdate?.date + "T" + record.LastUpdate?.time))}` || 'N/A',
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
