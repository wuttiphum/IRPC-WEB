export default function DateFormator(date: Date): string {
    const monthsThai = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", 
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];
  
    const day = date.getDate();
    const month = monthsThai[date.getMonth()];
    const year = date.getFullYear() + 543 - 2500; // Convert to BE year and last 2 digits.
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    if (Number.isNaN(day)) return "N/A"
    return  day ? `${day} ${month} ${year} เวลา ${hours}:${minutes} น.` : '0 ธ.ค. 2024 เวลา 00:00 น.';
  };
  
  export  function FullDateFormator(date: Date): string {
    const daysThai = [
      "วันอาทิตย์", "วันจันทร์", "วันอังคาร", 
      "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"
    ];
    
    const monthsThai = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", 
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
  
    const dayOfWeek = daysThai[date.getDay()];
    const day = date.getDate();
    const month = monthsThai[date.getMonth()];
    const year = date.getFullYear() + 543; // Convert to Buddhist Era (BE)
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    return dayOfWeek ? `${dayOfWeek} ที่ ${day} ${month} ${year} เวลา ${hours}:${minutes} น.` : "วันที่....";
  }
  
  
  export function ShortDateFormator(date: Date): string {
    const monthsShort = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    const day = date.getDate();
    const month = monthsShort[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    return  day  ? `${day} ${month} ${hours}:${minutes}` : "0 Dec 00:00";
  }
  
  