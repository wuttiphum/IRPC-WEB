'use client';

import React, { useEffect, useRef } from 'react';
import { DualAxes } from '@antv/g2plot';

export default function DualGraph() {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<DualAxes | null>(null); // To track the chart instance
    const data = [
        { year: '1991', value: 3, count: 10 },
        { year: '1992', value: 4, count: 4 },
        { year: '1993', value: 3.5, count: 5 },
        { year: '1994', value: 5, count: 5 },
        { year: '1995', value: 4.9, count: 4.9 },
        { year: '1996', value: 6, count: 35 },
        { year: '1997', value: 7, count: 7 },
        { year: '1998', value: 9, count: 1 },
        { year: '1999', value: 13, count: 20 },
    ];

    useEffect(() => {
        // Fetch data and render chart only if not already rendered
        if (!chartRef.current) {

            if (containerRef.current) {
                chartRef.current = new DualAxes(containerRef.current, {
                    data: [data, data],
                    xField: 'year',
                    yField: ['value', 'count'],
                    geometryOptions: [
                        {
                            geometry: 'line',
                            
                            // smooth: false,
                            color: '#5B8FF9',
                            // label: {
                            //     formatter: (datum) => {
                            //         return `${datum.value}`;
                            //     },
                            // },
                            lineStyle: {
                                lineWidth: 3,
                               
                            },
                        },
                        {
                            geometry: 'line',
                            // smooth: true,
                            color: '#a00f11',
                            lineStyle: {
                                lineWidth: 4,
                                opacity: 0.5,
                            },
                            // label: {
                            //     formatter: (datum) => {
                            //         return `${datum.count}`;
                            //     },
                            // },
                            point: {
                                shape: 'circle',
                                size: 4,
                                style: {
                                    opacity: 0.5,
                                    stroke: '#a00f11',
                                    fill: '#fff',
                                },
                            },
                        },
                    ],

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
