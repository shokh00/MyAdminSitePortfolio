import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneOrder, getOrderHistory } from "../../config/action";
import { Card, Col, Row, Table, message } from "antd";
import moment from "moment/moment";
import call from "../../config/call";
import jsPDF from "jspdf";

export default function OneOrder() {
  const { OneOrderHistory, StoreSetting } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const doc = new jsPDF();

  useEffect(() => {
    dispatch(getOneOrder(id));
  }, []);

  const columns = [
    {
      title: "Product",
      dataIndex: "",
      render: item => item.productName
    },
    {
      title: "Quantity",
      dataIndex: "",
      render: item => item.quantity
    },
    {
      title: "Item price",
      dataIndex: "",
      render: item => item.price + StoreSetting.currency
    },
    {
      title: "promotion %",
      dataIndex: "",
      render: () => "0%"
    },
    {
      title: "Total",
      dataIndex: "",
      render: item => item.price * item.quantity + StoreSetting.currency
    },
    {},
  ]

  const SwitchOrder = (id, status) => {
    call.put(`/order/status/${id}`, { status }, { validateStatus: status => status == 406 || status <= 202 })
      .then(res => {
        if (res.data.message == "The order status has already been changed") {
          message.error("Bu delivery ozgartirilgan");
        }
        else {
          dispatch(getOrderHistory());
          message.success("Status ozgarildi");
          navigate("/order");
        }
      })
  }

  return (
    <Row>
      <Col span={24}>
        <Card
          className="oneOrderCard"
          title={
            <div className="oneOrderCardTitle">
              <h3>Preview Order</h3>
              <div>
                <button className="confirm" onClick={() => SwitchOrder(id, "complete")}>CONFIRM</button>
                <button className="cancel" onClick={() => SwitchOrder(id, "canceled")}>CANCEL</button>
              </div>
            </div>
          }
        >
          <div className="oneOrderCardBody">
            <div className="between__div head">
              <img src={StoreSetting?.image} alt="" />
              <div>
                <p>{StoreSetting?.supportEmail}</p>
                <p>+998 {StoreSetting?.supportPhone}</p>
              </div>
            </div>
            <div className="between__div">
              <div style={{ textAlign: "start" }}>
                <h2>{OneOrderHistory?.orderMode}</h2>
                {
                  OneOrderHistory.orderMode == "PICKUP" ?
                    <div className="userDeliverInfo">
                      <h5>
                        {moment(OneOrderHistory?.customer?.pickupTime).format("ll")}
                      </h5>
                    </div> :
                    <div className="userDeliverInfo">
                      <h5>{OneOrderHistory?.customer?.address?.avenue}</h5>
                      <h5>{OneOrderHistory?.customer?.address?.city}</h5>
                      <h5>{OneOrderHistory?.customer?.address?.houseNo} house</h5>
                      <h5>{OneOrderHistory?.customer?.address?.street}</h5>
                    </div>
                }
                <div className="userInfo">
                  <h5>{OneOrderHistory?.customer?.fullName}</h5>
                  <h5>+998 {OneOrderHistory?.customer?.phone}</h5>
                </div>
              </div>
              <div className="invoice">
                <h2>
                  Invoice
                </h2>
                <h5>invoice no</h5>
                <span>{OneOrderHistory.id}</span>
                <h5 style={{ margin: "10px 0 0 0" }}>invoice date</h5>
                <span>{OneOrderHistory.date}</span>
              </div>
            </div>
            <Table rowKey={"id"} style={{ margin: "15px 0 0 0" }} pagination={false} columns={columns} dataSource={OneOrderHistory.products} />
            <div className="total">
              <div className="end">
                <div className="end-left">
                  <button onClick={() => doc.save("a4.pdf")}>Download</button>
                  <button onClick={() => window.print()}>Print</button>
                </div>
                <div className="end-right">
                  <div className="info">
                    <h3>SUBTOTAL</h3>
                    <h3>{OneOrderHistory.products?.map(item => item.price * item.quantity)} {StoreSetting.currency}</h3>
                  </div>
                  <div className="info" style={{ margin: "0" }}>
                    <h3>Discount: 0%</h3>
                    <h3>0 {StoreSetting.currency}</h3>
                  </div>
                  <hr />
                  <div className="info">
                    <h3>Total %</h3>
                    <h3>{OneOrderHistory.products?.map(item => item.price * item.quantity)} {StoreSetting.currency}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
}
