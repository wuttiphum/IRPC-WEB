import Loading from "../components/loading";
import SegmentMenu from "../components/SegmentMenu";

export default function loading() {
    return <>
        <section id="header" className="px-10 py-4 bg-white">

            <SegmentMenu />
            <Loading />
        </section>
    </>
}