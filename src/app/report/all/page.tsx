'use client'
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getData } from '@/app/ultilities/api';
import { Image } from 'antd';
import Paginations from '@/app/components/Paginations';


export default function ReportsPage() {

    const [ReportPostCard, setReportPostCard] = useState([])

    const fetchData = async () => {
        const result = await getData('/forWeb/reportList.php')
        setReportPostCard(result.report || [])
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="container-x mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">รายงานประจำวันทั้งหมด</h2>

            <Paginations
                pageSize={6}
                items={[
                    ...ReportPostCard
                ]}
                emptyTxt="ไม่มีข่าวสารเพิ่มเติม"
                classNames={{
                    items: ReportPostCard ? "py-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5" : ''
                }}
                renderItem={(item: any,) => (
                    <div key={item?.DATETIMEDATA} className=" p-4 rounded-lg transition-shadow">
                        <div className="flex justify-center mb-4">
                            <Image src={item.reportFile} alt="Report" wrapperClassName='w-[160px] h-[226px] object-cover' className="w-[160px] h-[226px] object-cover" />
                        </div>
                        <a href={item.reportFile} target='_blank' className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">คุณภาพอากาศโดยรวม</h3>
                            <ArrowUpRight className="ml-2" />
                        </a>
                        <p className="text-gray-500 pt-2">{item.dateThai}</p>
                    </div>
                )} className="">

            </Paginations>
            
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ReportPostCard.map((item: any, index) => (
                    <div key={index} className=" p-4 rounded-lg transition-shadow">
                        <div className="flex justify-center mb-4">
                            <Image src={item.reportFile} alt="Report" wrapperClassName='w-[160px] h-[226px] object-cover' className="w-[160px] h-[226px] object-cover" />
                        </div>
                        <a href={item.reportFile} target='_blank' className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">คุณภาพอากาศโดยรวม</h3>
                            <ArrowUpRight className="ml-2" />
                        </a>
                        <p className="text-gray-500 pt-2">{item.dateThai}</p>
                    </div>
                ))}
            </div> */}
            
        </div>

    );
}
