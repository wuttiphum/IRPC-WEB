'use client'
import { ArrowRight, ArrowUpRight, ChevronRight, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Card from "./components/Card";
import SoundCard from "./components/SoundCard";
import { FullDateFormator, ShortDateFormator } from "./ultilities/DateFormater";
import Badges from "./components/Badges";
import { Button, Segmented, Select, Image as ImageAnt } from "antd";
import WaterCard from "./components/WaterCard";
import MapPick from "./components/MapPick";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import { SegmentList, SegmentUserList } from "./globals";
import EnvironmentCard from "./components/EnvironmentCard";
import Flarecard from "./components/Flarecard";
import StationCard from "./components/StationCard";
import { getData } from "./ultilities/api";
import { getArrayFromLocalStorage } from "./ultilities/localStorageManager";
import Favourite from "./components/Favourite";
import Badge from "./components/Badge";
import { isOnline } from "./components/OnlineDot";


const MeasuringMap: any = {
  "air": "/forWeb/getAirLast.php",
  "sound": "/forWeb/getSoundLast.php",
  "water": "/forWeb/getWaterLast.php",
  "environment": "/forWeb/getCemsLast.php",
  "flare": "/forWeb/getCemsLast.php",
  "EQMs": "/forWeb/getEqmsList.php",
}

const MeasuringUnitMap: any = {
  "air": "AQI",
  "sound": "dBA",
  "water": "ppm",
  "environment": "m³/s",
  "flare": "",
  "EQMs": "",
}

export default function Home() {
  const [selectedPlace, setSelectedPlace] = useState<any>();
  const [segmentValue, setSegmentValue] = useState<string>("air");

  const [MeasuringData, setMeasuringData] = useState<any>();
  const [DashBoard, setDashBoard] = useState<any>();

  const [allData, setallData] = useState<any>();
  const [showMap, setShowMap] = useState(true);
  const [visible, setVisible] = useState(false);

  const fetchData = async () => {
    const result = await getData('/forWeb/getDashbord.php')
    setDashBoard(result || {})
  }

  const fetchAll = async () => {
    const air = await getData('/forWeb/getAirLast.php')
    const water = await getData('/forWeb/getWaterLast.php')
    const cems = await getData('/forWeb/getCemsLast.php')
    const sound = await getData('/forWeb/getSoundLast.php')

    setallData({
      "air": air?.stations?.[0],
      "water": water?.stations?.[0],
      "cems": cems?.stations?.[0],
      "sound": sound?.stations?.[0],
    })
  }

  const fetchMeasuringData = async () => {
    const result = await getData(MeasuringMap[segmentValue])
    if (segmentValue == 'EQMs') {
      // console.log(result)
      setMeasuringData(result)
    } else {
      setMeasuringData(result.stations || {})
    }

  }

  const previewImage = () => {
    setVisible(true);
  }


  useEffect(() => {
    fetchData();
    fetchAll();
  }, [])


  useEffect(() => {
    fetchMeasuringData();
    // alert(segmentValue)
    if (segmentValue.includes("EQMs") || segmentValue.includes("Dashboard")) {
      setShowMap(false);
    } else {
      setShowMap(true);
    }
  }, [segmentValue])

  useEffect(() => {
    // console.log("Current Data : ",MeasuringData);
    if (MeasuringData)
      setSelectedPlace(MeasuringData[0])
  }, [MeasuringData]);




  return (
    <>

      <div className="relative ">
        <div className="h-[300px] justify-center overflow-hidden lg:flex md:hidden hidden">
          <Image src="/images/sulu2.png" alt="" width={1440} height={372} className="h-full w-full brightness-50   object-cover absolute z-[-10] " >
          </Image>
          <div className="relative flex flex-col items-center justify-center h-[400px] text-center ">
            <p className=" text-white text-3xl font-bold">รายงานผลการตรวจสอบ</p>
            <p className="  text-white ">ค่าตรวจวัดสูงสุดรายวัน ประจำ{FullDateFormator(new Date())}</p>
          </div>
        </div>

        <div className="relative lg:hidden md:flex flex flex-col  p-10">
          <p className=" text-black text-3xl">รายงานผลการตรวจสอบ</p>
          <p className="  text-[#475467] ">ประจำ{FullDateFormator(new Date())}</p>
        </div>

        <div className="lg:overflow-visible py-10 overflow-x-scroll">
          <div className="lg:flex md:inline-flex inline-flex  mx-2 gap-5 lg:justify-center lg:relative  bottom-[-100px]">

            <div className="  bg-white shadow-lg rounded-2xl w-[300px]">
              <div className="flex m-4 justify-between ">
                <div className="flex gap-2">
                  <Image src="/images/sulu3.svg" alt="" width={300} height={300} className="w-10 " >
                  </Image>
                  <p className="mt-2 text-blue-500 font-bold">คุณภาพอากาศ</p>
                </div>
                <Link href="/air">
                  <Image src="/images/sulu4.svg" alt="" width={300} height={300} className="w-10 " >
                  </Image>
                </Link>
              </div>
              <div className="w-[80%] h-[2px] bg-slate-200 ml-7"></div>
              <div className="flex justify-between m-4">
                <div className="flex gap-2">
                  <p className="text-2xl font-extrabold">{allData?.air.LastUpdate?.AQI?.aqi}</p>
                  <p className="mt-2 text-[#475467]">AQI</p>
                </div>
                <Badge status={allData?.air.LastUpdate?.AQI?.color_id}></Badge>
              </div>
              <div className="m-4">
                <p className="font-bold">{allData?.air.nameTH}</p>
                <div className="flex font-light text-[#475467]">
                  <p className="flex gap-2 relative items-center ">
                    {isOnline((new Date(`${allData?.air.LastUpdate?.date}T${allData?.air.LastUpdate?.time}`)))}
                    อัพเดทล่าสุด:</p>
                  <p>{ShortDateFormator(new Date(`${allData?.air.LastUpdate?.date}T${allData?.air.LastUpdate?.time}`))}</p>
                </div>
              </div>
            </div>
            <div className=" bg-white shadow-lg rounded-2xl w-[300px]">
              <div className="flex m-4 justify-between ">
                <div className="flex gap-2">
                  <Image src="/images/speakericon.svg" alt="" width={300} height={300} className="w-10 " >
                  </Image>
                  <p className="mt-2 text-blue-500 font-bold">ระดับเสียง</p>
                </div>
                <Link href="/sound">
                  <Image src="/images/sulu4.svg" alt="" width={300} height={300} className="w-10 " >
                  </Image>
                </Link>
              </div>
              <div className="w-[80%] h-[2px] bg-slate-200 ml-7"></div>
              <div className="flex justify-between m-4">
                <div className="flex gap-2">
                  <p className="text-2xl font-extrabold">{allData?.sound?.LastUpdate?.Leq}</p>
                  <p className="mt-2 text-[#475467]">dBA / เสียงรบกวน</p>
                </div>
                <Badge status={allData?.sound?.LastUpdate?.effect} name="sound"></Badge>
              </div>
              <div className="m-4">
                <p className="font-bold">{allData?.sound?.nameTH}</p>
                <div className="flex font-light text-[#475467]">
                  <p className="flex gap-2 relative items-center ">
                    {isOnline((new Date(`${allData?.sound.LastUpdate?.date}T${allData?.sound.LastUpdate?.time}`)))}
                    อัพเดทล่าสุด:</p>
                  <p>{ShortDateFormator(new Date(`${allData?.sound.LastUpdate?.date}T${allData?.sound.LastUpdate?.time}`))}</p>
                </div>
              </div>
            </div>
            <div className=" bg-white shadow-lg rounded-2xl w-[300px]">
              <div className="flex m-4 justify-between ">
                <div className="flex gap-2">
                  <Image src="/images/watericon.svg" alt="" width={300} height={300} className="w-10 " >
                  </Image>
                  <p className="mt-2 text-blue-500 font-bold">คุณภาพน้ำ</p>
                </div>
                <Link href="/water">
                  <Image src="/images/sulu4.svg" alt="" width={300} height={300} className="w-10 " >
                  </Image>
                </Link>
              </div>
              <div className="w-[80%] h-[2px] bg-slate-200 ml-7"></div>
              <div className="flex justify-between m-4">
                <div className="flex gap-2">
                  <p className="text-2xl font-extrabold">{allData?.water?.LastUpdate?.COD}</p>
                  <p className="mt-2 text-[#475467]">ppm / COD</p>
                </div>

                <Badge status={allData?.water?.LastUpdate?.effect} name="water"></Badge>

              </div>
              <div className="m-4">
                <p className="font-bold">{allData?.water?.nameTH}</p>
                <div className="flex font-light text-[#475467]">
                  <p className="flex gap-2 relative items-center ">
                    {isOnline((new Date(`${allData?.water.LastUpdate?.date}T${allData?.water.LastUpdate?.time}`)))}
                    อัพเดทล่าสุด:</p>
                  <p>{ShortDateFormator(new Date(`${allData?.water.LastUpdate?.date}T${allData?.water.LastUpdate?.time}`))}</p>
                </div>
              </div>
            </div>
            <div className=" bg-white shadow-lg rounded-2xl w-[300px]">
              <div className="flex m-4 justify-between ">
                <div className="flex gap-2">
                  <Image src="/images/waveicon.svg" alt="" width={300} height={300} className="w-10 " >
                  </Image>
                  <p className="mt-2 text-blue-500 font-bold">CEMs</p>
                </div>
                <Link href="/environment">
                  <Image src="/images/sulu4.svg" alt="" width={300} height={300} className="w-10 " >
                  </Image>
                </Link>
              </div>
              <div className="w-[80%] h-[2px] bg-slate-200 ml-7"></div>
              <div className="flex justify-between m-4">
                <div className="flex gap-2">
                  <p className="text-2xl font-extrabold">{allData?.cems?.LastUpdate?.Flow == "N/A" ? "-" : allData?.cems?.LastUpdate?.Flow || "-"}</p>
                  <p className="mt-2 text-[#475467]">m<sup>3</sup>/s / Flow</p>
                </div>
                {/* <Badge status={allData?.cems?.LastUpdate?.effect} name="cems"></Badge> */}
                {allData?.cems?.LastUpdate?.Flow != "N/A" && <Badge status={allData?.cems?.LastUpdate?.effect} name="other"></Badge>}
                {allData?.cems?.LastUpdate?.Flow == "N/A" && <Badge status={'0'} name="other"></Badge>}
              </div>
              <div className="m-4">
                <p className="font-bold">{allData?.cems?.nameTH}</p>
                <div className="flex font-light text-[#475467]">
                  <p className="flex gap-2 relative items-center ">
                    {isOnline((new Date(`${allData?.cems.LastUpdate?.date}T${allData?.cems.LastUpdate?.time}`)))}
                    อัพเดทล่าสุด:</p>
                  <p>{ShortDateFormator(new Date(`${allData?.cems?.LastUpdate?.date}T${allData?.cems?.LastUpdate?.time}`))}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden md:flex flex  justify-center text-[--primary] mt-10">
          <Link href="/air" className="flex gap-2  ">ดูทั้งหมด <ChevronRight></ChevronRight></Link>
        </div>
      </div>
      <div className="bg-white h-[200px] w-full lg:block md:block hidden"></div>




      <Favourite></Favourite>

      <div className="bg-white">
        <section className="max-w-[90vw] py-10 mx-auto">
          <div className="text-[18px] text-[--primary] font-bold">สถานีของ IRPC</div>
          <div className="text-[36px] font-bold">ข้อมูลแสดงสถานีติดตั้งเครื่องตรวจวัด</div>
          <div className="lg:hidden md:block block w-full py-5 ">
            <Select
              style={{ height: "45px", color: "black" }}
              className="w-full "
              placeholder="Search to Select"
              optionFilterProp="label"
              value={segmentValue}
              options={getArrayFromLocalStorage('user_data')?.role !== "admin" ? SegmentUserList : SegmentList}
              onChange={setSegmentValue}
            />
          </div>
          <div className="lg:block md:hidden hidden w-full py-5 ">
            <Segmented options={getArrayFromLocalStorage('user_data')?.role !== "admin" ? SegmentUserList : SegmentList} size='large' style={{ padding: "8px", color: "black" }} className='w-full py-2 px-2' value={segmentValue} onChange={e => {
              setSegmentValue(e);
            }} block />
          </div>

          {showMap && <Badges name={['air', 'sound'].includes(segmentValue) ? segmentValue as any : 'other'}></Badges>}
          {showMap && <div className="flex lg:flex-row flex-col py-10  gap-5 ">
            <div className="lg:basis-2/5 basis-full flex justify-center">
              {segmentValue === "air" && <Link href={`/air/detail/${selectedPlace?.stationID!}`}>
                <Card data={selectedPlace} showFav={false}></Card>
              </Link>}
              {segmentValue === "sound" && <Link href={`/sound/detail/${selectedPlace?.stationID!}`}>
                <SoundCard data={selectedPlace} showFav={false}></SoundCard>
              </Link>}
              {segmentValue === "water" && <Link href={`/water/detail/${selectedPlace?.stationID!}`}>
                <WaterCard data={selectedPlace} showFav={false}></WaterCard>
              </Link>}
              {segmentValue === "environment" && <Link href={`/environment/detail/${selectedPlace?.stationID!}`}>
                <EnvironmentCard data={selectedPlace} showFav={false}></EnvironmentCard>
              </Link>}
              {segmentValue === "flare" && <Link href={`/flare/detail/${selectedPlace?.stationID!}`}>
                <Flarecard item={selectedPlace}></Flarecard>
              </Link>}

            </div>
            {showMap && <div className={`w-full lg:h-auto md:h-[50vh] h-[50vh]`}>

              {MeasuringData && <MapPick name={segmentValue} data={MeasuringData} setState={setSelectedPlace} unit={MeasuringUnitMap[segmentValue]} />}
            </div>}
          </div>}
          {!showMap && segmentValue == "EQMs" && <div className="grid grid-flow-col gap-2 h-fit py-2 w-full snap-x overflow-x-auto">
            {/* <StationCard data={selectedPlace} showFav={false} className="w-[400px]"> </StationCard> */}
            {MeasuringData.map((item: any, index: number) => {
              return <Link href={`/Eqms/detail/${item?.EqmsID}`} key={index} className="snap-center">
                <StationCard data={item} showFav={false} className="w-[400px]"> </StationCard>
              </Link>
            })}
          </div>}

          {!showMap && segmentValue == "Dashboard" &&

            <div className="">
              <div className="bg-white grid lg:grid-cols-2 md:grid-cols-2  gap-5 px-10 py-10 rounded-xl">
                <Link href="/Dashboard/air" className=" rounded-xl p-5 border-2">
                  <div className="flex gap-2 items-center pb-5">
                    <Image src="/images/sulu3.svg" alt="" width={300} height={300} className="w-10 " >
                    </Image><div className="text-xl font-bold text-[--primary]">คุณภาพอากาศ</div>
                  </div>
                  <div className="grid">
                    <div className="text-sm text-gray-800">สถานีตรวจวัดทั้งหมด</div>
                    <div className="text-[36px] font-bold">316</div>
                  </div>
                </Link>


                <Link href="/Dashboard/sound" className=" rounded-xl p-5 border-2">
                  <div className="flex gap-2 items-center pb-5">
                    <Image src="/images/speakericon.svg" alt="" width={300} height={300} className="w-10 " >
                    </Image><div className="text-xl font-bold text-[--primary]">ระดับเสียง</div>
                  </div>
                  <div className="grid">
                    <div className="text-sm text-gray-800">สถานีตรวจวัดทั้งหมด</div>
                    <div className="text-[36px] font-bold">316</div>
                  </div>
                </Link>


                <Link href="/Dashboard/water" className=" rounded-xl p-5 border-2">
                  <div className="flex gap-2 items-center pb-5">
                    <Image src="/images/watericon.svg" alt="" width={300} height={300} className="w-10 " >
                    </Image><div className="text-xl font-bold text-[--primary]">คุณภาพน้ำ</div>
                  </div>
                  <div className="grid">
                    <div className="text-sm text-gray-800">สถานีตรวจวัดทั้งหมด</div>
                    <div className="text-[36px] font-bold">316</div>
                  </div>
                </Link>


                <Link href="/Dashboard/cems" className=" rounded-xl p-5 border-2">
                  <div className="flex gap-2 items-center pb-5">
                    <Image src="/images/waveicon.svg" alt="" width={300} height={300} className="w-10 " >
                    </Image><div className="text-xl font-bold text-[--primary]">Cems</div>
                  </div>
                  <div className="grid">
                    <div className="text-sm text-gray-800">สถานีตรวจวัดทั้งหมด</div>
                    <div className="text-[36px] font-bold">316</div>
                  </div>
                </Link>

              </div>
            </div>
          }
        </section>
      </div>

      <div className="bg-white">
        <section className="max-w-[90vw] py-10 mx-auto">
          <div className="flex justify-between py-10">
            <div className="text-2xl font-bold">ข่าวสาร ประชาสัมพันธ์</div>
            <Link href="/news"><Button className="text-[--primary]" style={{ color: "var(--primary)" }}>ดูทั้งหมด</Button></Link>
          </div>


          <div className="flex flex-wrap gap-10  justify-center">

            {DashBoard?.news?.[0] &&
              <Link href={`/news/${DashBoard?.news?.[0]?.newsID}`}>
                <div className="rounded-xl border border-[#EAECF0] bg-white shadow-md lg:max-w-[500px] md:w-[500px] w-[80vw] h- overflow-hidden">
                  <div className="h-[250px] overflow-hidden">
                    <Image src={DashBoard?.news?.[0]?.newsPicPath} alt="" width={625} height={308} className="h-[250px] w-full"></Image>
                  </div>
                  <div className="flex flex-col p-4 gap-4 pt-8">
                    <div className="flex flex-col">
                      <div className="text-[--primary] text-[14px] font-bold">{DashBoard?.news?.[0]?.newsDateModified && FullDateFormator(new Date(DashBoard?.news?.[0]?.newsDateModified.split(" ").join("T")))}</div>
                      <div className="flex justify-between">
                        <div className="text-black text-[24px] font-extrabold">{DashBoard?.news?.[0]?.newsHeader}</div>
                        <ArrowUpRight className="size-7" />
                      </div>
                    </div>
                    <div className="text-[#475467]  text-ellipsis line-clamp-2 ">{DashBoard?.news?.[0]?.newsDescription}</div>
                  </div>
                </div>
              </Link>
            }


            <div className="lg:grid md:hidden hidden gap-5 lg:max-w-[800px]">
              {DashBoard?.news?.slice(1, 3).map((item: any, index: number) =>
                <Link href={`/news/${item?.newsID}`}>
                  <div className="rounded-xl border w-[50vw] border-[#EAECF0] flex bg-white shadow-md h-[200px] overflow-hidden">
                    <div className="w-[150px] h-[200px] bg-black overflow-hidden">
                      <Image src={item?.newsPicPath} alt="" width={625} height={308} className="w-full h-full object-cover"></Image>
                    </div>
                    <div className="flex flex-col p-4 gap-4 pt-8">
                      <div className="flex flex-col">
                        <div className="text-[--primary] text-[14px] font-bold">{item?.newsDateModified && FullDateFormator(new Date(item?.newsDateModified.split(" ").join("T")))}</div>
                        <div className="flex justify-between">
                          <div className="text-black text-[24px] font-extrabold">{item?.newsHeader}</div>
                        </div>
                      </div>
                      <div className="text-[#475467]  text-ellipsis line-clamp-2 ">{item?.newsDescription}</div>
                    </div>
                  </div>
                </Link>)
              }

            </div>
          </div>
        </section>
      </div>

      <section className="bg-gray-50 p-6 max-w-[90vw] flex-wrap mx-auto rounded-lg flex items-center justify-between">
        {/* Left Section */}
        <div className="flex flex-col sm:basis-1/2">
          <h2 className="text-xl font-extrabold text-black mb-2">รายงานประจำวัน</h2>
          <div className="text-gray-600">ข้อมูลเชิงลึกและผลการดำเนินงานในแต่ละวัน</div>
          <div className="text-[--primary] mt-2">
            <Link href="/report/all" className="flex gap-2  "><Button>ดูทั้งหมด</Button></Link>
          </div>
        </div>

        <div className="flex items-center flex-wrap lg:gap-10 md:gap-5 gap-2 lg:py-0 py-5 sm:basis-1/2">
          <div className="flex items-center mb-4">
            <ImageAnt preview={{
              visible,
              src: DashBoard?.report?.[0]?.reportFile || "/images/irpc-logo.png",
              onVisibleChange: (value) => {
                setVisible(value);
              },
            }} src={DashBoard?.report?.[0]?.reportFile || "/images/irpc-logo.png"} width={202} alt="report preview" className="w-auto h-16 object-contain" />
          </div>
          {/* Right Section */}
          <div className="flex flex-col">
            <p className=" text-[20px] font-bold">{DashBoard?.report?.[0]?.dateThai}</p>
            <p className=" text-[16px] text-gray-500 ">ข้อมูลเชิงลึกและผลการดำเนินงานในแต่ละวัน</p>
            <a onClick={previewImage} className="text-[--primary] font-bold hover:underline flex gap-2 cursor-pointer">
              ดูรายงาน <ArrowRight></ArrowRight>
            </a>
          </div>
        </div>
      </section>


      <Footer></Footer>
    </>
  );
}


