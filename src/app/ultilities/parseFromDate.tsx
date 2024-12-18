export default function rearrangeData(data: any[]) {
  if (!data) return [];
  
  const result: any = {};
  
  for (const property in data) {
    for (const item of data[property]) {
      const { DATETIMEDATA, value }: { DATETIMEDATA: string, value: string } = item;
      
      if (!result[DATETIMEDATA]) {
        result[DATETIMEDATA] = { DATETIMEDATA };  
      }
      
      result[DATETIMEDATA][property] = value;
    }
  }
  
  // console.log(Object.values(result));
  return Object.values(result);
}
