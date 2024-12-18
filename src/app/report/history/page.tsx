'use client'

import { useState, useEffect } from 'react';
import { getData } from '@/app/ultilities/api';
import React from 'react';
import { getArrayFromLocalStorage } from '@/app/ultilities/localStorageManager';
import DateFormator from '@/app/ultilities/DateFormater';

export default function Page() {

    const fetchData = async () => {
        if (userUUID) {
            const result = await getData(`/forWeb/getComplainHistory.php?userUUID=${userUUID}`);
            setReportHistory(result.results || []); 
        }
    };

    const [ReportHistory, setReportHistory] = useState([]);
    const userData = getArrayFromLocalStorage('user_data'); 
    const userUUID = userData?.user_id; 

    useEffect(() => {
        fetchData(); 
    }, [userUUID]);

    const complainType : any = {
        "1":"แนะนำ,ติชม",
        "2":"ร้องเรียน",
        "3":"เจ้าหน้าที่ติดต่อกลับ",
    }

    return (
        <>
            <section className="max-w-3xl mx-auto p-6 grid gap-2 sm:p-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">ประวัติการใช้งาน</h1>
                {ReportHistory.length > 0 ? (
                    ReportHistory.map((item:any, index) => (
                        <div className="space-y-4"> 
                            <div className="flex flex-col gap-3 sm:flex-row  justify-between items-start sm:items-center bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm space-y-4 sm:space-y-0">
                                <div className="flex-1">
                                    <span className="block text-sm text-gray-500">วันที่</span>
                                    <p className="text-base font-bold">{DateFormator(new Date((item.createDateTime).split(' ').join("T"))) || '-'}</p>
                                </div>
                                <div className="flex-1">
                                    <span className="block text-sm text-gray-500">ประเภทการร้องเรียน</span>
                                    <p className="text-base font-bold  line-clamp-2 text-ellipsis">{complainType[item.complainType] || '-'}</p>
                                </div>
                                <div className="flex-1">
                                    <span className="block text-sm text-gray-500">ข้อมูลเพิ่มเติม</span>
                                    <p className="text-base font-bold line-clamp-2 text-ellipsis">{item.complainTopic || '-'}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 min-h-screen ">ไม่มีข้อมูลประวัติการใช้งาน</p> 
                )}
            </section>
        </>
    )
}
