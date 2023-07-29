import { DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd"
import { Space, Input } from "antd"
const { Search } = Input;

export default function Order() {
    const columns = [
        {
            title: "Customer",
            key: "customer",
            dataIndex: "customer"
        },
        {
            title: "Phone Number",
            key: "phone-number",
            dataIndex: "phone-number"
        },
        {
            title: "Address",
            key: "address",
            dataIndex: "address"
        },
        {
            title: "Amount",
            key: "amount",
            dataIndex: "amount"
        },
        {
            title: "Date",
            key: "date",
            dataIndex: "date"
        },
        {
            title: "Order Mode    Status",
            key: "status",
            dataIndex: "status"
        },
        {
            title: <DeleteOutlined />,
            key: "customer",
            dataIndex: "customer"
        },
    ]

    const onSearch = value => console.log(value)


    return (
        <>
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
                </Space>
            </div>
            <div className="body">
                <Table style={{ margin: "10px 0 0 0" }} columns={columns} />
            </div>
        </>
    )
}