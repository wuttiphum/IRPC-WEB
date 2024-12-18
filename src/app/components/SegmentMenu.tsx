'use client'

import Segmented from "antd/es/segmented"
import { privatePath, SegmentList, SegmentUserList } from "../globals"
import { useRouter } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";
import { setCookie, getCookie } from "../ultilities/setCookie";
import { Select } from "antd";
import { getArrayFromLocalStorage } from "../ultilities/localStorageManager";


export default function SegmentMenu() {
    const allCategories = [
        "air",
        "water",
        "sound",
        "environment",
        "flare",
        "eqms",
        "dashboard"
    ]

    async function fetchData() {

        const role = getArrayFromLocalStorage("user_data")?.role
        setRole(role || 'client')
        
    }

    useEffect(() => {
        const segment = window.location.href.split('/').pop()
        setSegmentValue(segment!)
        localStorage.setItem("currenSegment", `${segment}`)
        fetchData()

    }, [])



    const [role, setRole] = useState('');

    const [segmentValue, setSegmentValue] = useState<string>();

    const router = useRouter();


    useEffect(() => {
        if(!segmentValue){
            setSegmentValue(localStorage.getItem("currenSegment")!)
        }
        if (segmentValue && allCategories.includes(segmentValue)) {
            router.push(`/${segmentValue}`)
        }

    }, [segmentValue])


    return <>
        <div className="lg:hidden md:block block w-full py-5 ">
            <Select
                style={{ height: "45px" }}
                className="w-full "
                placeholder="Search to Select"
                optionFilterProp="label"
                value={segmentValue}
                options={role == "admin" ? SegmentList : SegmentUserList}
                onChange={setSegmentValue}
            />
        </div>
        <div className="lg:block md:hidden hidden w-full py-5 ">
            <Segmented options={role == "admin" ? SegmentList : SegmentUserList} size='large' style={{ padding: "8px" }} className='w-full py-2 px-2' value={segmentValue} onChange={e => {
                setSegmentValue(e);
                router.push(`/${e}`)
            }} block />
        </div>
    </>
}


