'use client';

import React, { useEffect, useRef } from 'react';
import { Column } from '@antv/g2plot';
import { ShortDateFormator } from '../ultilities/DateFormater';
import extractKeys from '../ultilities/ExtractKeys';

export default function MultiColumnGraph({ data,color }: any) {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<Column | null>(null); // To track the chart instance


    useEffect(() => {

        // console.log("DATA : ", data)

        const keys = data ? extractKeys(data) : []
        // console.log("KEYS : ", keys)

        // Fetch data and render chart only if not already rendered
        if (!chartRef.current) {
            if (containerRef.current) {
                chartRef.current = new Column(containerRef.current, {
                    data: data?.length > 0 ? data : [],
                    isStack: true,
                    color,
                    seriesField: keys.length > 0 ? keys[0] : 'name',
                    xField: keys.length > 0 ? keys[1] : 'timePeriod',
                    yField: keys.length > 0 ? keys[2] : 'value',
                    xAxis: {
                        label: {
                            formatter: (val) => {
                                try {
                                    return ShortDateFormator(new Date(val.split(" ").join("T")))

                                } catch (error) {
                                    return val
                                }
                            }
                        },
                        // range: [0, 1],

                    },
                    yAxis: {
                        label: {
                            formatter: (val) => `${val}`, // Customize y-axis label if needed
                        },
                        range: [0, 1]
                    },

                    columnStyle: {
                        radius: [5, 5, 0, 0],
                    },
                    // interactions: [{ type: 'active-region', enable: false }],
                    connectedArea: {
                        style: (oldStyle, element) => {
                            return { fill: 'rgba(0,0,0,0.10)', stroke: oldStyle.fill, lineWidth: 0.5 };
                        },
                    },

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

    return <div id="chart" ref={containerRef} style={{ height: 400, width: '100%'}} />;
}



