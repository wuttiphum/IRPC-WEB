'use client'
import AreaGraph from '@/app/components/AreaGraph';
import Badge from '@/app/components/Badge';
import ColumnGraph from '@/app/components/ColumnGraph';
import DualGraph from '@/app/components/DualGraph';
import LineGraph from '@/app/components/LineGraph';
import MultiLineGraph from '@/app/components/MultiLineGraph';
import Table from '@/app/components/Table';
import { getData } from '@/app/ultilities/api';
import DateFormator, { FullDateFormator } from '@/app/ultilities/DateFormater';
import rearrangeData from '@/app/ultilities/parseFromDate';
import { convertPropertyToNumber } from '@/app/ultilities/PropsToNumber';
import { Breadcrumb, Radio, Skeleton } from 'antd';
import { ChevronRight, House, MapPin, Waves } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function Detail({ params }: { params: any }) {

    const [display, setDisplay] = useState<'ALL' | 'LEQ' | 'LMAX' | 'LMIN' | 'L90' | 'noise'>('ALL');
    const [displayS, setDisplayS] = useState<'ALL' | 'LEQ' | 'LMAX' | 'LMIN' | 'L90' | 'noise'>('ALL');
    const [display2, setDisplay2] = useState<'ALL' | 'Default' | 'Noise'>('ALL');
    const [soundsDetail, setSoundsDetail] = useState<any>();
    const fetchData = async () => {
        const result = await getData(`/forWeb/getSound24H.php?stationID=${params.id}`)
        setSoundsDetail(result.stations && result.stations[0])

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
                src={`${soundsDetail?.image_url || "/images/cover-image.png"}`}
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
                        href: '/sound',
                        title: (
                            <>

                                <span className='px-2'>คุณภาพเสียง</span>
                            </>
                        ),
                    },
                    {
                        title: <div className='rounded-md bg-slate-200 px-2 font-bold'>{soundsDetail?.nameTH}</div>,
                    },
                ]}
            />
            <section className="flex justify-between">
                <div>
                
                    <h3 className="font-bold text-[30px]">{soundsDetail?.nameTH || <Skeleton.Button block  style={{ width: 160,height:20 }}/>}</h3>
                    <div className="text-mute text-[16px]">ประจำ{FullDateFormator(new Date(`${soundsDetail?.LastUpdate?.date!}T${soundsDetail?.LastUpdate?.time!}`))} </div>
                </div>
                <div className="flex flex-col items-end">
                    {/* <Badge status={soundsDetail?.LastUpdate?.effect} name="sound"></Badge> */}
                    {soundsDetail?.LastUpdate5min?.noise != "N/A" && <Badge status={soundsDetail?.LastUpdate?.effect}  name="sound"></Badge> }
                    {soundsDetail?.LastUpdate5min?.noise == "N/A" && <Badge status={'0'}  name="sound"></Badge> }
                    <div className="text-[36px] font-bold">{soundsDetail?.LastUpdate5min?.noise || <Skeleton.Button block  style={{ width: 160,height:20 }}/>} <span className="text-[20px] font-normal">dBA</span></div>
                </div>
            </section>

            <div className="w-full bg-slate-200 h-[1px]  rounded-xl my-10"></div>
            <section className="flex lg:flex-row flex-col gap-5">
                <div className="lg:basis-1/3 gap-5">
                    {/* Location */}

                    <span className="text-[14px] text-gray-500 pb-2">ตำแหน่งที่ตั้ง</span>
                    <div className="flex items-center mb-4">
                        <MapPin></MapPin>
                        <span className="text-[14px]">{soundsDetail?.areaTH || <Skeleton.Button block  style={{ width: 160,height:20 }}/>}</span>
                    </div>

                    {/* Station Name */}
                    <div className="mb-2">
                        <span className="text-[14px] text-gray-500">ประเภทข้อมูล</span>
                        <p className="text-[16px] font-semibold text-gray-900">กรมควบคุมมลพิษ</p>
                    </div>

                    {/* Station Code */}
                    <div className="mb-2">
                        <span className="text-[14px] text-gray-500">รหัสสถานี</span>
                        <p className="text-[16px] font-semibold text-gray-900">{soundsDetail?.stationID || <Skeleton.Button block  style={{ width: 160,height:20 }}/>}</p>
                    </div>

                    {/* Latest Data */}
                    <div>
                        <span className="text-[14px] text-gray-500">ประเภทพื้นที่</span>
                        <p className="text-[16px] font-semibold text-gray-900">
                            {soundsDetail?.stationType || <Skeleton.Button block  style={{ width: 160,height:20 }}/>}
                        </p>
                    </div>
                </div>
                <div className="lg:basis-2/3">
                    <div className="w-full  bg-[#F9FAFB] border-2 gap-5 border-[#EAECF0] rounded-xl p-3 grid lg:grid-cols-5 grid-cols-2 justify-center items-center">
                        <div>
                            <div className='text-[#475467]'>Leq 1 ชม.</div>
                            <div className='inline-flex gap-2 font-extrabold'>{soundsDetail?.LastUpdate?.Leq} dBA</div>
                        </div>
                        {/* <div>
                            <div className='text-[#475467]'>Leq 15 นาที</div>
                            <div className='inline-flex gap-2 font-extrabold'>{soundsDetail?.LastUpdate?.L10}</div>
                        </div> */}
                        <div>
                            <div className='text-[#475467]'>Leq 5 นาที</div>
                            <div className='inline-flex gap-2 font-extrabold'>{soundsDetail?.LastUpdate?.L5} dBA</div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>Leq 90 นาที</div>
                            <div className='inline-flex gap-2 font-extrabold'>{soundsDetail?.LastUpdate?.L90} dBA</div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>Lmax</div>
                            <div className='inline-flex gap-2 font-extrabold'>{soundsDetail?.LastUpdate?.Lmax} dBA</div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>Lmin</div>
                            <div className='inline-flex gap-2 font-extrabold'>{soundsDetail?.LastUpdate?.Lmin} dBA</div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>Noise</div>
                            <div className='inline-flex gap-2 font-extrabold'>{soundsDetail?.LastUpdate?.noise} dBA</div>
                        </div>
                    </div>

                    <section>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ระดับเสียงมารตรฐานย้อนหลัง 5 นาที 24 ชั่วโมง</div>
                            <div className="">
                                <Radio.Group value={display} onChange={(e) => setDisplay(e.target.value)}>
                                    <Radio.Button value="ALL"><div className='flex gap-2 items-center'>ทั้งหมด </div></Radio.Button>
                                    <Radio.Button value="LEQ"><div className='flex gap-2 items-center'>Leq</div></Radio.Button>
                                    <Radio.Button value="LMAX"><div className='flex gap-2 items-center'>Lmax</div></Radio.Button>
                                    <Radio.Button value="LMIN"><div className='flex gap-2 items-center'>Lmin</div></Radio.Button>
                                    <Radio.Button value="L90"><div className='flex gap-2 items-center'>L90</div></Radio.Button>
                                    <Radio.Button value="noise"><div className='flex gap-2 items-center'>Noise</div></Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className=" overflow-hidden flex justify-center">
                            {/* <DualGraph /> */}
                            {display == "ALL" && soundsDetail && <MultiLineGraph data={[
                                ...convertPropertyToNumber(namedArray(soundsDetail.Last24H5min?.Leq, "Leq"), 'value'),
                                ...convertPropertyToNumber(namedArray(soundsDetail.Last24H5min?.Lmin, "Lmin"), 'value'),
                                ...convertPropertyToNumber(namedArray(soundsDetail.Last24H5min?.Lmax, "Lmax"), 'value'),
                                ...convertPropertyToNumber(namedArray(soundsDetail.Last24H5min?.L90, "L90"), 'value'),
                                ...convertPropertyToNumber(namedArray(soundsDetail.Last24H5min?.noise, "Noise"), 'value'),

                            ]} />}

                            {display == "LEQ" && soundsDetail && <AreaGraph data={convertPropertyToNumber(soundsDetail.Last24H5min?.Leq, "value")}></AreaGraph>}
                            {display == "LMAX" && soundsDetail && <AreaGraph data={convertPropertyToNumber(soundsDetail.Last24H5min?.Lmax, "value")}></AreaGraph>}
                            {display == "LMIN" && soundsDetail && <AreaGraph data={convertPropertyToNumber(soundsDetail.Last24H5min?.Lmin, "value")}></AreaGraph>}
                            {display == "L90" && soundsDetail && <AreaGraph data={convertPropertyToNumber(soundsDetail.Last24H5min?.L90, "value")}></AreaGraph>}
                            {display == "noise" && soundsDetail && <AreaGraph data={convertPropertyToNumber(soundsDetail.Last24H5min?.noise, "value")}></AreaGraph>}
                        </div>
                    </section>

                    {/* เสียงมาตรฐาน */}
                    <section>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ระดับเสียงมาตรฐานย้อนหลัง 24 ชั่วโมง</div>
                            <div className="">
                                <Radio.Group value={displayS} onChange={(e) => setDisplayS(e.target.value)}>
                                    <Radio.Button value="ALL"><div className='flex gap-2 items-center'>ทั้งหมด </div></Radio.Button>
                                    <Radio.Button value="LEQ"><div className='flex gap-2 items-center'>Leq</div></Radio.Button>
                                    <Radio.Button value="LMAX"><div className='flex gap-2 items-center'>Lmax</div></Radio.Button>
                                    <Radio.Button value="LMIN"><div className='flex gap-2 items-center'>Lmin</div></Radio.Button>
                                    <Radio.Button value="L90"><div className='flex gap-2 items-center'>L90</div></Radio.Button>
                                    <Radio.Button value="noise"><div className='flex gap-2 items-center'>Noise</div></Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className=" overflow-hidden flex justify-center">
                            {/* <DualGraph /> */}
                            {displayS == "ALL" && soundsDetail && <MultiLineGraph data={[
                                ...convertPropertyToNumber(namedArray(soundsDetail.Last24H?.Leq, "Leq"), 'value'),
                                ...convertPropertyToNumber(namedArray(soundsDetail.Last24H?.Lmin, "Lmin"), 'value'),
                                ...convertPropertyToNumber(namedArray(soundsDetail.Last24H?.Lmax, "Lmax"), 'value'),
                                ...convertPropertyToNumber(namedArray(soundsDetail.Last24H?.L90, "L90"), 'value'),
                                ...convertPropertyToNumber(namedArray(soundsDetail.Last24H?.noise, "Noise"), 'value'),

                            ]} />}

                            {displayS == "LEQ" && soundsDetail && <AreaGraph data={convertPropertyToNumber(soundsDetail.Last24H?.Leq, "value")}></AreaGraph>}
                            {displayS == "LMAX" && soundsDetail && <AreaGraph data={convertPropertyToNumber(soundsDetail.Last24H?.Lmax, "value")}></AreaGraph>}
                            {displayS == "LMIN" && soundsDetail && <AreaGraph data={convertPropertyToNumber(soundsDetail.Last24H?.Lmin, "value")}></AreaGraph>}
                            {displayS == "L90" && soundsDetail && <AreaGraph data={convertPropertyToNumber(soundsDetail.Last24H?.L90, "value")}></AreaGraph>}
                            {displayS == "noise" && soundsDetail && <AreaGraph data={convertPropertyToNumber(soundsDetail.Last24H?.noise, "value")}></AreaGraph>}
                        </div>
                    </section>

                    {/* <section className='py-10'>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">เสียงพื้นฐานและเสียงรบกวน</div>
                            <div className="">
                                <Radio.Group value={display2} onChange={(e) => setDisplay2(e.target.value)}>
                                    <Radio.Button value="ALL"><div className='flex gap-2 items-center'>ทั้งหมด </div></Radio.Button>
                                    <Radio.Button value="Default"><div className='flex gap-2 items-center'>เสียงมาตรฐาน</div></Radio.Button>
                                    <Radio.Button value="Noise"><div className='flex gap-2 items-center'>เสียงรบกวน </div></Radio.Button>
                                </Radio.Group>

                            </div>
                        </div>

                        <div className=" overflow-hidden flex justify-center">
                           
                            {display2 == "ALL" && soundsDetail && <MultiLineGraph data={[
                                ...convertPropertyToNumber(namedArray(soundsDetail.Last24H?.L5, "L5"), 'value'),
                                ...convertPropertyToNumber(namedArray(soundsDetail.Last24H?.L50, "L50"), 'value'),


                            ]} />}

                            {display2 == "Default" && soundsDetail && <AreaGraph data={convertPropertyToNumber(soundsDetail.Last24H?.L50, "value")} />}
                            {display2 == "Noise" && soundsDetail && <AreaGraph data={convertPropertyToNumber(soundsDetail.Last24H?.L5, "value")} />}

                        </div>
                    </section> */}


                    <section className='py-10'>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ระดับเสียงเฉลี่ยรายชั่วโมง (Leq, 7D) ย้อนหลัง 7 วัน</div>

                        </div>

                        <div className=" overflow-hidden flex justify-center">
                            {soundsDetail && <ColumnGraph data={convertPropertyToNumber(soundsDetail.Last7D?.Leq, 'value')} />}
                        </div>
                    </section>
                    <section className='py-10'>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ระดับเสียงเฉลี่ยรายชั่วโมง (Leq,Lmin,Lmax,L90,Noise 7D) ย้อนหลัง 7 วัน</div>

                        </div>

                        <div className=" overflow-hidden flex justify-center">
                            <Table className="w-full" data={
                             
                                rearrangeData(soundsDetail?.Last7D)
                            }

                                columns={
                                    [
                                        {
                                            title: <div className="text-[#475467]">เวลาอัพเดต</div>,
                                            dataIndex: 'updated',
                                            width: 200,
                                            ellipsis: true,
                                            render: (text: string, record: any) => `${DateFormator(new Date(record?.DATETIMEDATA.split(" ").join("T")))}` || 'N/A',
                                        },
                                        {
                                            title: <div className="text-[#475467]">Leq <span>(dBA)</span></div>,
                                            dataIndex: 'Leq',
                                            width: 100,
                                            ellipsis: true,
                                        },
                                        {
                                            title: <div className="text-[#475467]">L90 <span>(dBA)</span></div>,
                                            dataIndex: 'L90',
                                            width: 100,
                                            ellipsis: true,
                                        },
                                        {
                                            title: <div className="text-[#475467]">Lmin <span>(dBA)</span></div>,
                                            dataIndex: 'Lmin',
                                            width: 100,
                                            ellipsis: true,
                                        },
                                        {
                                            title: <div className="text-[#475467]">Lmax <span>(dBA)</span></div>,
                                            dataIndex: 'Lmax',
                                            width: 100,
                                            ellipsis: true,
                                        },
                                        {
                                            title: <div className="text-[#475467]">Noise <span>(dBA)</span></div>,
                                            dataIndex: 'noise',
                                            width: 100,
                                            ellipsis: true,
                                        },
                                    ]
                                }
                            ></Table>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    </>
}