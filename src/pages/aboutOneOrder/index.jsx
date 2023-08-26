import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SwitchOrder, getOneOrder, getOrderHistory } from "../../config/action";
import { Card, Col, Row, Table, message } from "antd";
import moment from "moment/moment";
import call from "../../config/call";

export default function OneOrder() {
  const { OneOrderHistory, StoreSetting } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

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

  console.log(OneOrderHistory);
  console.log(StoreSetting);

  return (
    <Row>
      <Col xs={24} sm={20} md={16} lg={12} xl={12}>
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <img src={StoreSetting.image} width={75} height={75} alt="" />
                <h3>{OneOrderHistory.orderMode}</h3>
                <div className="userAddress">
                  {
                    OneOrderHistory.orderMode == "PICKUP" ?
                      <>
                        <h4 className="name">{OneOrderHistory.customer?.fullName}</h4>
                        <h4>{OneOrderHistory.customer?.pickupTime}</h4>
                      </> :
                      <>
                        <h4 className="name">{OneOrderHistory.customer?.fullName}</h4>
                        <h4>{OneOrderHistory.customer?.address.avenue}</h4>
                        <h4>{OneOrderHistory.customer?.address.city}</h4>
                        <h4>{OneOrderHistory.customer?.address.houseNo}</h4>
                        <h4>{OneOrderHistory.customer?.address.street}</h4>
                      </>
                  }
                </div>
                <h4 style={{ margin: "10px 0 0 0" }}>+998 {OneOrderHistory.customer?.phone}</h4>
              </div>
              <div style={{ textAlign: "end" }}>
                <div className="storeInfo">
                  <h4>{StoreSetting.supportEmail}</h4>
                  <h4>{StoreSetting.supportPhone}</h4>
                </div>
                <h2 style={{ margin: "20px 0 0 0 " }}>Invoice</h2>
                <div className="orderInfo">
                  <div>
                    <h4>invoice no:</h4>
                    <span>{OneOrderHistory.id}</span>
                  </div>
                  <div style={{ margin: "15px 0 0 0" }}>
                    <h4>invoice date</h4>
                    <span>{moment(OneOrderHistory.date).format("ll")}</span>
                  </div>
                </div>
              </div>
            </div>
            <Table style={{margin: "15px 0 0 0"}} pagination={false} columns={columns} dataSource={OneOrderHistory.products} />
            <div className="total">
              <div className="end">
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
        </Card>
      </Col>
    </Row>
  );
}
