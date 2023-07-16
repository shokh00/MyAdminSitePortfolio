import { Table } from "antd"
import { Space, Input } from "antd"
const { Search } = Input;

export default function Order() {

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
                <Table style={{ margin: "10px 0 0 0" }} />
            </div>
        </>
    )
}