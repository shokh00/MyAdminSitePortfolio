import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';


const DemoArea = () => {
    const [data, setData] = useState([
        {
            timePeriod: "Monday",
            value: 5
        },
        {
            timePeriod: "Tuesday",
            value: 1
        },
        {
            timePeriod: "Wednesday",
            value: 15
        },
        {
            timePeriod: "Thursday",
            value: 10
        }
    ]);

    const config = {
        data,
        xField: 'timePeriod',
        yField: 'value',
        xAxis: {
            range: [0, 1],
        },
        height: 200
    };

    return (
        <div className='area'>
            <Area {...config} />
        </div>
    );
};

export default DemoArea;