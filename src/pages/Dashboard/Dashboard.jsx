import * as Icons from "../../icons";
import DemoArea from "../charts/TableArea";
import DemoPie from "../charts/PieChart";
import { EllipsisOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col, Rate, Badge } from "antd";
import { getDashboardInfo } from "../../config/action";
import { useEffect } from "react";

export default function Dashboard() {
  const { DashboardInfo, StoreSetting } = useSelector(state => state.app);
  const windowsWidth = window.innerWidth;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardInfo());
  }, []);

  const columns = [
    {
      title: "Product Name",
      key: "productName",
      render: item => (
        <div className="dashboardTableDiv" key={item.index}>
          <img src={item?.products[0]?.image} alt="..." />
          <p>{item?.products[0]?.productName}</p>
        </div>
      ),
      dataIndex: "",
      width: "200px"
    },
    {
      title: "Price",
      key: "price",
      render: item => item?.products[0]?.price + " " + StoreSetting.currency,
      dataIndex: ""
    },
    {
      title: "Count",
      key: "count",
      render: item => <Badge showZero count={item?.products[0]?.quantity} style={{
        color: "#3A36DB",
        background: "#D8D7F8"
      }} />,
      dataIndex: ""
    },
    {
      title: "Total Amount",
      key: "totalAmount",
      render: item => item?.products[0]?.price + " " + StoreSetting.currency,
      dataIndex: ""
    },
  ];

  return (
    <div className="dashboard">
      <h3>Asboblar paneli</h3>
      <div className="cards">
        <Row gutter={[30, 30]} >
          <Col xs={24} sm={12} md={12} lg={12} xl={6} >
            <div className="card">
              <Icons.heart color={"#3A36DB"} />
              <div>
                <h3>
                  {DashboardInfo.topCards?.todaySalesPrice.toFixed(2)}{StoreSetting.currency}
                </h3>
                <p>Bugungi Savdo</p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <div className="card">
              <Icons.game color={"#03A89E"} />
              <div>
                <h3>{DashboardInfo.topCards?.todayOrders}</h3>
                <p>Bugungi Buyurtmalar</p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <div className="card">
              <Icons.bag color={"#FF69B4"} />
              <div>
                <h3>{DashboardInfo.topCards?.monthSalesPrice.toFixed(2)}{StoreSetting.currency}</h3>
                <p>Haftalik Savdo</p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <div className="card">
              <Icons.job color={"#3A36DB"} />
              <div>
                <h3>{DashboardInfo.topCards?.monthOrders}</h3>
                <p>Haftalik Buyurtmalar</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="charts">
        <Row gutter={windowsWidth < 768 ? [0, 20] : [30, 0]} style={{ marginTop: "15px" }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} style={{ paddingRight: "0px" }}>
            <div className="chart">
              <DemoArea data={DashboardInfo?.productMonthReport?.length ? DashboardInfo?.productMonthReport : []} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8}>
            <div className="chart">
              <DemoPie />
            </div>
          </Col>
        </Row>
      </div>
      <div className="tables">
        <Row gutter={windowsWidth < 768 ? [0, 20] : [30, 30]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} style={{ paddingRight: "0px" }}>
            <div className="latestOrderedProducts">
              <div className="head">
                <h3>Ohirgi buyurtmalar</h3>
                <EllipsisOutlined />
              </div>
              <Table
                className="table"
                sticky
                dataSource={DashboardInfo?.lastOrder}
                columns={columns}
                pagination={false}
                rowKey={"id"}
                scroll={{
                  y: 240,
                }}
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8}>
            <div className="theBestsellerProducts">
              <div className="head">
                <h3 style={{ margin: '0' }}>Eng ko’p sotilgan mahsulotlar</h3>
                <EllipsisOutlined />
              </div>
              <div className="onlyTwo">
                {
                  DashboardInfo.topProducts?.map((item, index) => {
                    return <div key={index} className="aProduct" style={windowsWidth < 470 ? { flexDirection: "column", alignItems: "center", textAlign: "center" } : { display: "flex" }}>
                      <img src={item.image} alt="..." />
                      <div className="about">
                        <h3>{item.productName}</h3>
                        <Rate />
                        <h3>{item.price}{StoreSetting.currency}</h3>
                      </div>
                    </div>
                  })
                }
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div >
  )
}