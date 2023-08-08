import { Input, Space, Table, Button, Dropdown } from "antd";
import { deleteProduct, getOrderHistory, SwitchStatus } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { EllipsisOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { updateState } from "../../store/reducer";
import Modal from "./ModalJS";
const { Search } = Input;

export default function Products() {
  const dispatch = useDispatch();
  const { products, oneProduct, loadings: { tableLoading } } = useSelector(state => state.app);
  const onSearch = (value) => console.log(value);


  const fall = (item, e) => {
    if (e.key == "1") {
      dispatch(updateState({ isProductOpen: true }));
      dispatch(updateState({ oneProduct: item }));
    }
    else if (e.key == "2") {
      dispatch(SwitchStatus(item));
    }
    else {
      dispatch(deleteProduct(item.id));
    }
  }

  return (
    <div className='product'>
      <div className='header'>
        <h3>
          Product List
        </h3>
        <Space>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            className="search"
            style={{
              width: 200,
            }}
          />
          <Modal oneProduct={oneProduct} />
        </Space>
      </div>
      <div className="body">
        <table className="table">
          <thead>
            <tr>
              <th style={{ textAlign: "center", padding: "0 20px 0 0" }}>Image</th>
              <th>Product name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Date</th>
              <th>Status</th>
              <th><DeleteOutlined /></th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(item => (
                <tr key={item.id} className="asdsad">
                  <td className="col col-1">
                    <img src={item.image} style={item.image ? { width: "150px" } : { width: "50%" }} alt="" />
                  </td>
                  <td className="col col-2">
                    {item.productName}
                  </td>
                  <td className="col col-3">
                    <h4>
                      {item.description}
                    </h4>
                  </td>
                  <td className="col col-4">
                    {item.price}
                  </td>
                  <td className="col col-5">
                    {item.stock}
                  </td>
                  <td className="col col-6">
                    {item.date}
                  </td>
                  <td>
                    <button className={item.status ? "enabled" : "disabled"}>
                      {
                        item.status ? "Enable" : "Disabled"
                      }
                    </button>
                  </td>
                  <td>
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: '1',
                            label: <span style={{ color: "#1677FF" }}>Edit</span>,
                            icon: <EditOutlined style={{ color: "#1677FF" }} />,
                          },
                          {
                            key: "2",
                            label: <span style={item.status ? { color: "red" } : { color: "green" }}> {item.status ? "Disabled" : "Enabled"}</span>,
                            icon: <i className="bx bxs-checkbox" style={item.status ? { border: "1px solid green" } : { border: "1px solid red" }}></i>,
                          },
                          {
                            key: '3',
                            label: <span style={{ color: "red" }}>Delete</span>,
                            icon: <DeleteOutlined style={{ color: "red" }} />,
                          }
                        ],
                        onClick: (e) => fall(item, e)
                      }}
                      placement="bottomRight"
                      arrow
                    >
                      <Button><EllipsisOutlined /></Button>
                    </Dropdown>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div >
  )
}