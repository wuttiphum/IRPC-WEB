'use client'
import AreaGraph from '@/app/components/AreaGraph';
import Badge from '@/app/components/Badge';
import { getData } from '@/app/ultilities/api';
import { FullDateFormator } from '@/app/ultilities/DateFormater';
import { Breadcrumb, Radio, Select } from 'antd';
import { ChevronRight, House, MapPin, Waves } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Image as AntImage } from 'antd';
import ColumnGraph from '@/app/components/ColumnGraph';
import { convertPropertyToNumber } from '@/app/ultilities/PropsToNumber';


export default function Detail({ params }: { params: any }) {

    const types = [
        'AQI', 'PM2', 'PM10', 'O3', 'CO', 'NO2', 'SO2',
        // 'WS', 'WD'
    ];

    const typesLabel: any = {
        'AQI': "ดัชนีคุณภาพอากาศ AQI ",
        'PM2': <>ฝุ่นละออง PM<sub>2.5</sub></>,
        'PM10': <>ฝุ่นละออง PM<sub>10</sub></>,
        'O3': <>ก๊าซโอโซน O<sub>3</sub></>,
        'CO': "ก๊าซคาร์บอนมอนอกไซด์ CO",
        'NO2': <>ก๊าซไนโตรเจนไดออกไซด์ NO<sub>2</sub></>,
        'SO2': <>ก๊าซซัลเฟอร์ไดออกไซด์ SO<sub>2</sub></>,
        'WS': "WS",
        'WD': "WD"
    };
    const dropdownTypesLabel: any = {
        'AQI': "AQI ",
        'PM2': <>PM<sub>2.5</sub></>,
        'PM10': <>PM<sub>10</sub></>,
        'O3': <>O<sub>3</sub></>,
        'CO': "CO",
        'NO2': <>NO<sub>2</sub></>,
        'SO2': <>SO<sub>2</sub></>,
        'WS': "WS",
        'WD': "WD"
    };

    const [display, setDisplay] = useState<'PM2' | 'PM10' | 'O3' | 'CO' | 'NO2' | 'SO2' | 'WS' | 'WD' | 'AQI'>('AQI');
    const [display2, setDisplay2] = useState<'PM2' | 'PM10' | 'O3' | 'CO' | 'NO2' | 'SO2' | 'WS' | 'WD' | 'AQI'>('AQI');

    const [airsDetail, setAirsDetail] = useState<any>();

    const fetchData = async () => {
        const result = await getData(`/forWeb/getAir24H.php?stationID=${params.id}`)
        setAirsDetail(result.stations && result.stations[0])

    }

    useEffect(() => {
        fetchData();
    }, [])


    return <>
        <div className="h-[240px] overflow-hidden w-full flex justify-center">
            <Image width={1023} height={300}
                src={`${airsDetail?.image_url || "/images/cover-image.png"}`}
                className="w-full h-full object-cover bg-black"
                alt={''}
            />
        </div>

        <div className="container-x bg-white">
            <Breadcrumb
                separator={<ChevronRight />}

                className='py-2'
                items={[
                    {
                        href: '',
                        title: <House />,
                    },
                    {
                        href: '/air',
                        title: (
                            <>

                                <span className='px-2'>คุณภาพอากาศ</span>
                            </>
                        ),
                    },
                    {
                        title: <div className='rounded-md bg-slate-200 px-2 font-bold'>{airsDetail?.nameTH}</div>,
                    },
                ]}
            />
            <section className="flex justify-between">
                <div>
                    <h3 className="font-bold text-[30px]">{airsDetail?.nameTH}</h3>
                    <div className="text-mute text-[16px]">ประจำ{FullDateFormator(new Date(`${airsDetail?.LastUpdate.date}T${airsDetail?.LastUpdate.time}`))}</div>
                </div>
                <div className="flex flex-col items-end">
                    {/* <Badge status={airsDetail?.LastUpdate?.effect}></Badge> */}
                    {airsDetail?.LastUpdate?.Flow != "N/A" && <Badge status={airsDetail?.LastUpdate?.effect}></Badge>}
                    {airsDetail?.LastUpdate?.Flow == "N/A" && <Badge status={'0'}></Badge>}
                    <div className="text-[36px] font-bold">{airsDetail?.LastUpdate.AQI || "N/A"} <span className="text-[20px] font-normal">AQI</span></div>
                </div>
            </section>

            <div className="w-full bg-slate-200 h-[1px]  rounded-xl my-10"></div>
            <section className="flex lg:flex-nowrap flex-wrap">
                <div className="lg:basis-1/3 py-5 space-y-5">
                    {/* Location */}
                    <div className="">
                        <span className="text-[14px] mb-1 text-gray-500">ตำเเหน่งที่ตั้ง</span>
                        <div className="flex items-center mb-4">
                            <MapPin></MapPin>
                            <span className="text-[14px]">{airsDetail?.areaTH}</span>
                        </div>
                    </div>

                    {/* Station Name */}
                    <div className="mb-2">

                        <span className="text-[14px] text-gray-500">ชื่อสถานี</span>
                        <p className="text-[16px] font-semibold text-gray-900">{airsDetail?.nameTH}</p>
                    </div>

                    {/* Station Code */}
                    <div className="mb-2">
                        <span className="text-[14px] text-gray-500">รหัสสถานี</span>
                        <p className="text-[16px] font-semibold text-gray-900">{airsDetail?.stationID}</p>
                    </div>

                    {/* Latest Data */}
                    <div>
                        <span className="text-[14px] text-gray-500">ข้อมูลล่าสุด</span>
                        <p className="text-[16px] font-semibold text-gray-900">
                            {FullDateFormator(new Date(`${airsDetail?.LastUpdate.date}T${airsDetail?.LastUpdate.time}`))}
                        </p>
                    </div>


                </div>
                <div className="lg:basis-2/3">
                    <div className="w-full  bg-[#F9FAFB] border-2  border-[#EAECF0] rounded-xl p-3 grid lg:grid-cols-3 grid-cols-2 justify-center items-center">

                        <div>
                            <div className='text-[#475467]'>PM<sub>2.5</sub> </div>
                            <div className=' gap-2 font-extrabold'>{airsDetail?.LastUpdate.PM25} µg/m<sup>3</sup></div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>PM<sub>10</sub> </div>
                            <div className=' gap-2 font-extrabold'>{airsDetail?.LastUpdate.PM10} µg/m<sup>3</sup></div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>O<sub>3</sub> </div>
                            <div className=' gap-2 font-extrabold'>{airsDetail?.LastUpdate.O3} ppb</div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>CO </div>
                            <div className=' gap-2 font-extrabold'>{airsDetail?.LastUpdate.CO} ppm</div>
                        </div>

                        <div>
                            <div className='text-[#475467]'>NO<sub>2</sub> </div>
                            <div className=' gap-2 font-extrabold'>{airsDetail?.LastUpdate.NO2} ppb</div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>SO<sub>2</sub> </div>
                            <div className=' gap-2 font-extrabold'>{airsDetail?.LastUpdate.SO2} ppb</div>
                        </div>
                    </div>

                    <section>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ข้อมูลตรวจ{typesLabel[display]} ย้อนหลัง 24 ชั่วโมง</div>
                            <div className="">
                                {/* <Radio.Group value={display} onChange={(e) => setDisplay(e.target.value)}>
                                    {types.map(item => <Radio.Button value={item}><div className='flex gap-2 items-center'>{item} </div></Radio.Button>)}

                                </Radio.Group> */}

                                <Select
                                    // showSearch
                                    onChange={(e) => setDisplay(e)}
                                    style={{ width: 200 }}
                                    placeholder="Search to Select"
                                    optionFilterProp="label"
                                    value={display}
                                    options={types.map((item: any) => {
                                        return {
                                            value: item,
                                            label: dropdownTypesLabel[item]
                                        }
                                    })}
                                />
                            </div>
                        </div>
                        <div className=" overflow-hidden flex justify-center">

                            {display == "AQI" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.AQI, "value")} />}
                            {display == "CO" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.CO, "value")} />}
                            {display == "NO2" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.NO2, "value")} />}
                            {display == "PM2" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.PM25, "value")} />}
                            {display == "PM10" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.PM10, "value")} />}
                            {display == "O3" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.O3, "value")} />}
                            {display == "SO2" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.SO2, "value")} />}
                            {display == "WD" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.WD, "value")} />}
                            {display == "WS" && airsDetail && <AreaGraph data={convertPropertyToNumber(airsDetail.Last24H?.WS, "value")} />}

                        </div>
                    </section>

                    <section className='py-10'>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ค่าตรวจวัด{typesLabel[display2]} เฉลี่ย 24 ชม. ย้อนหลัง 7 วัน</div>
                            {/* <div className="">
                                <Radio.Group value={display2} onChange={(e) => setDisplay2(e.target.value)}>
                                    <Radio.Button value="Tempurature"><div className='flex gap-2 items-center'>Temperature </div></Radio.Button>
                                    <Radio.Button value="Pressure"><div className='flex gap-2 items-center'>Pressure </div></Radio.Button>
                                    <Radio.Button value="RH"><div className='flex gap-2 items-center'>RH </div></Radio.Button>
                                </Radio.Group>

                            </div> */}

                            <Select
                                // showSearch
                                onChange={(e) => setDisplay2(e)}
                                style={{ width: 200 }}
                                placeholder="Search to Select"
                                optionFilterProp="label"
                                value={display2}
                                options={types.map((item: any) => {
                                    return {
                                        value: item,
                                        label: dropdownTypesLabel[item]
                                    }
                                })}
                            />
                        </div>

                        <div className=" overflow-hidden flex justify-center">
                            {display2 == "AQI" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last7D?.AQI, "value")} />}
                            {display2 == "CO" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last7D?.CO, "value")} />}
                            {display2 == "NO2" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last7D?.NO2, "value")} />}
                            {display2 == "PM2" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last7D?.PM25, "value")} />}
                            {display2 == "PM10" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last7D?.PM10, "value")} />}
                            {display2 == "O3" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last7D?.O3, "value")} />}
                            {display2 == "SO2" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last7D?.SO2, "value")} />}
                            {display2 == "WD" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last7D?.WD, "value")} />}
                            {display2 == "WS" && airsDetail && <ColumnGraph data={convertPropertyToNumber(airsDetail.Last7D?.WS, "value")} />}

                        </div>
                    </section>
                </div>
            </section>
        </div>
    </>
}