"use client"
import Image from "next/image";
import Link from "next/link";
import { Input, Select, message } from 'antd';
import { postData } from "../ultilities/api";
import { useState } from "react";

const { Option } = Select;
const opt = <>
    <Option value="+66">+66</Option>

</>

export default function Login() {

    const fetchData = async () => {
        // console.log({
        //     "fullname": fullname,
        //     "tel": codeCountry + tel,
        //     "email": email,
        //     "password": password
        // })
        if (validateEmail(email)) {
            const result = await postData('/forWeb/singin.php', {
                "fullname": fullname,
                "tel":   tel.startsWith("0") ? tel : codeCountry + tel,
                "email": email,
                "password": password,
                "type":'password'
            })
            if (result?.status == "ok") {
                success()
                window?.location?.replace('/login')
                return
            }
            else {
               
                error(result?.response?.data?.message || result?.data?.message ||result?.message|| 'มีปัญหาทางเทคนิค โปรดติดต่อผู้ดูแลระบบ')
                return
            }
        }
        error("รูปแบบอีเมลไม่ถูกต้อง กรุณาตรวจสอบว่ามี “@” และโดเมน เช่น .com หรือ .co.th")
    }

    const [messageApi, contextHolder] = message.useMessage();
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const error = (e: string) => {
        messageApi.open({
            type: 'error',
            content: e,
        });
    };

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'สมัครเข้าใช้งานสำเร็จ',
        });
    };

    const [fullname, setFullname] = useState("")
    const [codeCountry, setCodecountry] = useState("+66")
    const [tel, setTel] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    return (
        <>
            {contextHolder}
            <div className="lg:block md:block hidden">
                <Image src="/images/Contentbackground.svg" alt={""} width={758} height={758} className="absolute lg:left-[26%] w-full max-w-[758px] h-auto "></Image>
                <div className="flex flex-col items-center justify-center relative z-[1] pt-20 pb-10 ">
                    <div className="text-center mb-6">
                        <h2 className="text-[30px] font-bold mb-2">ลงทะเบียน</h2>
                        <p className="text-gray-600 text-[16px]">กรุณาใส่ข้อมูลเพื่อลงทะเบียนเข้าใช้งาน</p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <form action={fetchData}>
                            <div className="mb-4">
                                <label htmlFor="fullName" className="block text-gray-700 mb-2">ชื่อและนามสกุล</label>
                                <Input required onChange={e => setFullname(e.target.value)} className="p-3 w-full" placeholder="กรอกชื่อและนามสกุล" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                                <div className="flex">
                                    <Input required onChange={e => setTel(e.target.value)} placeholder="(0)841234567" type="tel" pattern="^0?[0-9]{9}$" addonBefore={<Select onChange={e => { setCodecountry(e) }} defaultValue="+66">
                                        {opt}
                                    </Select>}
                                        classNames={{ input: "w-full p-3 " }} maxLength={10} />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 mb-2">อีเมล</label>
                                <Input required type="email" onChange={e => setEmail(e.target.value)} className="p-3 w-full " placeholder="กรอกอีเมลของคุณ" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 mb-2">รหัสผ่าน</label>
                                <Input.Password required onChange={e => setPassword(e.target.value)} className="p-3 w-full " placeholder="รหัสผ่าน" minLength={8} />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">ลงทะเบียน</button>
                        </form>
                    </div>
                    <div className="text-center mt-6">
                        <p className="text-gray-600">มีบัญชีผู้ใช้แล้ว? <Link href="/login" className="text-blue-500 font-bold">เข้าสู่ระบบ</Link></p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center relative z-[1] mt-10 pt-10  pb-10  lg:hidden md:hidden ">
                <div className="text-center mb-6">
                    <h2 className="text-[30px] font-bold mb-2">ลงทะเบียน</h2>
                    <p className="text-gray-600 text-[16px]">กรุณาใส่ข้อมูลเพื่อลงทะเบียนเข้าใช้งาน</p>
                </div>
                <div className=" w-full max-w-md p-2">
                    <form action={fetchData}>
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-gray-700 mb-2">ชื่อและนามสกุล</label>
                            <Input required onChange={e => setFullname(e.target.value)} className="p-3 w-full" placeholder="กรอกชื่อและนามสกุล" />
                        </div>
                        <div className="m
                        b-4">
                            <label htmlFor="phone" className="block text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                            <div className="flex">
                                <Input required onChange={e => setTel(e.target.value)} placeholder="(0)841234567" type="tel" pattern="^0?[0-9]{9}$" addonBefore={<Select onChange={e => { setCodecountry(e) }} defaultValue="+66">
                                    {opt}
                                </Select>} classNames={{ input: "w-full p-3 " }} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">อีเมล</label>
                            <Input required onChange={e => setEmail(e.target.value)} type="email" className="p-3 w-full " placeholder="กรอกอีเมลของคุณ" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 mb-2">รหัสผ่าน</label>
                            <Input.Password required onChange={e => setPassword(e.target.value)} className="p-3 w-full " placeholder="รหัสผ่าน" />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">ลงทะเบียน</button>
                    </form>
                </div>
                <div className="text-center mt-6">
                    <p className="text-gray-600">มีบัญชีผู้ใช้แล้ว? <Link href="/login" className="text-blue-500 font-bold">เข้าสู่ระบบ</Link></p>
                </div>
            </div>
        </>
    );
}
