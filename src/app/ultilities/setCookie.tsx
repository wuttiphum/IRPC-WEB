'use client'
export  function setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // days converted to milliseconds
    const expires = `expires=${date.toUTCString()}`;
    // document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export  function getCookie(name: string) {
    const nameEQ = `${name}=`;
    // const ca = document.cookie.split(';');
    const ca: string | any[] = []
    
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    
    return null; // Return null if the cookie does not exist
}
