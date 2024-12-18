'use client'
import { Drawer, Dropdown, MenuProps, message, Space } from "antd";
import Button from "antd/es/button/button";
import { ChevronDown, Menu, PhoneCall, Send, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getArrayFromLocalStorage } from "../ultilities/localStorageManager";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'




const suggestBTN: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a className="flex gap-2 " rel="noopener noreferrer" href="/report">
        <Send className="size-5" style={{ color: "#667085" }} />  ไปหน้าแนะนำติชม
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a className="flex gap-2 " rel="noopener noreferrer" href="tel:+6627657380">
        <PhoneCall className="size-5" style={{ color: "#667085" }} /> โทรด่วน +66(0) 2765-7380
      </a>
    ),
  },

];
const loginBTN: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a className="flex gap-2 " rel="noopener noreferrer" href="/login?type=user">
        {/* <Send className="size-5" style={{ color: "#667085" }} /> */}
        สำหรับผู้ใช้งานทั่วไป
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a className="flex gap-2 " rel="noopener noreferrer" href="/login?type=admin">
        {/* <PhoneCall className="size-5" style={{ color: "#667085" }} /> */}
        สำหรับเจ้าหน้าที่
      </a>
    ),
  },

];
const loginedDropdown: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div className="flex gap-2 " color="danger" rel="noopener noreferrer" >

        Role : {
          getArrayFromLocalStorage("user_data")?.role}
      </div>
    ),
  },
  {
    key: '3',
    label: (
      <a className="flex gap-2 text-[--error] " color="danger" rel="noopener noreferrer" onClick={() => {

        localStorage.removeItem("token")
        localStorage.removeItem("user_data")
        // localStorage.removeItem("favData")
        window.location.reload()
      }
      }>

        <div className="text-center">ออกจากระบบ</div>
      </a>
    ),
  },



];











export default function Navbar() {

  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<any>();
  const router = useRouter()
  const [pathName, setPathName] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const pathname = usePathname()

  useEffect(() => {
    isLogined();

  }, [pathname])

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'กรุณาเข้าสู่ระบบก่อนใช้งาน',
    });
  };


  async function isLogined() {
    const tempUser = getArrayFromLocalStorage("user_data")

    setUserData(tempUser)
    const privatePaths = ['flare', 'report', 'eqms', 'dashboard'];
    const pathname = window.location.href.split('/')?.[3] || ''

    setPathName(pathname);

    if (privatePaths.includes(pathname)) {
      if (!tempUser) {
        // alert("Please login before")
        await warning();
        // await delay(1000);
        router.push("/login")
      }
    }
  }

  const keywords = ['air', 'sound', 'eqms', 'flare', 'environment', 'water', 'dashboard'];
  const onClose = () => {
    setOpen(false);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_self" rel="noopener noreferrer" href="/air">
          <span className={`${pathName == 'favourite' && 'text-[--primary] '} `}>คุณภาพอากาศ</span>
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_self" rel="noopener noreferrer" href="/sound">
          <span className={`${pathName == 'sound' && 'text-[--primary] '} `}>ระดับเสียง</span>
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_self" rel="noopener noreferrer" href="/water">
          <span className={`${pathName == 'water' && 'text-[--primary] '} `}>คุณภาพน้ำ</span>
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a target="_self" rel="noopener noreferrer" href="/environment">
          <span className={`${pathName == 'environment' && 'text-[--primary] '} `}>CEMs</span>
        </a>
      ),
    },
    ...isAdmin()


  ];

  function isAdmin() {
    const adminLinks =
      [{
        key: '5',
        label: (
          <a target="_self" rel="noopener noreferrer" href="/flare">
            <span className={`${pathName == 'flare' && 'text-[--primary] '} `}>แฟลร์</span>
          </a>
        ),
      },
      {
        key: '6',
        label: (
          <a target="_self" rel="noopener noreferrer" href="/eqms">
            <span className={`${pathName == 'eqms' && 'text-[--primary] '} `}>EQMs</span>
          </a>
        ),
      },
      {
        key: '7',
        label: (
          <a target="_self" rel="noopener noreferrer" href="/dashboard">
            <span className={`${pathName == 'dashboard' && 'text-[--primary] '} `}>Dashboard</span>
          </a>
        ),
      }]
    if (getArrayFromLocalStorage("user_data")?.role == "admin") { return adminLinks } else { return [] }
  }


  return (
    <div className="w-full bg-white text-center flex justify-between py-4 lg:px-[5vw] md:px-10 px-8 items-center">
      {contextHolder}
      <div className="flex gap-10 items-center text-lg ">
        <div className="flex gap-2 items-center">

          <Link href="/">
            <Image height={18} width={100} src="/images/irpc-logo.svg" alt="irpc logo" />
          </Link>
        </div>


        <ul className="lg:px-6 lg:flex md:hidden hidden gap-10 items-center font-medium text-[#475467]">
          <Link href="/">
            <li className={`${pathName == '' && 'text-[--primary] '}`}>หน้าแรก</li>
          </Link>


          <Dropdown menu={{ items }} className="flex items-center gap-2 cursor-pointer">
            <a className={`${keywords.some((keyword: string) => pathName.includes(keyword)) && 'text-[--primary] '}`} onClick={(e) => e.preventDefault()}>

              การตรวจวัด
              <ChevronDown />

            </a>
          </Dropdown>

          <Link href="/favourite">
            <li className={`${pathName == 'favourite' && 'text-[--primary] '}`}>รายการโปรด</li>
          </Link>
          <Link href="/news">
            <li className={`${pathName == 'news' && 'text-[--primary] '}`}>ข่าวสาร</li>
          </Link>
        </ul>
      </div>



      <div className="lg:flex md:hidden hidden items-center gap-3">
        <Dropdown menu={{ items: suggestBTN }}>
          <Button type="default" className="">

            <div className="">แนะนำติชม</div>
            <ChevronDown className="size-5"></ChevronDown>
          </Button>
        </Dropdown>

        {!userData ?
          <Dropdown menu={{ items: loginBTN }}>
            <Button type="primary" className="text-white w-full">

              <div className="">เข้าสู่ระบบ</div>
              <ChevronDown className="size-5"></ChevronDown>
            </Button>
          </Dropdown>
          :
          <Dropdown menu={{ items: loginedDropdown }}>
            <Button className="">{userData?.fullname}
              <ChevronDown className="size-5"></ChevronDown>
            </Button>
          </Dropdown>


        }
      </div>


      <div className="lg:hidden md:block block">
        <Button type="text" onClick={e => setOpen(true)} className="">
          <Menu />
        </Button>
      </div>

      <Drawer
        title={`เมนู`}
        placement="right"
        size={"default"}
        closable={false}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button type="text" onClick={onClose}> <X /> </Button>

          </Space>
        }
      >
        <div className="grid gap-2" >

          <Link href="/">
            <Button type="text" className=" w-full flex items-center justify-start"><span className={`${pathName == '' && 'text-[--primary] '}`}>หน้าแรก</span></Button>
          </Link>


          <Link href="/air">
            <Button type="text" className="flex items-center justify-start gap-2 w-full text-start cursor-pointer">
              <span className={`${pathName == 'air' && 'text-[--primary] '}`}>คุณภาพอากาศ</span>
            </Button>
          </Link>

          <Link href="/sound">
            <Button type="text" className="flex items-center justify-start gap-2 w-full text-start cursor-pointer">
              <span className={`${pathName == 'sound' && 'text-[--primary] '}`}>ระดับเสียง</span>
            </Button>
          </Link>

          <Link href="/water">
            <Button type="text" className="flex items-center justify-start gap-2 w-full text-start cursor-pointer">
              <span className={`${pathName == 'water' && 'text-[--primary] '}`}>คุณภาพน้ำ</span>
            </Button>
          </Link>

          <Link href="/environment">
            <Button type="text" className="flex items-center justify-start gap-2 w-full text-start cursor-pointer">
              <span className={`${pathName == 'environment' && 'text-[--primary] '}`}>CEMs</span>
            </Button>
          </Link>

          {userData?.role == "admin" && <Link href="/flare">
            <Button type="text" className="flex items-center justify-start gap-2 w-full text-start cursor-pointer">
              <span className={`${pathName == 'flare' && 'text-[--primary] '}`}>แฟลร์</span>
            </Button>
          </Link>}
          {userData?.role == "admin" && <Link href="/eqms">
            <Button type="text" className="flex items-center justify-start gap-2 w-full text-start cursor-pointer">
              <span className={`${pathName == 'eqms' && 'text-[--primary] '}`}>EQMs</span>
            </Button>
          </Link>}
          {userData?.role == "admin" && <Link href="/dashboard">
            <Button type="text" className="flex items-center justify-start gap-2 w-full text-start cursor-pointer">
              <span className={`${pathName == 'dashboard' && 'text-[--primary] '}`}>Dashboard</span>
            </Button>
          </Link>}

          <Link href="/favourite">
            <Button type="text" className="w-full flex items-center justify-start"><span className={`${pathName == 'favourite' && 'text-[--primary] '}`}>รายการโปรด</span></Button>
          </Link>
          <Link href="/news">
            <Button type="text" className="w-full flex items-center justify-start"><span className={`${pathName == 'news' && 'text-[--primary] '}`}>ข่าวสาร</span></Button>
          </Link>

          <Dropdown menu={{ items: suggestBTN }}>
            <Button type="default" className="">

              <div className="">แนะนำติชม</div>
              <ChevronDown className="size-5"></ChevronDown>
            </Button>
          </Dropdown>




          {!userData ?
            <Dropdown menu={{ items: loginBTN }}>
              <Button type="primary" className="text-white w-full">

                <div className="">เข้าสู่ระบบ</div>
                <ChevronDown className="size-5"></ChevronDown>
              </Button>
            </Dropdown>
            :

            <Button className="flex gap-2 justify-center bg-[--error] px-2 cursor-pointer opacity-80 text-[15px] " color="danger" onClick={() => {

              localStorage.removeItem("token")
              localStorage.removeItem("user_data")

              window.location.reload()
            }
            }>

              <div className="text-center text-[--error]">ออกจากระบบ</div>
            </Button>
          }
        </div>
      </Drawer>
    </div>
  );
}
