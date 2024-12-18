import { Image } from "antd";
import { Atom, CloudOff } from "lucide-react";
import { Metadata } from "next";

interface PageProps {
    params: {
        id: string;
    };
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    try {
        const res = await fetch(`https://irpc-air.com/forWeb/getDashbord.php`);
        if (!res.ok) throw new Error('Failed to fetch data'); // Handle non-2xx status codes
        const data = await res.json();
        const news = data?.news?.filter((item:any) => item?.newsID == params.id)
        // console.log(news)

        return {
            title: `IRPC news - ${news?.[0]?.newsHeader}` || "IRPC news - Data Not Available", // Fallback if title is undefined
        };
    } catch (error) {
        
        return {
            title: "Data Not Available", // Fallback title for error case
        };
    }
}

export default async function Page({ params }: PageProps) {
    try {
        const res = await fetch(`https://irpc-air.com/forWeb/getDashbord.php`);
        const data = await res.json();
        const news = data?.news?.filter((item:any) => item?.newsID == params.id)?.[0]

        if(!news)  return <>
        <section className="flex flex-col gap-4 h-screen justify-center items-center">
        <CloudOff className="size-24 text-[--primary] opacity-60" />
        Data Not Available.</section>
        </>
        return (
            <>
                
                <section className="w-[80vw] mx-auto">
                    <div className="lg:h-[50vh] md:h-[50vh] overflow-hidden rounded-2xl my-10"><Image src={news?.newsPicPath} alt="" rootClassName="w-full" wrapperClassName="w-full" className="w-full" /></div>
                    <div className="mt-10">
                        <h1 className="text-[24px] font-bold">{news?.newsHeader}</h1>
                        <div className="py-5 indent-5">
                            <p dangerouslySetInnerHTML={{ __html: news?.newsDescription || "" }}></p>
                        </div>
                        <div className="text-sm">Last updated :{news?.newsDateModified}</div>
                    </div>
                </section>
            </>
        );
    } catch (error) {
       
        return <>
        <section className="flex h-screen justify-center items-center">Data has no avaiable.</section>
        </>
    }



}
