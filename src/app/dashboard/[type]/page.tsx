'use client'
import { Breadcrumb, Button, Input, Select, Tabs, TabsProps } from "antd";

import { ChevronRight, CloudDownload, House, Key, RefreshCw, Search } from "lucide-react";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import { useEffect, useState } from "react";
import { getData } from "@/app/ultilities/api";
import MultiColumnGraph from "@/app/components/MultiColumnGraph";
import { convertPropertyToNumber } from "@/app/ultilities/PropsToNumber";
import { namedArray } from "@/app/ultilities/ExtractKeys";
import StackedColumnChart from "@/app/components/stackGraph";

const monthsInThai = [
    { value: '1', label: 'มกราคม' },
    { value: '2', label: 'กุมภาพันธ์' },
    { value: '3', label: 'มีนาคม' },
    { value: '4', label: 'เมษายน' },
    { value: '5', label: 'พฤษภาคม' },
    { value: '6', label: 'มิถุนายน' },
    { value: '7', label: 'กรกฎาคม' },
    { value: '8', label: 'สิงหาคม' },
    { value: '9', label: 'กันยายน' },
    { value: '10', label: 'ตุลาคม' },
    { value: '11', label: 'พฤศจิกายน' },
    { value: '12', label: 'ธันวาคม' },
];


export default function Page({ params }: any) {

    const [display, setDisplay] = useState<number>();
    const [airsFiltered, setAirsFiltered] = useState<any>("");

    const [curTab, setCurTab] = useState<string>("");
    const [Data, setData] = useState<any>();
    const handleSearch = async (keyword: string) => {
        setAirsFiltered(keyword)
    };

    const fetchData = async () => {
        const result = await getData(`/forWeb/getReportDashboad.php?type=${params.type.toUpperCase()}&month=${(display)}`)
        setData(result.stations || [])
    }

    const nameMap: any = {
        'air': 'คุณภาพอากาศ',
        'water': 'คุณภาพน้ำ',
        'sound': 'ระดับเสียง',
        'cems': 'CEMs',
    }




    const typesLabel: any = {
        'AQI': "ดัชนีคุณภาพอากาศ AQI ",
        'PM2': <>ฝุ่นละออง PM<sub>2.5</sub></>,
        'PM10': <>ฝุ่นละออง PM<sub>10</sub></>,
        'O3': <>ก๊าซโอโซน O<sub>3</sub></>,
        'CO': "ก๊าซคาร์บอนมอนอกไซด์ CO",
        'NO2': <>ก๊าซไนโตรเจนไดออกไซด์ NO<sub>2</sub></>,
        'SO2': <>ก๊าซซัลเฟอร์ไดออกไซด์ SO<sub>2</sub></>,

    };

    useEffect(() => {
        if (display) {
            fetchData();
        }
    }, [display])

    useEffect(() => {
        setDisplay(new Date().getMonth() + 1)
        setCurTab(paramsMap[params.type]?.[0].key || "")
    }, [])


    const paramsMap: any = {
        air: [
            { key: 'PM2', label: 'PM2.5' },
            { key: 'PM10', label: 'PM10' },
            { key: 'O3', label: 'O3' },
            { key: 'CO', label: 'CO' },
            { key: 'NO2', label: 'NO2' },
            { key: 'SO2', label: 'SO2' },
        ],
        sound: [
            { key: 'Leq', label: 'Leq' },
            { key: 'Leq90', label: 'Leq90' },
            { key: 'Lmax', label: 'Lmax' },
            { key: 'Lmin', label: 'Lmin' },
        ],
        water: [
            { key: 'COD', label: 'COD' },
            { key: 'FLOW', label: 'FLOW' },
            { key: 'pH', label: 'pH' },
        ],
        cems: [
            { key: 'Flow', label: 'Flow' },
            { key: 'O2', label: 'O2' },
            { key: 'NOx', label: 'NOx' },
            { key: 'SOx', label: 'SOx' },
            { key: 'CO', label: 'CO' },
            { key: 'CO2', label: 'CO2' },
            { key: 'NH3', label: 'NH3' },
            { key: 'H2S', label: 'H2S' },
            { key: 'Dust', label: 'Dust' },
            { key: 'Opacity', label: 'Opacity' },
        ]
    }


    const formattedPollutants = paramsMap[params.type]
    // .map((item:any) => ({
    //     key: item,
    //     label: item
    // }));

    const onChange = (key: string) => {
        // console.log(key);

        setCurTab(key)
    };

    const items: TabsProps['items'] = [
        ...formattedPollutants
    ];



    return <>

        <section id="header" className="px-16 py-4 bg-white container-x">
            {/* {display} */}
            <Breadcrumb
                separator={<ChevronRight />}

                className='py-2'
                items={[
                    {
                        href: '',
                        title: <House />,
                    },
                    {
                        href: '/Dashboard',
                        title: <>

                            <span className='px-2'>Dashboard</span>
                        </>,
                    },
                    {
                        href: '',
                        title: (
                            <>

                                <span className='px-3 py-1 hover:bg-none rounded-md bg-slate-100 '>{nameMap[params.type]}</span>
                            </>
                        ),
                    },

                ]}
            />
            <div className="flex flex-wrap gap-5 justify-between items-end">
                <div className="py-2">

                    <div className="text-[36px] font-bold">{nameMap[params.type]}</div>
                    <div className="text-sm text-gray-800">ข้อมูลการส่งรายงานของทุกสถานี</div>
                </div>
                <div className="text-[16px] font-bold flex gap-2">
                    <Button onClick={() => {
                        window.location.reload();
                    }} className=" w-[150px] font-bold"><RefreshCw className='size-[14px] ' /> อัปเดตข้อมูล</Button>
                </div>
            </div>

        </section>


        <section className="px-16 py-10 container-x bg-white flex lg:flex-row flex-col gap-3 justify-between">
            <Select
                // showSearch
                onChange={(e) => setDisplay(e)}
                // style={{ width: 200 }}
                className="lg:w-[200px] w-full"
                placeholder="Month"
                optionFilterProp="children"
                optionLabelProp="label"

                value={display}
                options={monthsInThai}
            />
            <div className="search"> <Input onChange={e => handleSearch(e.target.value)} size="middle" placeholder="ค้นหา" style={{ fontFamily: "prompt", padding: "0px 5px" }} className="text-slate-500 noto-sans" prefix={<Search className='text-slate-500 ml-2' />} /></div>
        </section>

        <section className="bg-white px-16 container-x overflow-clip">
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            <div className="text-xl py-2 font-bold">ข้อมูลตรวจวัด{typesLabel[curTab]}</div>
            <div className="p-10">
                {/* {curTab && Data?.map((item: any, index: number) => <div key={index}>
                    <div className="font-bold pb-8 pt-12">{item?.NameTh} : CUR - {curTab}</div>
                    <MultiColumnGraph data={
                        [
                            ...convertPropertyToNumber(namedArray(item?.[curTab], curTab || ""), 'value'),

                           
                        ]
                    } />
                </div>)} */}
                <Graph curTab={curTab} Data={Data} filter={airsFiltered} />
            </div>


        </section>

        <Footer />

    </>
}


const Graph = ({ curTab, Data, filter }: { curTab: string; Data: any[], filter: string }) => {
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        // Trigger a re-render by changing the refreshKey when curTab changes
        setRefreshKey((prevKey) => prevKey + 1);
    }, [curTab, Data, filter]);

    return (
        <div key={refreshKey}>
            {curTab && Data?.filter((item: any) => {
                if (!filter) return item
                return item?.NameTh?.toLowerCase().includes(filter.toLowerCase())
            }).map((item: any, index: number) => (
                <div key={index}>
                    <div className="font-bold pb-8 pt-12">{item?.NameTh}</div>
                    <MultiColumnGraph
                    color={() => `l(90) 0:rgba(82, 139, 255, 1) 1:rgba(0, 78, 235, 1)`}
                        data={[
                            ...convertPropertyToNumber(namedArray(item?.[curTab], curTab || ""), 'value'),
                        ]}
                    />
                </div>
            ))}
        </div>
    );
};