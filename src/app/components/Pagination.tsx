'use client'

import { Button } from "antd"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function Pagination({ pageSize, defaultCurrent, total, className, current, onChange, children }: any) {



    return <>

        <div className="flex justify-center">{children}</div>
        <div className={`flex justify-evenly ${className}`}>
            <Button className="aspect-square w-10 h-10 p-[10px]" onClick={e => onChange((prev: number) => prev > 0 ? prev -= 1 : prev)} value={0}><ArrowLeft /></Button>
            <div className="">
                {current + 1} of {total / pageSize}
            </div>
            <Button className="aspect-square w-10 h-10 p-[10px]" onClick={e => onChange((prev: number) => prev < total-1 ? prev += 1 : prev)} value={1}><ArrowRight /></Button>
        </div>

    </>
    // <Pagination pageSize={pageSize} simple={{ readOnly: true }} defaultCurrent={0} total={sounds.length} className="lg:hidden md:hidden flex justify-center py-3" />
}