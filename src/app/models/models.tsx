export interface Water {
    stationID: string;
    nameTH: string;
    nameEN: string;
    areaTH: string;
    areaEN: string;
    image_url:string;
    stationType: string;
    lat: number | null;
    long: number | null;
    LastUpdate: {
        date: string;    // e.g., "2024-10-13"
        time: string;    // e.g., "14:00"
        COD: string;     // e.g., "83.56"
        pH: string;      // e.g., "N/A"
        Flow: string;    // e.g., "N/A"
    };
}


