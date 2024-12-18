'use client'

import { Input, Radio, } from 'antd';
import { Grid2X2, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import Table from '../components/Table';
import MapPick from '../components/MapPick';
import DateFormator, { FullDateFormator } from '../ultilities/DateFormater';
import Link from 'next/link';
import SegmentMenu from '../components/SegmentMenu';
import Image from 'next/image';
import SoundCard from '../components/SoundCard';
import Badges from '../components/Badges';
import Pagination from '../components/Pagination';
import { getData } from '../ultilities/api';
export default function Sound() {


  const [display, setDisplay] = useState<'List' | 'Map'>('List');
  const [sounds, setSounds] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const today = FullDateFormator(new Date())
  const pageSize = 1;

  const [soundFiltered, setSoundFiltered] = useState<any>({
    0: "",
    1: ""
  });

  const handleSearch = async (keyword: string, index: number) => {
    setSoundFiltered((prev: any) => ({
      ...prev,
      [index]: keyword,
    }));
  };
  const [selectedPlace, setSelectedPlace] = useState<any>();

  const fetchData = async () => {
    const result = await getData('/forWeb/getSoundLast.php')
    setSounds(result?.stations || [])
    setSelectedPlace(result?.stations?.[0]);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>

      <section id="header" className="px-10 py-4 bg-white">

        <SegmentMenu />
        <div className="text-[18px] text-[--primary] font-bold">ประจำ{today}</div>
        <div className="text-[36px] font-bold">รายงานระดับเสียงรบกวน</div>

        <div className="flex justify-between pt-10 items-center lg:flex-nowrap  md:flex-wrap-reverse flex-wrap-reverse ">
          <Badges name="sound" />
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
          {sounds.filter((item: any) => {
            if (!soundFiltered[0]) return item
            return item?.nameTH?.toLowerCase().includes(soundFiltered[0].toLowerCase())
          }).map((item: any, index: number) => <Link key={index} href={`sound/detail/${item?.stationID}`}>
            <SoundCard className="lg:min-w-full" data={item}></SoundCard>
          </Link>)}
        </div>}

        {display == "List" && <div className="lg:hidden md:hidden flex flex-col items-center gap-5 justify-center">
          {[sounds[currentPage]].map((item: any) => <Link key={item?.stationID} href={`sound/detail/${item?.stationID}`}>
            <SoundCard className="lg:min-w-full" data={item}></SoundCard>
          </Link>)}
          <Pagination pageSize={pageSize} simple={{ readOnly: true }} onChange={setCurrentPage} current={currentPage} total={sounds.length} className="lg:hidden md:hidden flex justify-center py-3" />
        </div>}


        {/* {display == "Map" && <div className="flex lg:flex-row flex-col items-center gap-5 ">
          <div className="">
            <Link key={selectedPlace?.stationID} href={`sound/detail/${selectedPlace?.stationID}`}>
              <SoundCard className="lg:min-w-full" data={selectedPlace}></SoundCard>
            </Link>
          </div>
          <div className="lg:basis-1/2 w-full lg:h-auto md:h-[50vh] h-[50vh]">
            <MapPick data={sounds} setState={setSelectedPlace} unit="dBA" name="sound" />
          </div>
        </div>} */}


        {display == "Map" && <div className="flex lg:flex-row flex-col gap-5 ">
          {selectedPlace && <div className="basis-2/5 lg:block flex justify-center">
            <Link href={`/air/detail/${selectedPlace?.stationID}`}>
              <SoundCard className="lg:min-w-full" data={selectedPlace}></SoundCard>
            </Link>
          </div>}
          <div className=" w-full lg:h-auto md:h-[50vh] h-[50vh]">
            <MapPick data={sounds} setState={setSelectedPlace} unit="dBA" name="sound" />
          </div>
        </div>}
      </section>

      <section id="table" className="px-10 py-10">
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="text-[20px] font-bold">ตารางตรวจวัดระดับเสียง</div>
          <div className="search"> <Input onChange={e => handleSearch(e.target.value, 1)} size="middle" placeholder="ค้นหา" style={{ fontFamily: "prompt", padding: "0px 5px" }} className="text-slate-500 noto-sans" prefix={<Search className='text-slate-500 ml-2' />} /></div>
        </div>

        <div className='py-5 '>
          <Table
            className="w-full"
            data={
              //   [
              //   {
              //     key: '1',
              //     station: 'สถานีอุตุนิยมวิทยาลำปาง',
              //     dBA24: 48.9,
              //     dBA1: 30.6,
              //     dBA15: 966,
              //     dBA5: 66.2,
              //     updated: DateFormator(new Date()),
              //   },
              // ]

              sounds.filter((item: any) => {
                if (!soundFiltered[1]) return item
                return item?.nameTH?.toLowerCase().includes(soundFiltered[1].toLowerCase())
              })
            }

            columns={[
              {
                title: <div className="text-[#475467]">สถานี</div>,
                dataIndex: 'nameTH',
              },
              {
                title: <div className="text-[#475467]">Leq 24 ชม.  <span className="font-normal">(dBA)</span></div>,
                dataIndex: 'dBA24',
                render: (text: string, record: any) => record.LastUpdate?.Leq || '-',
                // sorter: {
                //   compare: (a: { dBA24: number; }, b: { dBA24: number; }) => (a.dBA24) - (b.dBA24),
                //   multiple: 3,
                // },
              },
              {
                title: <div className="text-[#475467]">Leq 1 ชม. <span className="font-normal">(dBA)</span></div>,
                dataIndex: 'dBA1',
                // sorter: {
                //   compare: (a: { dBA1: number; }, b: { dBA1: number; }) => (a.dBA1) - (b.dBA1),
                //   multiple: 3,
                // },
                render: (text: string, record: any) => record.LastUpdate?.L50 || '-',
              },
              {
                title: <div className="text-[#475467]">Leq 15 นาที <span className="font-normal">(dBA)</span></div>,
                dataIndex: 'dBA15',
                // sorter: {
                //   compare: (a: { dBA15: number; }, b: { dBA15: number; }) => (a.dBA15) - (b.dBA15),
                //   multiple: 3,
                // },
                render: (text: string, record: any) => record.LastUpdate?.L10 || '-',
              },
              {
                title: <div className="text-[#475467]">Leq 5 นาที <span className="font-normal">(dBA)</span></div>,
                dataIndex: 'dBA5',
                // sorter: {
                //   compare: (a: { dBA5: number; }, b: { dBA5: number; }) => (a.dBA5) - (b.dBA5),
                //   multiple: 3,
                // },
                render: (text: string, record: any) => record.LastUpdate?.L5 || '-',
              },
              {
                title: <div className="text-[#475467]">Leq 90 นาที <span className="font-normal">(dBA)</span></div>,
                dataIndex: 'dBA5',
                // sorter: {
                //   compare: (a: { dBA5: number; }, b: { dBA5: number; }) => (a.dBA5) - (b.dBA5),
                //   multiple: 3,
                // },
                render: (text: string, record: any) => record.LastUpdate?.L90 || '-',
              },
              {
                title: <div className="text-[#475467]">Noise <span className="font-normal">(dBA)</span></div>,
                dataIndex: 'dBA5',
                // sorter: {
                //   compare: (a: { dBA5: number; }, b: { dBA5: number; }) => (a.dBA5) - (b.dBA5),
                //   multiple: 3,
                // },
                render: (text: string, record: any) => record.LastUpdate5min?.noise || '-',
              },
              {
                title: <div className="text-[#475467]">เวลาอัพเดต</div>,
                dataIndex: 'updated',
                render: (text: string, record: any) => `${DateFormator(new Date(record.LastUpdate?.date + "T" + record.LastUpdate?.time))}` || '-',
              },
            ]}
          />

        </div>
      </section>


    </>
  );
}
