
export default function extractKeys(data: any): string[] {
   if(data.length > 0) return Object.keys(data[0]);
   return []
    
  }

  export const namedArray = (data: any, name: string) => {
   if (!data) return []
   const result = data.map((item: any) => ({
       name,
       ...item,
   }));
   return result
}