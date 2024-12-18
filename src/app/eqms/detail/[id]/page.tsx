'use client'

import { getData, postData } from '@/app/ultilities/api';
import { FullDateFormator } from '@/app/ultilities/DateFormater';
import { Breadcrumb, Button, Checkbox, Input, message, Table, Tag } from 'antd';
import { ChevronRight, House, MapPin, CirclePlay, CloudDownload, Trash2, } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Detail({ params }: any) {
    const [EQMs, setEQMs] = useState<any>();
    const [hasChange, sethasChange] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const fetchData = async () => {
        const result = await getData('/forWeb/getEqmsList.php')
        setEQMs(result?.find((item: any) => item?.EqmsID == params.id) || {})


    }

    const updateField = (path: (string | number)[], newValue: any) => {
        setEQMs((prevEQMs: any) => {
            const updatedEQMs = { ...prevEQMs };

            // Traverse the path to get to the target field
            let current = updatedEQMs;
            for (let i = 0; i < path.length - 1; i++) {
                const key = path[i];

                // If the key doesn't exist, create it as an empty object or array based on next key
                if (current[key] === undefined) {
                    current[key] = typeof path[i + 1] === 'number' ? [] : {};
                }
                current = current[key];
            }

            // Set the new value at the target field
            current[path[path.length - 1]] = newValue;
            sethasChange(true)
            return updatedEQMs;
        });
    };

    const saveChange = async () => {
        const {
            EqmsID,
            StatusParam,
            Remark
        } = EQMs;
        const payload = {
            EqmsID,
            StatusParam,
            remark : Remark
        }
        console.log("UPDATED data : ",payload);
        const result = await postData('/forWeb/updateEqms.php',payload);
        // console.log(result);

        if(result?.status === 'ok'){
            sethasChange(false)
            return success(result?.message);
            
        }else{
            return error(result?.message);
        }
    } 

    
  const error = (msg?: any) => {
    messageApi.open({
      type: 'error',
      content: msg || 'เกิดปัญหาบางอย่าง โปรดลองใหม่ภายหลังหรือติดต่อเจ้าหน้าที่ช่องทางอื่น',
    });
  };

  const success = (msg?: any) => {
    messageApi.open({
      type: 'success',
      content: msg || 'บันทึกข้อมูลสำเร็จ',
    });
  };

    const color: any = {
        'green': 'bg-[--succes-50] border-[--success] text-[--success]',
        'red': 'bg-[--effected] border-[--error-50] text-[--error-50]',
        'other': ''
    }
    useEffect(() => {
        fetchData();
    }, [])

    const { TextArea } = Input;

    return <>
        {contextHolder}
        <div className="container-x bg-white py-10">
            <Breadcrumb
                separator={<ChevronRight />}

                className='py-10'
                items={[
                    {
                        href: '',
                        title: <House />,
                    },
                    {
                        href: '/EQMs',
                        title: (
                            <>
                                <span className='px-2'>สถานีทั้งหมด</span>
                            </>
                        ),
                    },
                    {
                        title: <div className='rounded-md bg-slate-200 px-2 font-bold'>{EQMs?.EqmsType}</div>,
                    },
                ]}
            />
            <section className="flex justify-between flex-wrap gap-5 py-5">
                <div>
                    <h3 className="font-bold text-[30px]">{EQMs?.StationNameEn || "-"}</h3>
                    <div className="text-mute text-[16px]">ประจำ{FullDateFormator(new Date(EQMs?.Updated_At?.split(' ').join("T")))}</div>


                </div>

                {hasChange && <Button onClick={() => saveChange()} className='bg-[--primary] text-white'>Save Change</Button>}
            </section>


            <div className="w-full lg:grid  hidden overflow-x-auto rounded-xl overflow-hidden shadow-md">
                <div className="bg-gray-100 border-b grid grid-cols-8 gap-2">
                    <div className="p-3 text-[14px] font-semibold border-r grid text-center items-center">รหัสสถานี</div>
                    <div className="p-3 text-[14px] font-semibold border-r grid text-center items-center">ชื่อสถานี</div>
                    <div className="p-3 text-[14px] font-semibold border-r grid text-center items-center">ประเภทการตรวจวัด</div>
                    <div className="p-3 text-[14px] font-semibold border-r grid text-center items-center">พารามิเตอร์</div>
                    <div className="p-3 text-[14px] font-semibold border-r grid text-center items-center">ค่าที่ตรวจวัด</div>
                    <div className="p-3 text-[14px] font-semibold border-r grid text-center items-center">สถานะออกจากระบบ</div>
                    <div className="p-3 text-[14px] font-semibold border-r grid text-center items-center">ตรวจสอบสถานะล่าสุด</div>
                    <div className="p-3 text-[14px] font-semibold grid text-center items-center">Remark</div>
                </div>
                <div className=" grid grid-cols-8 gap-2 text-sm text-gray-600" >
                    <div className="p-3 border-r ">{EQMs?.StationID}</div>

                    <div className="grid p-3 border-r ">
                        {EQMs && EQMs?.StatusParam?.map((item?: any,) => (
                            <div key={item?.param} className="">{item?.param}</div>
                        ))}
                    </div>

                    <div className="p-3 border-r ">{EQMs?.EqmsType}</div>

                    <div className="grid p-3 border-r">
                        {EQMs && EQMs?.StatusParam?.map((item?: any,) => (
                            <div key={item?.param} className="">{item?.param}</div>
                        ))}
                    </div>

                    <div className="grid p-3 border-r">
                        {EQMs && EQMs?.StatusParam?.map((item?: any,) => (
                            <div key={item?.param} className=" text-center">
                                {item?.value || "-"}
                            </div>
                        ))}
                    </div>

                    <div className="grid p-3 border-r">
                        {EQMs && EQMs?.StatusParam?.map((item?: any,) => (
                            <div key={item?.param} className="line-clamp-1 text-ellipsis">
                                <div className={`rounded-full  w-fit flex gap-1 items-center  border px-4 py-1 ${color[item?.color || 'other']}`}>
                                    <div className={`size-2 rounded-full ${item?.status == 1 ? "bg-[--success]" : "bg-[--error-50]"}`}></div>
                                    {item?.status == 1 ? "ปกติ" : "มีผลกระทบ"}</div>
                            </div>
                        ))}
                    </div>

                    <div className="p-3 border-r overflow-x-auto hide-scroll grid">
                        {EQMs && EQMs?.StatusParam?.map((item: any, index: number) => (
                            <div key={item?.param} className="p-3  flex gap-2">
                                <Checkbox onClick={e => {
                                    updateField(['StatusParam', index, 'status'], 1);
                                    updateField(['StatusParam', index, 'color'], 'green');

                                }} checked={item?.status == 1 ? true : false}>Normal</Checkbox>
                                <Checkbox onClick={e => {
                                    updateField(['StatusParam', index, 'status'], 2);
                                    updateField(['StatusParam', index, 'color'], 'red');

                                }} checked={item?.status == 2 ? true : false}>Malfunction</Checkbox>
                            </div>
                        ))}

                    </div>

                    <div className="p-3 border-r">{EQMs && <TextArea value={EQMs?.Remark} onChange={e => {
                        updateField(["Remark"], e.target.value);
                        }} placeholder="หมายเหตุ" className="h-full" />}</div>

                </div>

            </div>


            <div className="lg:hidden gap-3 grid">
                {EQMs && EQMs?.StatusParam.map((item: any, index: number) =>
                    <div key={index} className="rounded-2xl border-2   border-[#EAECF0] p-5 relative">
                        <div className="pb-2">
                            <div className="font-bold">ชื่อสถานี</div>
                            <div className="text-[#475467]">{EQMs?.StationNameEn || "-"}</div>
                        </div>
                        <div className="pb-2">
                            <div className="font-bold">ประเภทการตรวจวัด</div>
                            <div className="text-[#475467]">{EQMs?.EqmsType || "-"}</div>
                        </div>
                        <div className="pb-2">
                            <div className="font-bold">พารามิเตอร์</div>
                            <div className="text-[#475467]">{item?.param || "-"}</div>
                        </div>
                        <div className="pb-2">
                            <div className="font-bold">ค่าที่ตรวจวัด</div>
                            <div className="text-[#475467]">{item?.value || "-"}</div>
                        </div>
                        <div className="pb-2">
                            <div className="font-bold">ตรวจสอบสถานะล่าสุด</div>
                            <div className="py-1 flex gap-2">
                                <Checkbox onClick={e => {
                                    updateField(['StatusParam', index, 'status'], 1);
                                    updateField(['StatusParam', index, 'color'], 'green');

                                }} checked={item?.status == 1 ? true : false}>Normal</Checkbox>
                                <Checkbox onClick={e => {
                                    updateField(['StatusParam', index, 'status'], 2);
                                    updateField(['StatusParam', index, 'color'], 'red');

                                }} checked={item?.status == 2 ? true : false}>Malfunction</Checkbox>
                            </div>
                        </div>

                        <div className="grid absolute top-0 right-0 p-3">

                            <div className=" ">
                                <div className={`rounded-full  w-fit flex gap-1 items-center  border px-4 py-1 text-sm ${color[item?.color || "other"]}`}>
                                    <div className={`size-2 rounded-full ${item?.status == 1 ? "bg-[--success]" : "bg-[--error-50]"}`}></div>
                                    {item?.status == 1 ? "ปกติ" : "มีผลกระทบ"}</div>
                            </div>

                        </div>
                    </div>
                )}
            </div>

        </div>
    </>
}