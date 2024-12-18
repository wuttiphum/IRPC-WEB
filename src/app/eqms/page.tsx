'use client'

import { Button, Checkbox} from 'antd';
import { Download, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

import { FullDateFormator } from '../ultilities/DateFormater';
import Link from 'next/link';
import SegmentMenu from '../components/SegmentMenu';
import StationCard from '../components/StationCard';
import Pagination from '../components/Pagination';
import { getData } from '../ultilities/api';

export default function EQMs() {

  const [EQMs, setEQMs] = useState<any>();
  const [currentPage, setCurrentPage] = useState<any>(0);
  const [exportIDs, setExportIDs] = useState<Array<string>>([]);
  const [isCheck, setIsCheck] = useState(true);
  const today = FullDateFormator(new Date())
  const pageSize = 1;
  const fetchData = async () => {
    const result = await getData('/forWeb/getEqmsList.php')
    setEQMs(result || [])
    
  }

  const downloadImage = async () => {
    const query = {
      "station":exportIDs
    }
    const result = await fetch("/api/eqms", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    
    if (result?.ok) {
      const blob = await result.blob(); 
      const imageUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = `EQMS-${new Date().toISOString().split("T")[0]}.png`;
      a.click();

      URL.revokeObjectURL(imageUrl);
    } else {
      console.error('Failed to fetch the image');
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    EQMs && localStorage.setItem('EQMs', EQMs?.length)
    if(EQMs)
    setExportIDs(EQMs.map((item:any) => item?.StationID))
  }, [EQMs]);


  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    
      setRefreshKey((prevKey) => prevKey + 1);
  }, [exportIDs]);

  const handleCheck = (id:string,isCheck:boolean) => {
    if(isCheck) {
      return setExportIDs((prev:any) => [...prev,id]);
    }

    return setExportIDs((prev:any) => {
      const newData = prev.filter((item:string) => item != id)
      return newData
    })
  }

  const handleCheckAll = () => {
    if(!isCheck) {
     return setExportIDs(EQMs.map((item:any) => item?.StationID))
    }
    return setExportIDs([])
 
  }
  return (
    <>

      <section id="header" className="px-10 py-4 bg-white">

        <SegmentMenu />
        <div className="text-[18px] text-[--primary] font-bold">ประจำ{today}</div>
        <div className="flex justify-between lg:flex-row flex-col gap-5">
          <div className="text-[36px] font-bold">สถานีทั้งหมด</div>
          <div className="text-[16px] font-bold items-center  flex gap-3">
           
            <div className="flex font-normal items-center">
              <Checkbox id='checkall' checked={isCheck} onClick={e =>{
                 handleCheckAll();
                 setIsCheck(prev => !prev)
                 }}> </Checkbox>
                  <label htmlFor='checkall'>เลือกทั้งหมด</label>
            </div>
            <Button onClick={e => window?.location.reload()}><RefreshCw className='size-[14px]' /> อัปเดต</Button>
            <form action={downloadImage} ><Button type='primary' htmlType="submit" ><Download className='size-[14px]' />ดาวน์โหลด</Button></form>
          </div>
        </div>



      </section>

      <section id="lists" key={refreshKey} className='px-10 bg-white py-5 min-h-screen'>
        { <div className="lg:grid md:grid lg:grid-cols-3 md:grid-cols-2 hidden gap-5 justify-center">
          {EQMs?.map((item: any,index:number) => <Link key={index} href={`/EQMs/detail/${item?.EqmsID}`}>
            <StationCard data={item} isCheck={exportIDs} checked={handleCheck}></StationCard>
          </Link>)}
        </div>}

        { EQMs?.length > 0 && <div className="lg:hidden md:hidden flex flex-col gap-5 justify-center">
          {[EQMs?.[currentPage]].map((item:any,index:number) => <Link key={index} href={`/EQMs/detail/${item?.EqmsID}`}>
            <StationCard data={item}  isCheck={exportIDs} checked={handleCheck} className=""></StationCard>
          </Link>)}
          <Pagination current={currentPage} onChange={setCurrentPage} pageSize={pageSize} simple={{ readOnly: true }} defaultCurrent={0} total={EQMs?.length} className="lg:hidden md:hidden flex justify-center py-3" />
        </div>}

          {EQMs?.length <= 0 && <div className="flex justify-center items-center h-full">
            ไม่มีรายการนี้แสดง
            </div>}

      </section>




    </>
  );
}
