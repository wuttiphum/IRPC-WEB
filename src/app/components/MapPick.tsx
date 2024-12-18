'use client';
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Badge from './Badge';
import DateFormator from '../ultilities/DateFormater';


export default function MapPick({ data, setState, key, unit, name }: any) {
    if(!name){
        name = 'other'
    }
    // Explicitly type the map container ref
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null); // Type for Mapbox map
    const markerRef = useRef();



    useEffect(() => {
        // Ensure Mapbox access token is set
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API || '';

        // Check for Mapbox support
        if (!mapboxgl.supported()) {
            alert('Your browser does not support Mapbox GL');
        } else {


            if (mapContainerRef.current) {
                // Initialize map only once
                mapRef.current = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: [101.3098455, 12.6605804],
                    zoom: 11
                });


                // new mapboxgl.Marker(markerRef.current)
                //     .setLngLat([100.5018, 13.7563])
                //     .setPopup(popup)
                //     .addTo(mapRef.current);

                // for (const marker of data || geojson.features) {
                var setCentered = false;
                for (const marker of data) {
                    if (marker?.lat && !setCentered) {
                        setCentered = true;
                        mapRef.current.setCenter([parseFloat(marker?.long), parseFloat(marker?.lat)])
                    }




                    const el = document.createElement('div');
                    const elChild = document.createElement('div');
                    const elChild1 = document.createElement('div');

                    el.className = 'marker ';
                    el.style.cursor = 'pointer';
                    const effectAirColor = {

                    }


                    const getPinColor = (name: string, colorId: number | undefined, effect: number | undefined): string[] => {
                        // Define color mappings for 'air', 'sound', and a fallback for all other cases
                        const pinColorMap: any = {
                            'air': [
                                ["bg-[#444444]/40", "bg-[#444444]/60"],
                                ["bg-[#155EEF]/40", 'bg-[#155EEF]/60'],
                                ["bg-[#70e000]/40", 'bg-[#70e000]/60'],
                                ["bg-[#f3de2c]/40", 'bg-[#f3de2c]/60'],
                                ["bg-[#f9a620]/40", 'bg-[#f9a620]/60'],
                                ["bg-[#f21b3f]/40", 'bg-[#f21b3f]/60'],
                            ],
                            'sound': [
                                ["bg-[#444444]/40", "bg-[#444444]/60"],
                                ["bg-[#70e000]/40", 'bg-[#70e000]/60'],
                                ["bg-[#f3de2c]/40", 'bg-[#f3de2c]/60'],
                                ["bg-[#f21b3f]/40", 'bg-[#f21b3f]/60'],
                            ],
                            'default': [
                                ["bg-[#444444]/40", "bg-[#444444]/60"],
                                ["bg-[#70e000]/40", 'bg-[#70e000]/60'],
                                ["bg-[#f21b3f]/40", 'bg-[#f21b3f]/60'],
                            ],
                        };

                        // Use 'air' or 'sound' specific colors; otherwise, use 'default'
                        const selectedMap = (pinColorMap[name || 'default']) || pinColorMap['default'];

                        // Return color classes based on colorId or effect
                        return selectedMap[colorId ?? effect ?? 0] || ["bg-[#444444]/40", "bg-[#444444]/60"];
                    };

                    const colorClasses = getPinColor(name || 'air', marker.LastUpdate?.AQI?.color_id, marker.LastUpdate?.effect);


                    elChild1.className = `w-12 h-12 rounded-full flex justify-center items-center animate-pulse  ${colorClasses[0]} absolute top-[-4px] right-[-4px] duration-50`
                    elChild.className = `w-10 h-10 rounded-full flex justify-center items-center text-white font-bold text-[15px]  ${colorClasses[0]} relative z-10`;
                    elChild.innerHTML = (marker.LastUpdate?.AQI?.aqi || marker.LastUpdate?.COD || marker.LastUpdate?.Flow || marker.LastUpdate5min?.Leq || "-") ;


                    el.appendChild(elChild1)
                    el.appendChild(elChild)


                    el.addEventListener('click', () => {
                        // console.log(marker.LastUpdate?.COD);
                        //call back function

                        marker && setState && setState(marker)
                    });

                    // Define the color maps
                    const colorMap = [
                        '',
                        '<div style="background:#d8e4fd;border:1px solid #155EEF;border-radius:20px;padding:2px 10px;color:#155EEF;">ดีมาก</div>',
                        '<div style="background:#dbfde9;border:1px solid #067647;border-radius:20px;padding:2px 10px;color:#067647;">ดี</div>',
                        '<div style="background:#fbe5a2;border:1px solid #B54708;border-radius:20px;padding:2px 10px;color:#B54708;">ปานกลาง</div>',
                        '<div style="background:#fbc692;border:1px solid #B93815;border-radius:20px;padding:2px 10px;color:#B93815;">เริ่มมีผลกระทบ</div>',
                        '<div style="background:#fc8e8e;border:1px solid #881208;border-radius:20px;padding:2px 10px;color:#881208;">มีผลกระทบ</div>'
                    ];
                    const colorMapSound = [
                        '',
                        '<div style="background:#dbfde9;border:1px solid #067647;border-radius:20px;padding:2px 10px;color:#067647;">ปกติ</div>',
                        '<div style="background:#fbe5a2;border:1px solid #B54708;border-radius:20px;padding:2px 10px;color:#B54708;">เฝ้าระวัง</div>',
                        '<div style="background:#fc8e8e;border:1px solid #881208;border-radius:20px;padding:2px 10px;color:#881208;">มีผลกระทบ</div>'
                    ];
                    const colorOtherMap = [
                        '',
                        '<div style="background:#dbfde9;border:1px solid #067647;border-radius:20px;padding:2px 10px;color:#067647;">ปกติ</div>',
                        '<div style="background:#fc8e8e;border:1px solid #881208;border-radius:20px;padding:2px 10px;color:#881208;">มีผลกระทบ</div>'
                    ];

                    // Function to get the color map based on name
                    const getColorMap = (name: string) => {
                        if (name === 'sound') return colorMapSound;
                        if (name === 'air') return colorMap;
                        return colorOtherMap;
                    };

                    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                    `<div style="display: grid;">
                        <div style="display: flex; justify-content: space-between;">
                            <div style="font-size: 1.25rem; font-weight:bold;">
                                ${marker.LastUpdate?.AQI?.aqi || marker.LastUpdate?.COD || marker.LastUpdate?.Flow || marker.LastUpdate5min?.Leq || "N/A"} 
                                <span style="font-size: 1.125rem;font-weight:normal;">${unit}</span>
                            </div>
                            ${getColorMap(name)[marker.LastUpdate?.AQI?.color_id || marker.LastUpdate?.effect || 1]}
                        </div>
                        <div style="height:2px;margin:10px;background:#EAECF0;border-radius:10px;"></div>
                        <div style="display: grid;justify-items:center;">
                            <div style="font-size: 1.125rem; font-weight: bold;">${marker?.nameTH}</div>
                            <div style="color: #6b7280;text-align: center;">
                                อัปเดตล่าสุด : ${marker?.LastUpdate?.date && DateFormator(new Date(`${marker?.LastUpdate.date}T${marker?.LastUpdate.time}`))}
                            </div>
                        </div>
                    </div>`
                    );
                    const position: any = marker?.long ? [parseFloat(marker?.long), parseFloat(marker?.lat)] : [101.3098455 + Math.random() * 0.05, 12.6605804 + Math.random() * 0.05];
                    // const dataPos = [parseFloat(marker?.long), parseFloat(marker?.lat)];
                    // console.log("THIS IS location : ",{isSame :(dataPos[0] == position[0]),DB:dataPos,CurrentPos : position})
                    new mapboxgl.Marker(el)
                        .setLngLat(position)
                        .setPopup(popup)
                        .addTo(mapRef.current)
                }


            }


        }

        // Cleanup map instance on unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, [data]);

    return data && (
        <div className="w-full h-full rounded-xl bg-slate-100 overflow-hidden">
            {/* Map container */}
            <div ref={mapContainerRef} id="map" style={{ height: '100%' }} />
        </div>
    );
}


