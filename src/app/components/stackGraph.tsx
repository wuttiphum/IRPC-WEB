import React, { useEffect } from 'react';
import { Column } from '@antv/g2plot';
import extractKeys from '../ultilities/ExtractKeys';

const StackedColumnChart = ({ data }: any) => {

  const keys = data ? extractKeys(data) : []

  useEffect(() => {
    // fetch('https://gw.alipayobjects.com/os/antfincdn/8elHX%26irfq/stack-column-data.json')
    //   .then((response) => response.json())
    //   .then((data) => {
    const stackedColumnPlot = new Column('container', {
      data: data?.length > 0 ? data : [],
      isStack: true,
      seriesField: keys.length > 0 ? keys[0] : 'name',
      xField: keys.length > 0 ? keys[1] : 'timePeriod',
      yField: keys.length > 0 ? keys[2] : 'value',
      interactions: [{ type: 'active-region', enable: false }],
      connectedArea: {
        style: (oldStyle, element) => {
          return { fill: 'rgba(0,0,0,0.25)', stroke: oldStyle.fill, lineWidth: 0.5 };
        },
      },
    }
    );

    stackedColumnPlot.render();
    //   }
    // );
  }, []);

  return <div id="container" style={{ width: '100%', height: '400px' }}></div>;
};

export default StackedColumnChart;
