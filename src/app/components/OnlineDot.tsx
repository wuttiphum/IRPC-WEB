export function isOnline(LastUpdate: Date) {
    const now = (new Date());
    const online = (
      now.getFullYear() === LastUpdate.getFullYear() &&
      now.getMonth() === LastUpdate.getMonth() &&
      now.getDate() === LastUpdate.getDate() &&
      now.getHours() === LastUpdate.getHours()
    );
  
  
    if (online) {
      return <>
        <div className="size-3 rounded-full bg-[#70e000] opacity-70 animate-ping"></div>
        <div className="size-2 absolute left-[2px] rounded-full bg-[--success] opacity-70 "></div>
      </>
    }
    else {
      return <>
        {/* <div className="size-3 rounded-full bg-[#bfbfbf] opacity-70 "></div> */}
        <div className="size-2 rounded-full bg-[#bfbfbf] opacity-70 "></div>
      </>
    }
  
  
  
  }