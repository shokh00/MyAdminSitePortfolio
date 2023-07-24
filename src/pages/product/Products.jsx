import { Input, Space, Table, Button, Dropdown } from "antd";
import { deleteProduct, SwitchStatus } from "../../store/action";
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
      if (item.status == true) {
        e.domEvent.target.outerHTML = `<span style=\"color: green;\"> Enabled </span>`
      }
      else if (item.status == false) {
        e.domEvent.target.outerHTML = `<span style=\"color: rgb(255, 105, 180);\"> Disabled </span>`
      }
      dispatch(SwitchStatus(item));
    }
    else {
      dispatch(deleteProduct(item.id));
    }
  }

  console.log(products);

  const columns = [
    {
      title: "Image", dataIndex: "image", key: "image",
      render: (item) => <img width={100} height={100} src={item} alt="error" />
    },
    {
      title: "Product name",
      dataIndex: "productName",
      key: "product_name",
      sorter: (a, b) => a.product_name - b.product_name,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "100px"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
      width: "50px"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "50px"
    },
    {
      title: `Status`,
      dataIndex: "status",
      key: "",
      width: 200,
      render: item => <button className={item.status == true ? "enabled" : "disabled"} >
        {item.status == true ? "Enabled" : "Disabled"}
      </button>
    },
    {
      title: "Settings",
      key: "settings",
      width: "50px",
      render: (item) => <Dropdown
        menu={{
          items,
          onClick: (e) => fall(item, e)
        }}
        placement="bottomRight"
        arrow
      >
        <Button><EllipsisOutlined /></Button>
      </Dropdown>,
    }
  ]

  const items = [
    {
      key: '1',
      label: <span style={{ color: "#1677FF" }}>Edit</span>,
      icon: <EditOutlined style={{ color: "#1677FF" }} />,
    },
    {
      key: "2",
      label: <span style={{ color: "#FF69B4" }}> Disabled </span>,
      icon: <i className="bx bxs-checkbox" style={{ color: "transparent", border: "1px solid lightgray" }}></i>,
    },
    {
      key: '3',
      label: <span style={{ color: "red" }}>Delete</span>,
      icon: <DeleteOutlined style={{ color: "red" }} />,
    }
  ]

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
        <Table
          rowKey={"id"}
          columns={columns} pagination={true}
          dataSource={products}
          loading={tableLoading}
        />
      </div>
    </div>
  )
}