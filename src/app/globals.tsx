'use client'
import { Badge } from "antd";
import { getArrayFromLocalStorage } from "./ultilities/localStorageManager";
export const parameterUnit = {
    // --- Air
    "PM25" : <>µg/m<sup>3</sup></>,
    "PM10" : <>µg/m<sup>3</sup></>,
    "O3" : "ppb",
    "CO" : "ppm",
    "NO2" : "ppb",
    "SO2" : "ppb",
    // --- Water
    "COD" : "ppm",
    "pH" : "",
    "Flow" : <>m<sup>3</sup>/s</>,
    // --- Cems,
    "O2" : "ppm",
    "NOx" : "ppm",
    "SOx" : "ppm",
    "CO2" : "ppm",
    "NH3" : "",
    "H2S" : "ppm",
    "Dust" : <>µg/m<sup>3</sup></>,
    "Opacity" : "",
    "" : "",
    // --- Sound,
    "Leq" : "dBA",
    "Lmin" : "dBA",
    "Lmax" : "dBA"
  };

  function getTotal(defValue:number,name:string){
    let total = getArrayFromLocalStorage(name) || defValue || 0;

    return total
  }

export const total = {
    "air" :getTotal(5,'air'),
    "sound" :getTotal(4,'sound'),
    "water" :getTotal(3,'water'),
    "environment" :getTotal(19,'environment'),
    "flare" :getTotal(2,'flare'),
    "EQMs" : getTotal(31,'EQMs'),
}

const privatePath = [
    'EQMs',
    'flare'
]

const SegmentList = [
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>
            คุณภาพอากาศ
            <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['air']}</div>} ></Badge>
        </div>,
        value: 'air'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>ระดับเสียง  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['sound']}</div>} ></Badge></div>,
        value: 'sound'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>คุณภาพน้ำ  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['water']}</div>} ></Badge></div>,
        value: 'water'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>CEMs  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['environment']}</div>} ></Badge></div>,
        value: 'environment'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>แฟลร์  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['flare']}</div>} ></Badge></div>,
        value: 'flare'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>EQMs  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['EQMs']}</div>} ></Badge></div>,
        value: 'eqms'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>Dashboard </div>,
        value: 'dashboard'
    },
];
const SegmentUserList = [
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>คุณภาพอากาศ  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['air']}</div>} ></Badge></div>,
        value: 'air'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>ระดับเสียง  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['sound']}</div>} ></Badge></div>,
        value: 'sound'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>คุณภาพน้ำ  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['water']}</div>} ></Badge></div>,
        value: 'water'
    },
    {
        label: <div className='flex gap-2 items-center justify-center text-black'>CEMs  <Badge count={<div className='bg-[#F9FAFB] border-[#EAECF0] border-[1px] text-[#344054] p-1 px-2 rounded-full'>{total['environment']}</div>} ></Badge></div>,
        value: 'environment'
    },
    // {
    //     label: <div className='flex gap-2 items-center justify-center text-black'>Dashboard </div>,
    //     value: 'Dashboard'
    // },
];

export { SegmentList ,SegmentUserList,privatePath};
