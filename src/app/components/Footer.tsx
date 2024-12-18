import { Instagram } from "lucide-react";
import Link from "next/link";


export default function Footer() {
  return (
    <div className="w-full bg-white text-center">
      <div className="w-full bg-white">
        <footer className="bg-white border-t py-8">
          <div className="lg:flex  md:grid grid justify-between items-center px-0">
            <div className="flex flex-col items-start mb-6 md:mb-0 text-left lg:ml-20 ml-10">
              <img src="/images/irpc-logo.svg" alt="IRPC Logo" className="h-8 mb-4" />
              <p className="text-gray-600 text-[16px] max-w-[21rem]">ไออาร์พีซี เป็นผู้ประกอบการอุตสาหกรรมปิโตรเคมี &quot;ครบวงจรแห่งแรก&quot; ของภูมิภาคเอเชียตะวันออกเฉียงใต้</p>
              <div className="lg:flex md:grid grid flex-wrap justify-start lg:space-x-7 gap-4 mt-4">
                <a href="/" className="font-bold text-gray-700 hover:text-blue-500 text-sm">Overview</a>
                <a href="/air" className="font-bold text-gray-700 hover:text-blue-500 text-sm">Features</a>
                {/* <a href="#" className="font-bold text-gray-700 hover:text-blue-500 text-sm">Pricing</a>
                <a href="#" className="font-bold text-gray-700 hover:text-blue-500 text-sm">Careers</a>
                <a href="#" className="font-bold text-gray-700 hover:text-blue-500 text-sm">Help</a> */}
                <Link href="/privacy-policy/th" className="font-bold text-gray-700 hover:text-blue-500 text-sm">Privacy</Link>
              </div>
            </div>

            <div className="lg:flex md:grid grid lg:p-0 md:px-20 px-10 flex-col items-end text-left mr-20">
              <div className="flex flex-col space-y-2">
                <p className="text-blue-500 mb-2 ">Get the app</p>
                <a target="_blank" href="https://apps.apple.com/th/app/irpc-air/id1494650415">
                  <img src="/images/appstore.svg" alt="App Store" className="h-10" />
                </a>
                <a target="_blank" href="https://play.google.com/store/apps/details?id=th.irpc.irpc_pollution&pcampaignid=web_share">
                  <img src="/images/googleplay.svg" alt="Google Play" className="h-10" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t mt-6 pt-6 w-full max-w-[90vw] mx-auto px-0">
            <div className="w-full flex flex-col md:flex-row justify-between items-center text-gray-600">
              <p className="text-sm ">&copy; 2024 IRPC, Inc. All rights reserved.</p>
              <div className="flex space-x-6 lg:pt-0 md:pt-0 pt-3">
                <a target="_blank" href="https://x.com/IRPCofficial" className="hover:text-blue-500">
                  <img src="/images/x.svg" alt="X" className="h-5" />
                </a>
                <a target="_blank" href="https://www.facebook.com/IRPCofficial/" className="hover:text-blue-500">
                  <img src="/images/facebook.svg" alt="facebook" className="h-[22px]" />
                </a>
                <a target="_blank" href="https://www.instagram.com/irpcofficial/" className="hover:text-blue-500">
                <Instagram className="h-[24px] text-gray-400" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
