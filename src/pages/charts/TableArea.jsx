import { Column } from '@ant-design/plots';
import { EllipsisOutlined } from '@ant-design/icons';

const DemoArea = ({ data }) => {
    const config = {
        data,
        xField: 'productName',
        yField: 'count',
        xAxis: {
            label: {
                autoRotate: false,
            },
        },
        scrollbar: {
            type: 'horizontal',
        },
    };

    return (
        <div className='area'>
            <div className='head'>
                <h3>Haftalik hisobotlar</h3>
                <EllipsisOutlined style={{ padding: "0 4% 0 0" }} />
            </div>
            <Column {...config} style={{ height: "250px" }} />
        </div>
    );
};

export default DemoArea;