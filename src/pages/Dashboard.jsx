import * as Icons from "../icons";
import DemoArea from "./charts/TableArea";
import DemoPie from "./charts/PieChart";
import { EllipsisOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function Dashboard() {

  const {products} = useSelector(state => state.app);

  console.log(products);

  return (
    <div className="dashboard">
      <h3>Dashboard</h3>
      <div className='cards'>
        <div className="card">
          <Icons.heart color={"#3A36DB"} />
          <div>
            <h4>178+</h4>
            <p>Save Products</p>
          </div>
        </div>
        <div className="card">
          <Icons.game color={"#03A89E"} />
          <div>
            <h4>{products.length}</h4>
            <p>Stock Products</p>
          </div>
        </div>
        <div className="card">
          <Icons.bag color={"#FF69B4"} />
          <div>
            <h4>190+</h4>
            <p>Sales Products</p>
          </div>
        </div>
        <div className="card">
          <Icons.job color={"#3A36DB"} />
          <div>
            <h4>12+</h4>
            <p>Job Applications</p>
          </div>
        </div>
      </div>
      <div className="charts">
        <DemoArea />
        <DemoPie />
      </div>
      <div className="tables">
        <div className="first">
          <div className="header">
            <h4>Recent Orders</h4>
            <span><EllipsisOutlined /></span>
          </div>
        </div>
      </div>
    </div>
  )
}