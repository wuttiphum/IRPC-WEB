import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from 'next/head';
import Navbar from "./components/Navbar";
import { Inter, Noto_Sans_Thai, Prompt } from 'next/font/google'
import Footer from "./components/Footer";
import { AntdRegistry } from '@ant-design/nextjs-registry';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({ subsets: ['latin'],
  variable: '--font-inter',
 })

const noto = Noto_Sans_Thai({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto',
})
const prompt = Prompt({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-prompt',
  weight: ["100","200","300","400","500","600"]
})




export const metadata: Metadata = {
  title: "IRPC - บริษัท ไออาร์พีซี จำกัด",
  description: "ไออาร์พีซี มุ่งมั่นในการพัฒนาผลิตภัณฑ์และกระบวนการผลิตเชิงนวัตกรรมที่เป็นมิตรต่อCEMs ตลอดจนการพัฒนาคุณภาพของผลิตภัณฑ์",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >

      <body
        className={` ${noto.variable} ${prompt.variable} ${inter.variable} antialiased`}
      >
        <Navbar />
        <AntdRegistry> {children}</AntdRegistry>

      </body>
    </html>
  );
}
