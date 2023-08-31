import * as Icons from "../../icons";
import DemoArea from "../charts/TableArea";
import DemoPie from "../charts/PieChart";
import { EllipsisOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col, Rate, Badge, Switch } from "antd";
import { getDashboardInfo } from "../../config/action";
import { useEffect } from "react";

export default function Dashboard() {
  const { DashboardInfo, StoreSetting } = useSelector(state => state.app);
  const windowsWidth = window.innerWidth;
  const dispatch = useDispatch();
  const latestProduct = [];

  useEffect(() => {
    dispatch(getDashboardInfo());
  }, [dispatch]);

  const columns = [
    {
      title: "Product Name",
      key: "productName",
      render: item => (
        <div className="dashboardTableDiv">
          <img src={item.image} alt="..." />
          <p>{item.productName}</p>
        </div>
      ),
      dataIndex: "",
      width: "200px"
    },
    {
      title: "Price",
      key: "price",
      render: item => item + StoreSetting.currency,
      dataIndex: "price"
    },
    {
      title: "Count",
      key: "count",
      render: item => <Badge showZero count={item} style={{
        color: "#3A36DB",
        background: "#D8D7F8"
      }} />,
      dataIndex: "quantity"
    },
    {
      title: "Total Amount",
      key: "totalAmount",
      dataIndex: `price`
    },
  ];

  DashboardInfo.lastOrder?.map(item => {
    return latestProduct.push(item.products[0]);
  });

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
        <Row gutter={windowsWidth < 768 ? [0, 20] : [30, 30]} style={{ width: "100vw" }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} style={{ paddingRight: "0px" }}>
            <div className="latestOrderedProducts">
              <div className="head">
                <h3>Ohirgi buyurtmalar</h3>
                <EllipsisOutlined />
              </div>
              <Table
                className="table"
                sticky rowKey={"id"}
                dataSource={latestProduct}
                columns={columns}
                pagination={false}
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
                  DashboardInfo.topProducts?.map(item => {
                    return <>
                      <div className="aProduct" style={windowsWidth < 470 ? { flexDirection: "column", alignItems: "center", textAlign: "center" } : { display: "flex" }}>
                        <img src={item.image} alt="..." />
                        <div className="about">
                          <h3>{item.productName}</h3>
                          <Rate />
                          <h3>{item.price}{StoreSetting.currency}</h3>
                        </div>
                      </div>
                      <hr />
                    </>
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