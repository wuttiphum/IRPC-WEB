'use client'

import { Input, Radio } from 'antd';
import { Grid2X2, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import MapPick from '../components/MapPick';
import DateFormator, { FullDateFormator } from '../ultilities/DateFormater';
import Link from 'next/link';

import SegmentMenu from '../components/SegmentMenu';
import Image from 'next/image';
import Badges from '../components/Badges';

import Pagination from '../components/Pagination';
import { getData } from '../ultilities/api';



export default function Air() {

  const [display, setDisplay] = useState<'List' | 'Map'>('List');
  const [airs, setAirs] = useState<any>([]);


  const [selectedPlace, setSelectedPlace] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [airsFiltered, setAirsFiltered] = useState<any>({
    0: "",
    1: ""
  });
  const handleSearch = async (keyword: string, index: number) => {
    setAirsFiltered((prev: any) => ({
      ...prev,
      [index]: keyword,
    }));
  };

  const fetchData = async () => {
    const result = await getData('/forWeb/getAirLast.php')
    setAirs(result.stations || [])
    result.station && console.log("TOTAL AIR : ", result.station.length)
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    if (airs) setSelectedPlace(airs[0])
  }, [airs])

  const today = FullDateFormator(new Date())
  const pageSize = 1;

  return (
    <>

      <section id="header" className="px-10 py-4 bg-white">
        <SegmentMenu />
        <div className="text-[18px] text-[--primary] font-bold">ประจำ{today}</div>
        <div className="text-[36px] font-bold">รายงานคุณภาพอากาศ</div>

        <div className="flex justify-between pt-10 items-center lg:flex-nowrap  md:flex-wrap-reverse flex-wrap-reverse ">
          <Badges name="air" />
          <div className="badges flex flex-wrap items-center gap-2 lg:w-auto md:w-full w-full">
            <div className="search lg:w-auto md:w-full w-full"> <Input onChange={e => handleSearch(e.target.value, 0)} size="middle" placeholder="ค้นหา" style={{ fontFamily: "prompt", padding: "0px 5px" }} className="text-slate-500 noto-sans shadow-sm py-2  rounded-lg" prefix={<Search className='text-slate-500 ml-2' />} /></div>
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
          {
            airs.filter((item: any) => {
              if (!airsFiltered[0]) return item
              return item?.nameTH?.toLowerCase().includes(airsFiltered[0].toLowerCase())
            }).map((item: any) => <Link href={`/air/detail/${item.stationID}`} key={item.stationID}>
              <Card className="lg:min-w-full" data={item}></Card>
            </Link>)
          }
        </div>}

        {display == "List" && <div className="lg:hidden md:hidden flex flex-col gap-5 justify-center">
          <Pagination pageSize={pageSize} simple={{ readOnly: true }} current={currentPage} onChange={setCurrentPage} total={airs?.length} className="lg:hidden md:hidden flex justify-center py-3" >
            {[airs[currentPage]].map((item: any, index: number) => <Link key={index} href={`/air/detail/${item?.stationID}`}>
              <Card className="lg:min-w-full" data={item}></Card>
            </Link>)}
          </Pagination>
        </div>}

        {display == "Map" && <div className="flex lg:flex-row flex-col gap-5 ">
          {selectedPlace && <div className="basis-2/5 lg:block flex justify-center">
            <Link href={`/air/detail/${selectedPlace?.stationID}`}>
              <Card className="lg:min-w-full" data={selectedPlace}></Card>
            </Link>
          </div>}
          <div className=" w-full lg:h-auto md:h-[50vh] h-[50vh]">
            <MapPick data={airs} name="air" setState={setSelectedPlace} unit="AQI" key="AQI" />
          </div>
        </div>}

      </section>

      <section id="table" className="px-10 py-10">
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="text-[20px] font-bold">ตารางตรวจวัดคุณภาพอากาศ</div>
          <div className="search"> <Input onChange={e => handleSearch(e.target.value, 1)} size="middle" placeholder="ค้นหา" style={{ fontFamily: "prompt", padding: "0px 5px" }} className="text-slate-500 noto-sans" prefix={<Search className='text-slate-500 ml-2' />} /></div>
        </div>

        <div className='py-5'>
          <Table data={
            // [{
            //   key: '1',
            //   station: 'วัดปลวกเกตุ',
            //   AQI: 12,
            //   PM2: 6.0,
            //   PM10: 13,
            //   tempurature: 30.6,
            //   pressure: 966,
            //   moisture: 66.3,
            //   updated: DateFormator(new Date())
            // },]

            airs.filter((item: any, index: number) => {
              if (!airsFiltered[1]) return { key: index.toString(), ...item }
              return item?.nameTH?.toLowerCase().includes(airsFiltered[1].toLowerCase())
            })
          }

            columns={
              [{
                title: 'สถานี',
                dataIndex: 'nameTH',
              },
              {
                title: <div >AQI<span className="text-sm font-normal"></span></div>,
                dataIndex: 'AQI',
                render: (text: string, record: any) => `${record.LastUpdate?.AQI.aqi}` || 'N/A',

              },
              {
                title: <div >PM<sub>2.5</sub> <span className="text-sm font-normal"> (µg/m<sup>3</sup>)</span></div>,
                dataIndex: 'PM2',
                render: (text: string, record: any) => `${(record.LastUpdate?.PM25.value) == "N/A" ? '-' : record.LastUpdate?.PM25.value}` || 'N/A',
              },
              {
                title: <div >PM<sub>10</sub> <span className="text-sm font-normal"> (µg/m<sup>3</sup>)</span></div>,
                dataIndex: 'PM10',
                render: (text: string, record: any) => `${(record.LastUpdate?.PM10.value) == "N/A" ? '-' : record.LastUpdate?.PM10.value}` || 'N/A',
              },
              // {
              //   title: <div >อุณหภูมิ<span className="text-sm font-normal"> (°C)</span></div>,
              //   dataIndex: 'tempurature',
              //   render: (text: string, record: any) => `${record.LastUpdate?.PM25.value}` || 'N/A',
              // },
              // {
              //   title: <div >ความกดอากาศ<span className="text-sm font-normal"> (mmHg)</span></div>,
              //   dataIndex: 'pressure',
              //   sorter: {
              //     compare: (a: { pressure: number; }, b: { pressure: number; }) => a.pressure - b.pressure,
              //     multiple: 3,
              //   },
              // },
              // {
              //   title: <div >ความชื้นสัมพัทธ์<span className="text-sm font-normal"> (%)</span></div>,
              //   dataIndex: 'moisture',
              //   sorter: {
              //     compare: (a: { moisture: number; }, b: { moisture: number; }) => a.moisture - b.moisture,
              //     multiple: 3,
              //   },
              // },
              {
                title: 'เวลาอัพเดต',
                dataIndex: 'updated',

                render: (text: string, record: any) => `${DateFormator(new Date(record.LastUpdate?.date + "T" + record.LastUpdate?.time))}` || 'N/A',
              },
              ]
            }
          />
        </div>
      </section>
    </>
  );
}
