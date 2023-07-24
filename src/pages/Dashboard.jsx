import * as Icons from "../icons";
import DemoArea from "./charts/TableArea";
import DemoPie from "./charts/PieChart";
import { EllipsisOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Table, Row, Col } from "antd"

export default function Dashboard() {
  const { products } = useSelector(state => state.app);
  const columns = [
    {
      label: "Tracking no",
      key: "id",
      dataIndex: "id"
    },
    {
      label: "Product Name",
      key: "productName",
      dataIndex: "productName"
    },
    {
      label: "Price",
      key: "price",
      dataIndex: "price"
    },
    {
      label: "Count",
      key: "count",
      dataIndex: "amount"
    },
  ]

  console.log(products);

  return (
    <div className="dashboard">
      <h3>Dashboard</h3>
      <Row gutter={[30 , 30]}>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} >
          <div className="card">
            <Icons.heart color={"#3A36DB"} />
            <div>
              <h4>178+</h4>
              <p>Save Products</p>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <div className="card">
            <Icons.game color={"#03A89E"} />
            <div>
              <h4>{products.length}</h4>
              <p>Stock Products</p>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <div className="card">
            <Icons.bag color={"#FF69B4"} />
            <div>
              <h4>190+</h4>
              <p>Sales Products</p>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <div className="card">
            <Icons.job color={"#3A36DB"} />
            <div>
              <h4>12+</h4>
              <p>Job Applications</p>
            </div>
          </div>
        </Col>
      </Row>
      {/* <div className='cards'>
      </div> */}
      <div className="charts">
        <DemoArea />
        <DemoPie />
      </div>
      <div className="tables">
        <div className="first">
          <div className="top">
            <h4>Recent Orders</h4>
            <span><EllipsisOutlined /></span>
          </div>
          <div className="body-part">
            <Table columns={columns} dataSource={products} />
          </div>
        </div>
      </div>
    </div>
  )
}