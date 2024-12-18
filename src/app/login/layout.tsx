import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
       <>
                {children}
       </>

    );
}
