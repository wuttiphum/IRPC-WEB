'use client'

import { Input, Radio, } from 'antd';
import { Grid2X2,Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import Table from '../components/Table';
import MapPick from '../components/MapPick';
import DateFormator, { FullDateFormator } from '../ultilities/DateFormater';
import Link from 'next/link';

import SegmentMenu from '../components/SegmentMenu';
import Image from 'next/image';
import EnvironmentCard from '../components/EnvironmentCard';
import Badges from '../components/Badges';
import Pagination from '../components/Pagination';
import { getData } from '../ultilities/api';
export default function Environment() {


    const [display, setDisplay] = useState<'List' | 'Map'>('List');
    const [cems, setCems] = useState<any>([]);
    const [selectedPlace, setSelectedPlace] = useState<any>();
    const [currentPage, setCurrentPage] = useState(0);


    const today = FullDateFormator(new Date())
    const pageSize = 1;
    const [environmentFiltered, setEnvironmentFiltered] = useState<any>({
        0: "",
        1: ""
    });
    const handleSearch = async (keyword: string, index: number) => {
        setEnvironmentFiltered((prev: any) => ({
            ...prev,
            [index]: keyword,
        }));
    };


    const fetchData = async () => {
        const result = await getData('/forWeb/getCemsLast.php')
        setCems(result.stations || [])


    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (cems)
            setSelectedPlace(cems[0])
    }, [cems])

    return (
        <>

            <section id="header" className="px-10 py-4 bg-white">

                <SegmentMenu />
                <div className="text-[18px] text-[--primary] font-bold">ประจำ{today}</div>
                <div className="text-[36px] font-bold">รายงาน CEMs</div>

                <div className="flex justify-between pt-10 items-center lg:flex-nowrap  md:flex-wrap-reverse flex-wrap-reverse ">
                    <Badges name='other' />
                    <div className="badges flex flex-wrap items-center gap-2 lg:w-auto md:w-full w-full">
                        <div className="search lg:w-auto md:w-full w-full"> <Input onChange={e => handleSearch(e.target.value,0)} size="middle" placeholder="ค้นหา" style={{ fontFamily: "prompt" ,padding:"0px 5px"}}  className="text-slate-500 noto-sans shadow-sm py-2  rounded-lg" prefix={<Search className='text-slate-500 ml-2'/>} /></div>
                        <div className="tabs py-4 lg:w-auto md:w-full w-full  ">
                            <Radio.Group
                                value={display}
                                 size='large'
                                onChange={(e) => setDisplay(e.target.value)}
                                className="lg:w-auto md:w-full w-full "
                            >
                                <Radio.Button
                                 value="List" className="w-1/2">
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
                    {cems.filter((item: any) => {
                        if (!environmentFiltered[0]) return item
                        return item?.nameTH?.toLowerCase().includes(environmentFiltered[0].toLowerCase())
                    }).map((item: any) => <Link href={`environment/detail/${item.stationID}`} key={item.stationID}>
                        <EnvironmentCard className="lg:min-w-full" data={item}></EnvironmentCard>
                    </Link>)}
                </div>}

                {display == "List" && <div className="lg:hidden md:hidden flex flex-col gap-5 justify-center">
                    <Pagination pageSize={pageSize} simple={{ readOnly: true }} current={currentPage} onChange={setCurrentPage} total={cems?.length} className="lg:hidden md:hidden flex justify-center py-3" >
                        {[cems[currentPage]].map((item: any) => <Link key={item?.stationID} href={`/environment/detail/${item?.stationID}`}>
                            <EnvironmentCard className="lg:min-w-full" data={item}></EnvironmentCard>
                        </Link>)}
                    </Pagination>
                </div>}

                {display == "Map" && <div className="flex lg:flex-row flex-col gap-5 ">
                    {selectedPlace && <div className="basis-2/5 lg:block flex justify-center">
                        <Link href={`environment/detail/${selectedPlace?.stationID}`}>
                            <EnvironmentCard className="lg:min-w-full" data={selectedPlace}></EnvironmentCard>
                        </Link>
                    </div>}
                    <div className=" w-full lg:h-auto md:h-[50vh] h-[50vh]">
                        <MapPick data={cems} setState={setSelectedPlace} unit="m³/s" key="NOx_7p" />
                    </div>
                </div>}

            </section>

            <section id="table" className="px-10 py-10">
                <div className="flex flex-wrap gap-2 justify-between">
                    <div className="text-[20px] font-bold">ตารางตรวจวัดคุณภาพ CEMs</div>
                    <div className="search"> <Input onChange={e => handleSearch(e.target.value,1)} size="middle" placeholder="ค้นหา" style={{ fontFamily: "prompt" ,padding:"0px 5px"}}  className="text-slate-500 noto-sans" prefix={<Search className='text-slate-500 ml-2'/>} /></div>
                </div>

                <div className='py-5'>
                    <Table
                        data={
                            //     [
                            //     {
                            //         key: '1',
                            //         station: 'แขวงการทางสมุทรสาคร',
                            //         point: 'จุดที่1',
                            //         updated: '19 มิ.ย. 66 เวลา 09:00 น.',
                            //         CO: 2,
                            //         Flow: '337,024.09',
                            //         Particulate: 0.31,
                            //     },
                            // ]
                            cems.filter((item: any) => {
                                if(!environmentFiltered[1]) return item
                                return item?.nameTH?.toLowerCase().includes(environmentFiltered[1].toLowerCase())
                              })
                        }


                        columns={[
                            {
                                title: <div className="text-[#475467]">สถานี</div>, // Station
                                width: 200,
                                dataIndex: 'nameTH',
                            },
                            {
                                title: <div className="text-[#475467]">จุดตรวจวัด</div>, // Measurement Point
                                width: 200,
                                dataIndex: 'areaTH',
                            },
                            {
                                title: <div className="text-[#475467]">เวลาอัพเดต</div>, // Updated Time
                                width: 200,
                                dataIndex: 'updated',
                                render: (text: string, record: any) => `${DateFormator(new Date(record.LastUpdate?.date + "T" + record.LastUpdate?.time))}` || 'N/A',
                            },
                            {
                                title: <div className="text-[#475467]">Flow (m<sup>3</sup>/s)</div>,
                                width: 200,
                                dataIndex: 'Flow',
                                render: (text: string, record: any) =>( record.LastUpdate?.Flow) == 'N/A' ? "-" :  record.LastUpdate?.Flow || 'N/A',
                            },
                            {
                                title: <div className="text-[#475467]">O<sub>2</sub> (ppm)</div>,
                                width: 200,
                                dataIndex: 'O2',
                                render: (text: string, record: any) =>( record.LastUpdate?.O2) == 'N/A' ? "-" :  record.LastUpdate?.O2 || 'N/A',
                            },
                            {
                                title: <div className="text-[#475467]">NOx (ppm)</div>,
                                width: 200,
                                dataIndex: 'NOx',
                                render: (text: string, record: any) =>( record.LastUpdate?.NOx_7p) == 'N/A' ? "-" :  record.LastUpdate?.NOx_7p || 'N/A',
                            },
                            {
                                title: <div className="text-[#475467]">SOx (ppm)</div>,
                                width: 200,
                                dataIndex: 'SOx',
                                render: (text: string, record: any) =>( record.LastUpdate?.SOx_7p) == 'N/A' ? "-" :  record.LastUpdate?.SOx_7p || 'N/A',
                            },
                            {
                                title: <div className="text-[#475467]">CO (ppm)</div>,
                                width: 200,
                                dataIndex: 'CO',
                                render: (text: string, record: any) =>( record.LastUpdate?.CO_7p) == 'N/A' ? "-" :  record.LastUpdate?.CO_7p || 'N/A',
                            },
                            {
                                title: <div className="text-[#475467]">CO<sub>2</sub> (ppm)</div>,
                                width: 200,
                                dataIndex: 'CO2',
                                render: (text: string, record: any) =>( record.LastUpdate?.CO2_7p) == 'N/A' ? "-" :  record.LastUpdate?.CO2_7p || 'N/A',
                            },
                            {
                                title: <div className="text-[#475467]">NH<sub>3</sub></div>,
                                width: 200,
                                dataIndex: 'NH3',
                                render: (text: string, record: any) =>( record.LastUpdate?.NH3_7p) == 'N/A' ? "-" :  record.LastUpdate?.NH3_7p || 'N/A',
                            },
                            {
                                title: <div className="text-[#475467]">H<sub>2</sub>S (ppm)</div>,
                                width: 200,
                                dataIndex: 'H2S',
                                render: (text: string, record: any) =>( record.LastUpdate?.H2S_7p) == 'N/A' ? "-" :  record.LastUpdate?.H2S_7p || 'N/A',
                            },
                            {
                                title: <div className="text-[#475467]">Dust (µg/m<sup>3</sup>)</div>,
                                width: 200,
                                dataIndex: 'Dust',
                                render: (text: string, record: any) =>( record.LastUpdate?.Dust) == 'N/A' ? "-" :  record.LastUpdate?.Dust || 'N/A',

                            },
                            {
                                title: <div className="text-[#475467]">Opacity</div>,
                                width: 200,
                                dataIndex: 'Opacity',
                                render: (text: string, record: any) =>( record.LastUpdate?.Opacity) == 'N/A' ? "-" :  record.LastUpdate?.Opacity || 'N/A',

                            },

                            // {
                            //     title: <div className="text-[#475467]">Particulate (mg/m³)</div>, // Particulate (mg/m³)
                            //     dataIndex: 'Particulate',
                            //     sorter: {
                            //         compare: (a: { Particulate: number; }, b: { Particulate: number; }) => a.Particulate - b.Particulate,
                            //         multiple: 3,
                            //     },
                            // },
                        ]}
                    />

                </div>
            </section>


        </>
    );
}
