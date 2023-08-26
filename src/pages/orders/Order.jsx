import { Space, Input, Button } from "antd"
import { useDispatch, useSelector } from "react-redux";
import * as Icons from "../../icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import { getOrderHistory, getUserInfo } from "../../config/action";
const { Search } = Input;

export default function Order() {
    const { OrderHistory } = useSelector(state => state.app);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const [search, setSearch] = useState("");
    const findProduct = OrderHistory.filter(item => item.customer.fullName == search);

    useEffect(() => {
        dispatch(getOrderHistory());
    }, []);

    return (
        <div className="orders">
            <div className='header'>
                <h3>
                    Buyurtmalar
                </h3>
                <Space>
                    <Search
                        placeholder="input search text"
                        onSearch={setSearch}
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
                            <th>Customer</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Order Mode</th>
                            <th>Status</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            search == "" ?
                                OrderHistory.map(item => {
                                    return <tr key={item.id} className="order-table-tr">
                                        <td className="order-table-td order-table-td-1"><p>{item.customer.fullName}</p></td>
                                        <td className="order-table-td order-table-td-2">+998{item.customer.phone}</td>
                                        <td className="order-table-td order-table-td-3"><Icons.location /> {item.customer.address ? item.customer?.address.avenue : "in Pick Up"}</td>
                                        <td className="order-table-td order-table-td-4">{item.amount}</td>
                                        <td className="order-table-td order-table-td-5">
                                            <Icons.calendar color={"#03A89E"} />
                                            {moment(item.date).format('ll')}
                                        </td>
                                        <td className="order-table-td order-table-td-6"><p className={item.orderMode == "PICKUP" ? "PICKUP" : "DELIVERY"}>{item.orderMode}</p></td>
                                        <td className="order-table-td order-table-td-7">
                                            <button className={item.status == "canceled" ? "canceled" : "complete"}>
                                                {item.status == "canceled" ? "Cancel" : item.status == "pending" ? "Pending" : "Complete"}
                                            </button>
                                        </td>
                                        <td className="order-table-td order-table-td-7">
                                            <Button onClick={() => navigation(`/order/${item.id}`)} style={{ border: "0" }}>
                                                <Icons.eye color={"black"} />
                                            </Button>
                                        </td>
                                    </tr>
                                })
                                : findProduct.map(item => {
                                    return <tr key={item.id} className="order-table-tr">
                                        <td className="order-table-td order-table-td-1"><p>{item.customer.fullName}</p></td>
                                        <td className="order-table-td order-table-td-2">+998{item.customer.phone}</td>
                                        <td className="order-table-td order-table-td-3"><Icons.location /> {item.customer.address != undefined ? item.customer?.address.avenue : "In pickUp"}</td>
                                        <td className="order-table-td order-table-td-4">{item.amount}</td>
                                        <td className="order-table-td order-table-td-5">{item.date}</td>
                                        <td className="order-table-td order-table-td-5">{item.orderMode}</td>
                                        <td className="order-table-td order-table-td-6">
                                            <button className={item.status == "canceled" ? "canceled" : "complete"}>
                                                {item.status == "canceled" ? "Cancel" : item.status == "pending" ? "Pending" : "Complete"}
                                            </button>
                                        </td>
                                        <td className="order-table-td order-table-td-7">
                                            <Button onClick={() => navigation(`/order/${item.id}`)}>
                                                <Icons.Dotts color={"black"} />
                                            </Button>
                                        </td>
                                    </tr>
                                })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}