import { Space, Input } from "antd"
import { useSelector } from "react-redux";
const { Search } = Input;

export default function Order() {
    const { OrderHistory , StoreSetting } = useSelector(state => state.app);

    const onSearch = value => console.log(value);

    return (
        <div className="orders">
            <div className='header'>
                <h3>
                    Buyurtmalar
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
            <div className="order-body">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Amount</th>
                            <th>Order mode</th>
                            <th>Customer Phone</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            OrderHistory.map(item => {
                                return <tr key={item.id} className="order-table-tr">
                                    <td className="order-table-td">{item.id}</td>
                                    <td className="order-table-td">{item.amount}</td>
                                    <td className="order-table-td">{item.orderMode}</td>
                                    <td className="order-table-td">{item.customer.phone}</td>
                                    <td className="order-table-td">{item.date}</td>
                                    <td className="order-table-td">{item.status}</td>
                                    <td className="order-table-td">{item.total}{StoreSetting.currency}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}