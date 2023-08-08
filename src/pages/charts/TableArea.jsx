import React, { useState } from 'react';
import { Area } from '@ant-design/plots';
import { EllipsisOutlined } from '@ant-design/icons';

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
    };

    return (
        <div className='area'>
            <div className='head'>
                <h3>Haftalik hisobotlar</h3>
                <EllipsisOutlined style={{padding: "0 4% 0 0"}} />    
            </div>
            <Area {...config} style={{height: "250px"  }} />
        </div>
    );
};

export default DemoArea;