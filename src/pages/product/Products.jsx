import { Input, Space, Button, Dropdown, Spin, Badge } from "antd";
import { deleteProduct, getProduct, SwitchStatus } from "../../config/action";
import { useDispatch, useSelector } from "react-redux";
import { EllipsisOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { updateState } from "../../store/reducer";
import Modal from "./ModalJS";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import * as Icons from "../../icons";
const { Search } = Input;

export default function Products() {
  const dispatch = useDispatch();
  const { products, oneProduct, StoreSetting, loadings: { productTableLoading } } = useSelector(state => state.app);
  const [search, setSearch] = useState("");
  const findProduct = products.filter(item => item.productName == search);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

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

  const MyDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
  `

  return (
    <div className='product'>
      <MyDiv>
        <Spin spinning={productTableLoading} tip="Loading" size="large" />
      </MyDiv>
      <div className='header'>
        <h3>
          Product List
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
          <Modal oneProduct={oneProduct} />
        </Space>
      </div>
      <div className="body">
        <table>
          <thead>
            <tr>
              <th>Image</th>
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
              search == "" ? products.map(item => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} height={75} width={125} alt="..." />
                  </td>
                  <td>
                    <h3>{item.productName}</h3>
                  </td>
                  <td>
                    <p>
                      {item.description}
                    </p>
                  </td>
                  <td>
                    {item.price} {StoreSetting.currency}
                  </td>
                  <td>
                    <Badge showZero count={item.stock} style={{
                      color: "#3A36DB",
                      background: "#D8D7F8"
                    }} />
                  </td>
                  <td>
                    <Icons.calendar color={"#03A89E"} />
                    {moment(item.date).format('ll')}
                  </td>
                  <td>
                    <button className={item.status ? "enabled" : "disabled"}>
                      {
                        item.status ? "Enabled" : "Disabled"
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
                            icon: <svg width="14" height="14" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.18506 1.86736C7.18506 1.89569 6.963 4.704 6.83616 5.88607C6.75673 6.61148 6.2891 7.05189 5.58765 7.06397C5.04828 7.07606 4.52108 7.08022 4.00198 7.08022C3.45087 7.08022 2.91191 7.07606 2.38876 7.06397C1.71081 7.04772 1.24277 6.59939 1.16739 5.88607C1.03691 4.69983 0.818896 1.89569 0.814844 1.86736C0.810791 1.78153 0.838347 1.70028 0.894269 1.63486C0.94938 1.57361 1.02881 1.53736 1.11228 1.53736C2.84452 0.317717 5.15865 0.318834 6.89168 1.53736C6.97475 1.53736 7.05012 1.57361 7.10969 1.63486C7.16521 1.70028 7.19317 1.78153 7.18506 1.86736Z" fill={item.status ? "#FF69B4" : "#2FE5A7"} />
                            </svg>
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
                :
                findProduct.map(item => (
                  <tr>
                    <td>
                      <img src={item.image} height={75} width={125} alt="..." />
                    </td>
                    <td>
                      <h3>{item.productName}</h3>
                    </td>
                    <td>
                      <p>
                        {item.description}
                      </p>
                    </td>
                    <td>
                      {item.price} {StoreSetting.currency}
                    </td>
                    <td>
                      <Badge showZero count={item.stock} style={{
                        color: "#3A36DB",
                        background: "#D8D7F8"
                      }} />
                    </td>
                    <td>
                      <Icons.calendar color={"#03A89E"} />
                      {moment(item.date).format('ll')}
                    </td>
                    <td>
                      <button className={item.status ? "enabled" : "disabled"}>
                        {
                          item.status ? "Enabled" : "Disabled"
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
                              icon: <svg width="14" height="14" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.18506 1.86736C7.18506 1.89569 6.963 4.704 6.83616 5.88607C6.75673 6.61148 6.2891 7.05189 5.58765 7.06397C5.04828 7.07606 4.52108 7.08022 4.00198 7.08022C3.45087 7.08022 2.91191 7.07606 2.38876 7.06397C1.71081 7.04772 1.24277 6.59939 1.16739 5.88607C1.03691 4.69983 0.818896 1.89569 0.814844 1.86736C0.810791 1.78153 0.838347 1.70028 0.894269 1.63486C0.94938 1.57361 1.02881 1.53736 1.11228 1.53736C2.84452 0.317717 5.15865 0.318834 6.89168 1.53736C6.97475 1.53736 7.05012 1.57361 7.10969 1.63486C7.16521 1.70028 7.19317 1.78153 7.18506 1.86736Z" fill={item.status ? "#FF69B4" : "#2FE5A7"} />
                              </svg>
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