export default function page({params}:any){
    return <>
    <iframe className="w-full h-screen" src={`https://irpc-air.com/forApp/flareStream.php?stationID=${params.stationID}`}></iframe>
    </> 
}