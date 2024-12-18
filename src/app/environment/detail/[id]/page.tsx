'use client'
import AreaGraph from '@/app/components/AreaGraph';
import Badge from '@/app/components/Badge';
import ColumnGraph from '@/app/components/ColumnGraph';
import Table from '@/app/components/Table';
import { getData } from '@/app/ultilities/api';
import { Breadcrumb, Radio, Select } from 'antd';
import { ChevronRight, House, MapPin, Waves } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Image as AntImage } from 'antd';
import rearrangeData from '@/app/ultilities/parseFromDate';
import DateFormator, { FullDateFormator } from '@/app/ultilities/DateFormater';
import { convertPropertyToNumber } from '@/app/ultilities/PropsToNumber';
import MultiColumnGraph from '@/app/components/MultiColumnGraph';
import MultiLineGraph from '@/app/components/MultiLineGraph';
import { parameterUnit } from '@/app/globals';

export default function Detail({ params }: { params: any }) {

    const RadioList = [
        "ALL",'O2' , 'NOx' , 'SOx', 'CO' , 'CO2' , 'NH3' , 'H2S' , 'Dust' , 'Opacity', 'Flow'
    ]
    const RadioListLabel :any = {
        'O2' :<>O<sub>2</sub></>,
        'NOx' :"NOx",
        'SOx':'SOx',
        'CO' :'CO',
        'CO2' :<>CO<sub>2</sub></>,
        'NH3' :<>NH<sub>3</sub></>,
        'H2S' :<>H<sub>2</sub>S</>,
        'Dust' :'Dust',
        'Opacity' : 'Opacity',
        'Flow' :'Flow',
        "ALL":'ALL'
    }

    const [display, setDisplay] = useState<'ALL' | 'O2' | 'NOx' | 'SOx'| 'CO' | 'CO2' | 'NH3' | 'H2S' | 'Dust' | 'Opacity'  | 'Flow'>('ALL');
    const [display2, setDisplay2] = useState<'ALL' | 'O2' | 'NOx' | 'SOx'| 'CO' | 'CO2' | 'NH3' | 'H2S' | 'Dust' | 'Opacity'  | 'Flow'>('ALL');

    const [cemsDetail, setCemsDetail] = useState<any>();

    const fetchData = async () => {
        const result = await getData(`/forWeb/getCems24H.php?stationID=${params.id}`)
        setCemsDetail(result.stations && result.stations[0])

    }

    useEffect(() => {
        fetchData();
    }, [])


    const namedArray = (data: any, name: string) => {
        if (!data) return []
        const result = data.map((item: any) => ({
            name,
            ...item,
        }));
        return result
    }


    return <>
        <div className="h-[240px] overflow-hidden w-full flex justify-center">
           <Image width={1023} height={300}
                src={`${cemsDetail?.image_url || "/images/cover-image.png"}`}
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
                        href: '/environment',
                        title: (
                            <>

                                <span className='px-2'>คุณภาพ CEMs</span>
                            </>
                        ),
                    },
                    {
                        title: <div className='rounded-md bg-slate-200 px-2 font-bold'>{cemsDetail?.nameTH}</div>,
                    },
                ]}
            />
            <section className="flex justify-between">
                <div>
                    <h3 className="font-bold text-[30px]">{cemsDetail?.nameTH}</h3>
                    <div className="text-mute text-[16px]">ประจำ{FullDateFormator(new Date(`${cemsDetail?.LastUpdate.date}T${cemsDetail?.LastUpdate.time}`))}</div>
                </div>
                <div className="flex flex-col items-end">
                {/* <Badge status={cemsDetail?.LastUpdate?.effect} name="cems"></Badge> */}
                {cemsDetail?.LastUpdate?.Flow != "N/A" && <Badge status={cemsDetail?.LastUpdate?.effect}  name="other"></Badge> }
                {cemsDetail?.LastUpdate?.Flow == "N/A" && <Badge status={'0'}  name="other"></Badge> }
                    <div className="text-[36px] font-bold">{cemsDetail?.LastUpdate?.flow || "-"} <span className="text-[20px] font-normal">m<sup>3</sup>/s</span></div>
                </div>
            </section>

            <div className="w-full bg-slate-200 h-[1px]  rounded-xl my-10"></div>
            <section className="lg:flex-row flex-col flex ">
                <div className="lg:basis-1/3 py-2">
                    {/* Location */}
                    <span className="text-[14px] text-gray-500 mb-2">ตำแหน่งที่ตั้ง</span>
                    <div className="flex items-center mb-4">
                        <MapPin></MapPin>
                        <span className="text-[14px]">{cemsDetail?.areaTH}</span>
                    </div>

                    {/* Station Name */}
                    <div className="mb-2">
                        <span className="text-[14px] text-gray-500">ประเภทข้อมูล</span>
                        <p className="text-[16px] font-semibold text-gray-900">{cemsDetail?.stationType}</p>
                    </div>

                    {/* Station Code */}
                    <div className="mb-2">
                        <span className="text-[14px] text-gray-500">รหัสสถานี</span>
                        <p className="text-[16px] font-semibold text-gray-900">{cemsDetail?.stationID}</p>
                    </div>

                    {/* Latest Data */}
                    <div>
                        <span className="text-[14px] text-gray-500">ประเภทพื้นที่</span>
                        <p className="text-[16px] font-semibold text-gray-900">
                            ชุมชน
                        </p>
                    </div>
                </div>
                <div className="lg:basis-2/3 w-[90vw]">
                    <div className="w-full  bg-[#F9FAFB] border-2  border-[#EAECF0] rounded-xl p-3 grid lg:grid-cols-3 grid-cols-2 justify-center items-center">
                        <div>
                            <div className='text-[#475467]'>O2</div>
                            <div className='inline-flex gap-2 font-extrabold text-[#344054]'><span>{cemsDetail?.LastUpdate?.O2 !== "N/A" ? cemsDetail?.LastUpdate?.O2 : "-"} {parameterUnit['O2']}</span></div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>NOx</div>
                            <div className='inline-flex gap-2 font-extrabold text-[#344054]'><span>{cemsDetail?.LastUpdate?.NOx !== "N/A" ? cemsDetail?.LastUpdate?.NOx : "-"} {parameterUnit['NOx']}</span></div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>SOx</div>
                            <div className='inline-flex gap-2 font-extrabold text-[#344054]'><span>{cemsDetail?.LastUpdate?.SOx !== "N/A" ? cemsDetail?.LastUpdate?.SOx : "-"} {parameterUnit['SOx']}</span></div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>CO</div>
                            <div className='inline-flex gap-2 font-extrabold text-[#344054]'><span>{cemsDetail?.LastUpdate?.CO !== "N/A" ? cemsDetail?.LastUpdate?.CO : "-"} {parameterUnit['CO']}</span></div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>CO<sub>2</sub></div>
                            <div className='inline-flex gap-2 font-extrabold text-[#344054]'><span>{cemsDetail?.LastUpdate?.CO2 !== "N/A" ? cemsDetail?.LastUpdate?.CO2 : "-"} {parameterUnit['CO2']}</span></div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>NH<sub>3</sub></div>
                            <div className='inline-flex gap-2 font-extrabold text-[#344054]'><span>{cemsDetail?.LastUpdate?.NH3 !== "N/A" ? cemsDetail?.LastUpdate?.NH3 : "-"} {parameterUnit['NH3']}</span></div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>H<sub>2</sub>S</div>
                            <div className='inline-flex gap-2 font-extrabold text-[#344054]'><span>{cemsDetail?.LastUpdate?.H2S !== "N/A" ? cemsDetail?.LastUpdate?.H2S : "-"} {parameterUnit['H2S']}</span></div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>Dust</div>
                            <div className='inline-flex gap-2 font-extrabold text-[#344054]'><span>{cemsDetail?.LastUpdate?.Dust !== "N/A" ? cemsDetail?.LastUpdate?.Dust : "-"} {parameterUnit['Dust']}</span></div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>Opacity</div>
                            <div className='inline-flex gap-2 font-extrabold text-[#344054]'><span>{cemsDetail?.LastUpdate?.Opacity !== "N/A" ? cemsDetail?.LastUpdate?.Opacity : "-"} {parameterUnit['Opacity']}</span></div>
                        </div>
                        <div>
                            <div className='text-[#475467]'>Flow</div>
                            <div className='inline-flex gap-2 font-extrabold text-[#344054]'><span>{cemsDetail?.LastUpdate?.Flow !== "N/A" ? cemsDetail?.LastUpdate?.Flow : "-"} {parameterUnit['Flow']}</span></div>
                        </div>
                       
                    </div>

                    <section>
                        <div className="flex justify-between py-8 gap-5 flex-wrap">
                            <div className="font-bold">ระดับคุณภาพ CEMs ย้อนหลัง 24 ชั่วโมง</div>
                            <div className="">
                                {/* <Radio.Group value={display} onChange={(e) => setDisplay(e.target.value)}>
                                    <Radio.Button value="ALL"><div className='flex gap-2 items-center'>ทั้งหมด </div></Radio.Button>
                                    {RadioList.map( item => <Radio.Button value={item} key={item}><div className='flex gap-2 items-center'>{item}</div></Radio.Button>)}
                                   
                                </Radio.Group> */}

                                <Select
                                    // showSearch
                                    onChange={(e) => setDisplay(e)}
                                    style={{ width: 200 }}
                                    placeholder="Search to Select"
                                    optionFilterProp="label"
                                    value={display}
                                    options={RadioList.map(item => {
                                        return {
                                            value: item,
                                            label: RadioListLabel[item]
                                        }
                                    })}
                                />
                            </div>
                        </div>
                        <div className=" overflow-hidden flex justify-center lg:w-[60vw] w-[80vw]">
                            {display == "ALL" && cemsDetail && <MultiLineGraph data={
                                [
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.O2, "O2"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.NOx, "NOx"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.SOx, "SOx"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.CO, "CO"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.CO2, "CO2"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.NH3, "NH3"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.H2S, "H2S"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.Dust, "Dust"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.Opacity, "Opacity"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last24H?.Opacity, "Flow"), 'value'),
                                ]
                            } />}
                            {display == "O2" && cemsDetail && <AreaGraph data={convertPropertyToNumber(cemsDetail.Last24H?.O2, "value")} />}
                            {display == "CO" && cemsDetail && <AreaGraph data={convertPropertyToNumber(cemsDetail.Last24H?.CO, 'value')} />}
                            {display == "CO2" && cemsDetail && <AreaGraph data={convertPropertyToNumber(cemsDetail.Last24H?.CO2, "value")} />}
                            {display == "Dust" && cemsDetail && <AreaGraph data={convertPropertyToNumber(cemsDetail.Last24H?.Dust, "value")} />}
                            {display == "H2S" && cemsDetail && <AreaGraph data={convertPropertyToNumber(cemsDetail.Last24H?.H2S, "value")} />}
                            {display == "NH3" && cemsDetail && <AreaGraph data={convertPropertyToNumber(cemsDetail.Last24H?.NH3, "value")} />}
                            {display == "NOx" && cemsDetail && <AreaGraph data={convertPropertyToNumber(cemsDetail.Last24H?.NOx, "value")} />}
                            {display == "Opacity" && cemsDetail && <AreaGraph data={convertPropertyToNumber(cemsDetail.Last24H?.Opacity, "value")} />}
                            {display == "SOx" && cemsDetail && <AreaGraph data={convertPropertyToNumber(cemsDetail.Last24H?.SOx, "value")} />}
                            {display == "Flow" && cemsDetail && <AreaGraph data={convertPropertyToNumber(cemsDetail.Last24H?.Flow, "value")} />}
                        </div>
                    </section>

                    <section className='py-10'>
                        <div className="flex justify-between py-8 gap-5 flex-wrap">
                            <div className="font-bold">ระดับคุณภาพ CEMs เฉลี่ยรายชั่วโมง ({display2}, 7D) ย้อนหลัง 7 วัน</div>
                            <Select
                                    // showSearch
                                    onChange={(e) => setDisplay2(e)}
                                    style={{ width: 200 }}
                                    placeholder="Search to Select"
                                    optionFilterProp="label"
                                    value={display2}
                                    options={RadioList.map(item => {
                                        return {
                                            value: item,
                                            label: RadioListLabel[item]
                                        }
                                    })}
                                />
                        </div>

                        <div className=" overflow-hidden flex justify-center">
                            {display2 == "ALL" && cemsDetail && <MultiColumnGraph data={
                                cemsDetail?.Last7D &&
                                [
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last7D?.O2, "O2"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last7D?.NOx, "NOx"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last7D?.SOx, "SOx"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last7D?.CO, "CO"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last7D?.CO2, "CO2"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last7D?.NH3, "NH3"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last7D?.H2S, "H2S"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last7D?.Dust, "Dust"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last7D?.Opacity, "Opacity"), 'value'),
                                    ...convertPropertyToNumber(namedArray(cemsDetail.Last7D?.Flow, "Flow"), 'value'),
                                ]
                            } />}
                            {display2 == "CO" && cemsDetail && <ColumnGraph data={convertPropertyToNumber(cemsDetail.Last7D?.CO, 'value')} />}
                            {display2 == "CO2" && cemsDetail && <ColumnGraph data={convertPropertyToNumber(cemsDetail.Last7D?.CO2, 'value')} />}
                            {display2 == "Dust" && cemsDetail && <ColumnGraph data={convertPropertyToNumber(cemsDetail.Last7D?.Dust, 'value')} />}
                            {display2 == "H2S" && cemsDetail && <ColumnGraph data={convertPropertyToNumber(cemsDetail.Last7D?.H2S, 'value')} />}
                            {display2 == "NH3" && cemsDetail && <ColumnGraph data={convertPropertyToNumber(cemsDetail.Last7D?.NH3, 'value')} />}
                            {display2 == "NOx" && cemsDetail && <ColumnGraph data={convertPropertyToNumber(cemsDetail.Last7D?.NOx, 'value')} />}
                            {display2 == "O2" && cemsDetail && <ColumnGraph data={convertPropertyToNumber(cemsDetail.Last7D?.O2, 'value')} />}
                            {display2 == "Opacity" && cemsDetail && <ColumnGraph data={convertPropertyToNumber(cemsDetail.Last7D?.Opacity, 'value')} />}
                            {display2 == "SOx" && cemsDetail && <ColumnGraph data={convertPropertyToNumber(cemsDetail.Last7D?.SOx, 'value')} />}
                            {display2 == "Flow" && cemsDetail && <ColumnGraph data={convertPropertyToNumber(cemsDetail.Last7D?.Flow, 'value')} />}
                        </div>
                    </section>


                    <section className='py-10'>
                        <div className="flex justify-between py-8 flex-wrap">
                            <div className="font-bold">ระดับคุณภาพ CEMs เฉลี่ยรายชั่วโมง (CEMS, 7D) ย้อนหลัง 7 วัน</div>

                        </div>

                        <div className=" overflow-hidden flex lg:w-[60vw] md:w-[80vw] w-[80vw] justify-center">
                            <Table
                                data={
                                    //     [
                                    //     {
                                    //         key: '1',
                                    //         station: 'HRSG 21',
                                    //         updated: '19 มิ.ย. 66 เวลา 09:00 น.',
                                    //         CO: 2,
                                    //         NOx: 30.94,
                                    //         SO2: 0.07,
                                    //         temperature: 111.45,
                                    //         O2: 15.16,
                                    //         flow: 337024.09,
                                    //         particulate: 0.31,
                                    //     },
                                    // ]
                                    rearrangeData(cemsDetail?.Last7D)
                                }

                                columns={[
                                    // {
                                    //     title: <div className="text-[#475467]">จุดตรวจวัด</div>,
                                    //     dataIndex: 'nameTH',
                                    //     key: 'nameTH',

                                    // },
                                    {
                                        title: <div className="text-[#475467]">เวลาอัพเดต</div>,

                                        dataIndex: 'updated',
                                        key: 'updated',
                                        width:200,
                                        render: (text: string, record: any) => `${DateFormator(new Date(record?.DATETIMEDATA.split(" ").join("T")))}` || 'N/A',

                                    },
                                    {
                                        title: <div className="text-[#475467]">O<sub>2</sub></div>,
                                        
                                        dataIndex: 'O2',
                                        width:150,
                                        render: (text: string, record: any) => (record?.O2) == 'N/A' ? '-' : record?.O2 || 'N/A',

                                    },
                                    {
                                        title: <div className="text-[#475467]">NOx (ppm)</div>,
                                        width:150,
                                        dataIndex: 'NOx',
                                        render: (text: string, record: any) => (record?.NOx) == 'N/A' ? '-' : record?.NOx || 'N/A',

                                    },
                                    {
                                        title: <div className="text-[#475467]">SOx (ppm)</div>,
                                        width:150,
                                        dataIndex: 'SOx',
                                        render: (text: string, record: any) => (record?.SOx) == 'N/A' ? '-' : record?.SOx || 'N/A',

                                    },
                                    {
                                        title: <div className="text-[#475467]">CO (ppm)</div>,
                                        width:150,
                                        dataIndex: 'CO',
                                        render: (text: string, record: any) => (record?.CO) == 'N/A' ? '-' : record?.CO || 'N/A',

                                    },
                                    {
                                        title: <div className="text-[#475467]">CO<sub>2</sub> (ppm)</div>,
                                        width:150,
                                        dataIndex: 'CO2',
                                        render: (text: string, record: any) => (record?.CO2) == 'N/A' ? '-' : record?.CO2 || 'N/A',

                                    },
                                    {
                                        title: <div className="text-[#475467]">NH<sub>3</sub></div>,
                                        width:150,
                                        dataIndex: 'NH3',
                                        render: (text: string, record: any) => (record?.NH3) == 'N/A' ? '-' : record?.NH3 || 'N/A',

                                    },
                                    {
                                        title: <div className="text-[#475467]">H<sub>2</sub>S (ppm)</div>,
                                        width:150,
                                        dataIndex: 'H2S',
                                        render: (text: string, record: any) => (record?.H2S) == 'N/A' ? '-' : record?.H2S || 'N/A',

                                    },
                                    {
                                        title: <div className="text-[#475467]">Dust (µg/m3)</div>,
                                        width:150,
                                        dataIndex: 'Dust',
                                        render: (text: string, record: any) => (record?.Dust) == 'N/A' ? '-' : record?.Dust || 'N/A',

                                    },
                                    {
                                        title: <div className="text-[#475467]">Opacity</div>,
                                        width:150,
                                        dataIndex: 'Opacity',
                                        render: (text: string, record: any) => (record?.Opacity) == 'N/A' ? '-' : record?.Opacity || 'N/A',

                                    },
                                    // {
                                    //     title: <div className="text-[#475467]">CO (ppm)</div>,
                                    //     dataIndex: 'CO',
                                    //     key: 'CO',

                                    // },
                                    // {
                                    //     title: <div className="text-[#475467]">NOx (ppm)</div>,
                                    //     dataIndex: 'NOx',
                                    //     key: 'NOx',

                                    // },
                                    // {
                                    //     title: <div className="text-[#475467]">SOx (ppm)</div>,
                                    //     dataIndex: 'SOx',
                                    //     key: 'SOx',

                                    // },
                                    // {
                                    //     title: <div className="text-[#475467]">Temp (°C)</div>,
                                    //     dataIndex: 'temperature',
                                    //     key: 'temperature',

                                    // },
                                    // {
                                    //     title: <div className="text-[#475467]">O2 (%)</div>,
                                    //     dataIndex: 'O2',
                                    //     key: 'O2',

                                    // },
                                    // {
                                    //     title: <div className="text-[#475467]">Flow (m³/hr)</div>,
                                    //     dataIndex: 'flow',
                                    //     key: 'flow',

                                    // },
                                    // {
                                    //     title: <div className="text-[#475467]">Particulate (mg/m³)</div>,
                                    //     dataIndex: 'particulate',
                                    //     key: 'particulate',

                                    // },
                                ]}
                            />
                        </div>
                    </section>
                </div>
            </section>
        </div>
    </>
}