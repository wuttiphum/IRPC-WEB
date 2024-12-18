export async function getLocation(): Promise<{ status: string; msg: string; LatLng: number[] | null }> {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const crd = pos.coords;
                resolve({
                    status: "OK",
                    msg: "Success to get location",
                    LatLng: [crd.latitude, crd.longitude]
                });
            },
            (err) => {
                resolve({
                    status: "ERROR",
                    msg: `ERROR(${err.code}): ${err.message}`,
                    LatLng: null
                });
            },
            options
        );
    });
}


export async function getPlaceName(lat:number, lng:number) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;
    
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": navigator.userAgent } // Required
      });
      const data = await response.json();
      
      const placeName = data.display_name;
      return placeName || "Place name not found";
    } catch (error) {
      console.error("Error fetching geocode:", error);
      return "Error fetching data";
    }
  }
  
//   getPlaceName(40.73061, -73.935242).then(placeName => console.log(placeName));
  