import * as Icons from "../../icons";
import DemoArea from "../charts/TableArea";
import DemoPie from "../charts/PieChart";
import { EllipsisOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Table, Row, Col, Rate } from "antd"

export default function Dashboard() {
  const { DashboardInfo, StoreSetting } = useSelector(state => state.app);
  const windowsWidth = window.innerWidth;

  const columns = [
    {
      title: "Tracking no",
      key: "id",
      dataIndex: "id",
      width: "100px"
    },
    {
      title: "Product Name",
      key: "productName",
      dataIndex: "productName",
      width: "200px"
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price"
    },
    {
      title: "Count",
      key: "count",
      dataIndex: "quantity"
    },
    {
      title: "Total Amount",
      key: "totalAmount",
      dataIndex: `price`
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
              <DemoArea />
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
        <Row gutter={windowsWidth < 768 ? [0, 20] : [30, 0]} style={{ width: "100vw" }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} style={{ paddingRight: "0px" }}>
            <div className="latestOrderedProducts">
              <div className="head">
                <h3>Ohirgi buyurtmalar</h3>
                <EllipsisOutlined />
              </div>
              <Table className="table" rowKey={"id"} dataSource={DashboardInfo.lastOrder?.products} columns={columns} pagination={false} />
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
                        <img src={item.image} alt="Something went wrong" />
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