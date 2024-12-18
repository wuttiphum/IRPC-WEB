'use client';

import React, { useEffect, useRef } from 'react';
import { Line } from '@antv/g2plot';
import extractKeys from '../ultilities/ExtractKeys';

export default function LineGraph({ data }: any) {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<Line | null>(null); // To track the chart instance

    // const data = [
    //     { time: '00:00', value: 3, category: 'Series 1' },
    //     { time: '01:00', value: 4, category: 'Series 1' },
    //     { time: '02:00', value: 3.5, category: 'Series 1' },
    //     { time: '03:00', value: 5, category: 'Series 1' },
    //     { time: '04:00', value: 4.9, category: 'Series 1' },
    //     { time: '05:00', value: 6, category: 'Series 1' },
    //     { time: '06:00', value: 7, category: 'Series 1' },
    //     { time: '07:00', value: 9, category: 'Series 1' },
    //     { time: '08:00', value: 13, category: 'Series 1' },

    //     { time: '00:00', value: 2, category: 'Series 2' },
    //     { time: '01:00', value: 3, category: 'Series 2' },
    //     { time: '02:00', value: 4, category: 'Series 2' },
    //     { time: '03:00', value: 4.5, category: 'Series 2' },
    //     { time: '04:00', value: 5.2, category: 'Series 2' },
    //     { time: '05:00', value: 6.3, category: 'Series 2' },
    //     { time: '06:00', value: 7.5, category: 'Series 2' },
    //     { time: '07:00', value: 8.7, category: 'Series 2' },
    //     { time: '08:00', value: 11, category: 'Series 2' },
    // ];

    useEffect(() => {

        const keys = data ? extractKeys(data) : []
        // Fetch data and render chart only if not already rendered
        if (!chartRef.current) {

            if (containerRef.current) {
                chartRef.current = new Line(containerRef.current, {
                    data: data?.length > 0 ? data : [
                    ],
                    isStack: true,

                    xField: keys.length > 0 ? keys[0] : 'timePeriod',
                    yField: keys.length > 0 ? keys[1] : 'value',
                    xAxis: {
                        range: [0, 1],
                    },
                    yAxis: {
                        label: {
                            formatter: (val) => `${val}`, // Customize y-axis label if needed
                        },
                    },
                    smooth: true, // Enable smooth curves

                });
                chartRef.current.render();

            }
        }

        return () => {
            // Clean up the chart instance when the component unmounts
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, []);

    return <div id="chart" ref={containerRef} style={{ height: 400, width: '100%' }} />;
}
