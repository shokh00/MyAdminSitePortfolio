import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../store/action';

const DemoArea = () => {
    const [data, setData] = useState([
        {
            timePeriod: 2001,
            value: 5
        },
        {
            timePeriod: 2002,
            value: 1
        },
        {
            timePeriod: 2003,
            value: 15
        },
        {
            timePeriod: 2004,
            value: 0
        }
    ]);
    const { products } = useSelector(state => state.app);
    const dispatch = useDispatch(getProduct)

    // useEffect(() => {
    //     dispatch(getProduct());
    //     products.map(item => {
    //         return setData(
    //             [
    //                 {
    //                     timePeriod: item.date,
    //                     value: item.stock
    //                 }
    //             ]
    //         )
    //     });
    // }, []);

    console.log(data);
    console.log(products);

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
            <Area {...config} style={{ width: "100%" }} height={"100%"} />
        </div>
    );
};

export default DemoArea;