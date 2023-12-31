import { EllipsisOutlined } from "@ant-design/icons";
import { Pie, measureTextWidth } from "@ant-design/plots";
import { useDispatch, useSelector } from "react-redux";

const DemoPie = () => {
  const { DashboardInfo, StoreSetting } = useSelector(state => state.app);

  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(
      text,
      style
    );
    const R = containerWidth / 2;

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(
            Math.pow(R, 2) /
              (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
          )
        ),
        1
      );
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : "inherit"
    };">${text}</div>`;
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

  const config = {
    appendPadding: 10,
    data,
    legend: true,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v} ${StoreSetting.currency}`,
      },
    },
    label: {
      type: "inner",
      offset: "-50%",
      style: {
        textAlign: "center",
      },
      autoRotate: false,
      content: "{value}",
    },
    statistic: {
      title: false,
      content: {
        offsetY: 4,
        style: {
          fontSize: "32px",
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum
            ? `${datum.value}`
            : `${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },

    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
      {
        type: "pie-statistic-active",
      },
    ],
  };

  return (
    <div className="pie">
      <div className="head">
        <h3>Buyurtmalar holati</h3>
        <EllipsisOutlined />
      </div>
      <Pie {...config} style={{ height: "250px" }} />
    </div>
  );
};

export default DemoPie;
