import * as Icons from "../../icons";
import DemoArea from "../charts/TableArea";
import DemoPie from "../charts/PieChart";
import { EllipsisOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Table, Row, Col, Rate } from "antd"

export default function Dashboard() {
  const { products } = useSelector(state => state.app);
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
      dataIndex: "amount"
    },
  ]

  return (
    <div className="dashboard">
      <h3>Asboblar paneli</h3>
      <div className="cards">
        <Row gutter={[30, 30]} >
          <Col xs={24} sm={12} md={12} lg={12} xl={6} >
            <div className="card">
              <Icons.heart color={"#3A36DB"} />
              <div>
                <h3>178+</h3>
                <p>Bugungi Savdo</p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <div className="card">
              <Icons.game color={"#03A89E"} />
              <div>
                <h3>{products.length}</h3>
                <p>Bugungi Buyurtmalar</p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <div className="card">
              <Icons.bag color={"#FF69B4"} />
              <div>
                <h3>190+</h3>
                <p>Haftalik Savdo</p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <div className="card">
              <Icons.job color={"#3A36DB"} />
              <div>
                <h3>12+</h3>
                <p>Haftalik Buyurtmalar</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="charts">
        <Row gutter={windowsWidth < 768 ? [0, 20] : [30, 0]} style={{ marginTop: "15px"}}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} style={{paddingRight: "0px" }}>
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
              <Table className="table" columns={columns} dataSource={products} pagination={false} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} style={{height: "100%"}}>
            <div className="theBestsellerProducts" style={{height: "100%"}}>
              <div className="head">
                <h3 style={{ margin: '0' }}>Eng ko’p sotilgan mahsulotlar</h3>
                <EllipsisOutlined />
              </div>
              <div className="onlyTwo">
                <div className="aProduct" style={windowsWidth < 470 ? { flexDirection: "column", alignItems: "center", textAlign: "center" } : { display: "flex" }}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZKXUwa-URi6ZdameEjdtFfqXuqiTcACmTrA&usqp=CAU" alt="Something went wrong" />
                  <div className="about">
                    <h3>Nature</h3>
                    <Rate />
                    <h3>87$</h3>
                  </div>
                </div>
                <hr />
                <div className="aProduct" style={windowsWidth < 470 ? { flexDirection: "column", alignItems: "center", textAlign: "center" } : { display: "flex" }}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZKXUwa-URi6ZdameEjdtFfqXuqiTcACmTrA&usqp=CAU" alt="Something went wrong" />
                  <div className="about">
                    <h3>Nature</h3>
                    <Rate />
                    <h3>87$</h3>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div >
  )
}