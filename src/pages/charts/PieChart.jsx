import { EllipsisOutlined } from '@ant-design/icons';
import { Pie, measureTextWidth } from '@ant-design/plots';
import { useSelector } from 'react-redux';

const DemoPie = () => {
    const { DashboardInfo, StoreSetting } = useSelector(state => state.app)
    function renderStatistic(containerWidth, text, style) {
        const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
        const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

        let scale = 1;

        if (containerWidth < textWidth) {
            scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
        }

        const textStyleStr = `width:${containerWidth}px;`;
        return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
    }



    const data = [
        {
            type: "Pending",
            value: Number(`${DashboardInfo.orderMonthStatus?.pending}`),
        },
        {
            type: "Success",
            value: Number(`${DashboardInfo.orderMonthStatus?.complete}`),
        },
        {
            type: "Cancelled",
            value: Number(`${DashboardInfo.orderMonthStatus?.canceled}`),
        },
    ];

    // const data = [
    //     {
    //         type: '分类一',
    //         value: 27,
    //     },
    //     {
    //         type: '分类二',
    //         value: 25,
    //     },
    //     {
    //         type: '分类三',
    //         value: 18,
    //     },
    //     {
    //         type: '分类四',
    //         value: 15,
    //     },
    //     {
    //         type: '分类五',
    //         value: 10,
    //     },
    //     {
    //         type: '其他',
    //         value: 5,
    //     },
    // ];

    const config = {
        appendPadding: 10,
        data,
        legend: true,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.64,
        meta: {
            value: {
                formatter: (v) => `${v} ${StoreSetting.currency}`,
            },
        },
        label: {
            type: 'inner',
            offset: '-50%',
            style: {
                textAlign: 'center',
            },
            autoRotate: false,
            content: '{value}',
        },
        statistic: {
            title: {
                offsetY: -4,
                customHtml: (container, view, datum) => {
                    const { width, height } = container.getBoundingClientRect();
                    const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
                    const text = datum ? datum.type : 'Total';
                    return renderStatistic(d, text, {
                        fontSize: 28,
                    });
                },
            },
            content: {
                offsetY: 4,
                style: {
                    fontSize: '32px',
                },
                customHtml: (container, view, datum, data) => {
                    const { width } = container.getBoundingClientRect();
                    const text = datum ? `${StoreSetting.currency} ${datum.value}` : `${StoreSetting.currency} ${data.reduce((r, d) => r + d.value, 0)}`;
                    return renderStatistic(width, text, {
                        fontSize: 32,
                    });
                },
            },
        },

        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
            {
                type: 'pie-statistic-active',
            },
        ],
    };

    return (
        <div className="pie">
            <div className='head'>
                <h3>Buyurtmalar holati</h3>
                <EllipsisOutlined />
            </div>
            <Pie {...config} style={{height: "250px"}}  />
        </div>
    );
};

export default DemoPie;