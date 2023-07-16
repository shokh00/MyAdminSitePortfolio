import { Pie, measureTextWidth } from '@ant-design/plots';

const DemoPie = () => {
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
            type: 'Sale',
            value: 27,
        },
        {
            type: 'Distribute',
            value: 18,
        },
        {
            type: '分类三',
            value: 18,
        },
    ];
    const config = {
        appendPadding: 1,
        data,
        legend: true,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.64,
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
                },
            },
            content: {
                offsetY: 4,
                style: {
                    fontSize: '32px',
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
            <Pie {...config} />
        </div>
    );
};

export default DemoPie;