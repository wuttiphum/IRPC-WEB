'use client'
import AreaGraph from '@/app/components/AreaGraph';
import Badge from '@/app/components/Badge';
import ColumnGraph from '@/app/components/ColumnGraph';
import MultiColumnGraph from '@/app/components/MultiColumnGraph';
import MultiLineGraph from '@/app/components/MultiLineGraph';
import Table from '@/app/components/Table';
import { Water } from '@/app/models/models';
import { getData } from '@/app/ultilities/api';
import DateFormator, { FullDateFormator } from '@/app/ultilities/DateFormater';
import { Breadcrumb, Radio } from 'antd';
import { ChevronRight, House, MapPin, Waves } from 'lucide-react';
import Image from 'next/image';
import { Image as AntImage } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { convertPropertyToNumber } from '@/app/ultilities/PropsToNumber';
import rearrangeData from '@/app/ultilities/parseFromDate';


export default function Detail({ params }: { params: any }) {

    const [display, setDisplay] = useState<'ALL' | 'COD' | 'FLOW' | 'PH'>('ALL');
    const [display2, setDisplay2] = useState<'ALL' | 'COD' | 'FLOW' | 'PH'>('ALL');
    const [watersDetail, setWatersDetail] = useState<any>();

    const fetchData = async () => {
        const result = await getData(`/forWeb/getWater24H.php?stationID=${params.id}`)
        setWatersDetail(result.stations && result.stations[0])

    }

    const namedArray = (data: any, name: string) => {
        if (!data) return []
        const result = data.map((item: any) => ({
            name,
            ...item,
        }));
        return result
    }

    useEffect(() => {
        fetchData();
    }, [])


    return <>
        <div className="h-[240px] overflow-hidden w-full flex justify-center">
            <Image width={1023} height={300}
                src={`${watersDetail?.image_url || "/images/cover-image.png"}`}
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
                        href: '/water',
                        title: (
                            <>

                                <span className='px-2'>ดัชนีคุณภาพน้ำ</span>
                            </>
                        ),
                    },
                    {
                        title: <div className='rounded-md bg-slate-200 px-2 font-bold'>{watersDetail?.nameTH}</div>,
                    },
                ]}
            />
            <section className="flex justify-between">
                <div>
                    <h3 className="font-bold text-[30px]">{watersDetail?.nameTH}</h3>
                    <div className="text-mute text-[16px]">ประจำ{FullDateFormator(new Date(`${watersDetail?.LastUpdate.date!}T${watersDetail?.LastUpdate.time!}`))} </div>
                </div>
                <div className="flex flex-col items-end">
                    {/* <Badge status={watersDetail?.LastUpdate?.effect} name="water"></Badge> */}
                    {watersDetail?.LastUpdate?.Flow != "N/A" && <Badge status={watersDetail?.LastUpdate?.effect}  name="water"></Badge> }
                    {watersDetail?.LastUpdate?.Flow == "N/A" && <Badge status={'0'}  name="water"></Badge> }
                    <div className="text-[36px] font-bold">{watersDetail?.LastUpdate.COD}<span className="text-[20px] font-normal">COD/mgI</span></div>
                </div>
            </section>

            <div className="w-full bg-slate-200 h-[1px]  rounded-xl my-10"></div>
            <section className="flex lg:flex-row flex-col">
                <div className="lg:basis-1/3">
                    {/* Location */}
                    <span className="text-[14px] text-gray-500 mb-2">ตำแหน่งที่ตั้ง</span>
                    <div className="flex items-center mb-4">
                        <MapPin></MapPin>
                        <span className="text-[14px]">{watersDetail?.areaTH}</span>
                    </div>

                    {/* Station Name */}
                    <div className="mb-2">
                        <span className="text-[14px] text-gray-500">ประเภทข้อมูล</span>
                        <p className="text-[16px] font-semibold text-gray-900">{watersDetail?.stationType}</p>
                    </div>

                    {/* Station Code */}
                    <div className="mb-2">
                        <span className="text-[14px] text-gray-500">รหัสสถานี</span>
                        <p className="text-[16px] font-semibold text-gray-900">{watersDetail?.stationID}</p>
                    </div>

                    {/* Latest Data */}
                    <div>
                        <span className="text-[14px] text-gray-500">ประเภทพื้นที่</span>
                        <p className="text-[16px] font-semibold text-gray-900">
                            ชุมชน
                        </p>
                    </div>
                </div>
                <div className="lg:basis-2/3">
                    <div className="w-full  bg-[#F9FAFB] border-2  border-[#EAECF0] rounded-xl p-3 grid lg:grid-cols-3 grid-cols-2 justify-center items-center">

                        <div>
                            <div className='text-[#475467]'>Flow</div>
                            <div className='inline-flex gap-2 font-extrabold text-[#344054]'>{watersDetail?.LastUpdate.Flow} m³/s</div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>pH</div>
                            <div className='inline-flex gap-2 font-extrabold text-[#344054]'>{watersDetail?.LastUpdate.pH} </div>
                        </div>
                    </div>

                    <section>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ค่า COD, Flow, pH ย้อนหลัง 24 ชั่วโมง</div>
                            <div className="">
                                <Radio.Group value={display} onChange={(e) => setDisplay(e.target.value)}>
                                    <Radio.Button value="ALL"><div className='flex gap-2 items-center'>ทั้งหมด </div></Radio.Button>
                                    <Radio.Button value="COD"><div className='flex gap-2 items-center'>COD </div></Radio.Button>
                                    <Radio.Button value="FLOW"><div className='flex gap-2 items-center'>Flow</div></Radio.Button>
                                    <Radio.Button value="PH"><div className='flex gap-2 items-center'>pH</div></Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className=" overflow-hidden flex justify-center">
                            {display == "ALL" && watersDetail && <MultiLineGraph data={
                                [
                                    ...convertPropertyToNumber(namedArray(watersDetail.Last24H?.pH, "pH"), 'value'),
                                    ...convertPropertyToNumber(namedArray(watersDetail.Last24H?.Flow, "Flow"), 'value'),
                                    ...convertPropertyToNumber(namedArray(watersDetail.Last24H?.COD, "COD"), 'value'),
                                ]
                            } />}
                            {display == "COD" && watersDetail && <AreaGraph data={convertPropertyToNumber(watersDetail.Last24H?.COD, "value")} />}
                            {display == "PH" && watersDetail && <AreaGraph data={convertPropertyToNumber(watersDetail.Last24H?.pH, "value")} />}
                            {display == "FLOW" && watersDetail && <AreaGraph data={convertPropertyToNumber(watersDetail.Last24H?.Flow, 'value')} />}
                        </div>
                    </section>

                    <section className='py-10'>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ระดับคุณภาพเฉลี่ยรายชั่วโมง ({display2}, 24hr) ย้อนหลัง 7 วัน</div>
                            <Radio.Group value={display2} onChange={(e) => setDisplay2(e.target.value)}>
                                <Radio.Button value="ALL"><div className='flex gap-2 items-center'>ทั้งหมด </div></Radio.Button>
                                <Radio.Button value="COD"><div className='flex gap-2 items-center'>COD </div></Radio.Button>
                                <Radio.Button value="FLOW"><div className='flex gap-2 items-center'>Flow</div></Radio.Button>
                                <Radio.Button value="PH"><div className='flex gap-2 items-center'>pH</div></Radio.Button>
                            </Radio.Group>
                        </div>

                        <div className=" overflow-hidden flex justify-center">
                            {display2 == "ALL" && watersDetail && <MultiColumnGraph data={
                                watersDetail?.Last7D &&
                                [
                                    ...convertPropertyToNumber(namedArray(watersDetail.Last7D?.COD, "COD"), 'value'),
                                    ...convertPropertyToNumber(namedArray(watersDetail.Last7D?.pH, "pH"), 'value'),
                                    ...convertPropertyToNumber(namedArray(watersDetail.Last7D?.Flow, "Flow"), 'value')
                                ]
                            } />}
                            {display2 == "COD" && watersDetail && <ColumnGraph data={convertPropertyToNumber(watersDetail.Last7D?.COD, 'value')} />}
                            {display2 == "PH" && watersDetail && <ColumnGraph data={convertPropertyToNumber(watersDetail.Last7D?.pH, 'value')} />}
                            {display2 == "FLOW" && watersDetail && <ColumnGraph data={convertPropertyToNumber(watersDetail.Last7D?.Flow, 'value')} />}

                        </div>
                    </section>


                    <section className='py-10'>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ระดับคุณภาพเฉลี่ยรายชั่วโมง (CEMS, 24hr) ย้อนหลัง 7 วัน</div>

                        </div>

                        <div className=" overflow-hidden flex justify-center w-full">
                            <Table
                                className="w-full"
                                data={
                                    //     [
                                    //     {
                                    //         key: '1',
                                    //         updated: '11 มิ.ย. 66 เวลา 09:00 น.',
                                    //         COD: 51.3,
                                    //         flow: 63.6,
                                    //         PH: 66.2,
                                    //     },
                                    // ]
                                    rearrangeData(watersDetail?.Last24H)
                                }

                                columns={[
                                    {
                                        title: <div className="text-[#475467]">เวลาอัพเดต</div>,
                                        dataIndex: 'DATETIMEDATA',
                                        key: 'DATETIMEDATA',
                                        width:200,
                                        render: (text: string, record: any) => `${DateFormator(new Date(record?.DATETIMEDATA.split(" ").join("T")))}` || 'N/A',
                                    },
                                    {
                                        title: <div className="text-[#475467]">COD (mg/l)</div>,
                                        dataIndex: 'COD',
                                        key: 'COD',
                                        width:150,
                                        render: (text: string, record: any) => record?.COD == "N/A" ? "-" : record?.COD 
                                    },
                                    {
                                        title: <div className="text-[#475467]">Flow (m³)</div>,
                                        dataIndex: 'Flow',
                                        key: 'Flow',
                                        width:150,
                                        render: (text: string, record: any) => record?.Flow == "N/A" ? "-" : record?.Flow 
                                    },
                                    {
                                        title: <div className="text-[#475467]">pH</div>,
                                        dataIndex: 'pH',
                                        key: 'pH',
                                        width:150,
                                        render: (text: string, record: any) => record?.pH == "N/A" ? "-" : record?.pH 
                                    },
                                ]}
                            />
                        </div>
                    </section>
                </div>
            </section>
        </div>
    </>
}