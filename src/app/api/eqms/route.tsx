import axios from "axios";
import { NextResponse } from "next/server";

export function GET(req:any){
    return Response.json({
        msg:"TEST"
    })
}

export async function POST(req:any){
    const body = await req.json();
    // console.log("BODY : ",body.query);
    const url = `https://irpc-air.com/UpdateV2/eqms/createImage.php`
    try {
        const response = await axios.post(`${url}`, body.query, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type':  'application/json',
                'Cookie': `PHPSESSID=${process.env.SESSIONID}`
            },
        }).then(response => Buffer.from(response.data, 'binary'));

        // console.log(response);
        // return response?.data; 
        return new NextResponse(response, {
            status: 200,
            headers: {
              'Content-Type': 'image/png',
            },
          });
   

    } catch (error:any) {
        // console.log(error)
        return Response.json({
        
            status:"error",
            message:error
        })
    }
 
}