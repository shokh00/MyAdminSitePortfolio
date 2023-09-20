import { useEffect, useState } from "react";
import { Form, Button, Input, InputNumber, Drawer, Spin } from "antd";
import { LeftOutlined, CameraFilled, DownloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { postProduct, remakeProduct } from "../../config/action";
import { updateState } from "../../store/reducer";
import axios from "axios";

export default function AddProductModal({ newStatus }) {
  const dispatch = useDispatch();
  const { isProductOpen, oneProduct, loadings: { saveProductBtn } , StoreSetting } = useSelector(state => state.app);
  const [image, setImage] = useState(null);
  const [useForm] = Form.useForm();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (newStatus) {
      dispatch(updateState({ isProductOpen: newStatus }));
    }
  }, [newStatus]);

  useEffect(() => {
    if (oneProduct?.id) {
      useForm.setFieldsValue(oneProduct);
    }
    if (!isProductOpen) {
      dispatch(updateState({ oneProduct: {} }));
      useForm.resetFields();
    }
  }, [isProductOpen]);

  const toggleOpen = () => {
    dispatch(updateState({ isProductOpen: !isProductOpen }));
  }

  const onFinish = value => {
    let newValue;
    if (image == null) {
      newValue = {
        ...value,
        price: value.price,
        promotion: value.promotion,
        stock: value.stock,
        image: oneProduct.image
      };
    }
    else {
      newValue = {
        ...value,
        price: value.price,
        promotion: value.promotion,
        stock: value.stock,
        image
      };
    }
    if (oneProduct?.id) {
      dispatch(remakeProduct({ ...newValue, id: oneProduct.id, status: oneProduct.status }));
    }
    else {
      dispatch(postProduct(newValue));
    }
    // setImage(null);
  }

  function postImg(e) {
    setLoading(true);
    let formData = new FormData()
    formData.append('image', e.target.files[0])
    axios({
      url: 'https://f-07-backend.vercel.app/api/v1/file',
      data: formData,
      method: 'post',
      headers: {
        apiKey: "2ap7JQwe9l58hUtfGsHT",
        "x-auth-token": localStorage.getItem("x-auth-token")
      }
    }).then(res => setImage(res.data.url))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Button className="btn" onClick={toggleOpen}>+ Add New</Button>
      <Drawer
        forceRender
        footer={
          <Button onClick={() => useForm.submit()} loading={saveProductBtn} type="primary"> <DownloadOutlined /> Save Product </Button>
        }
        style={{ textAlign: "center", alignItems: "center" }} closeIcon={<LeftOutlined />} title="Add a New Product" onClose={toggleOpen} open={isProductOpen}
      >
        <div className="newImg">
          <input id="input" type="file" onChange={postImg} style={{ display: "none" }} />
          <label htmlFor="input">
            <CameraFilled className="circle" style={{ fontSize: 18 }} />
          </label>
          {image && <img src={image} alt="..." width={100} height={100} style={{margin: "0 0 0 10px"}} />}
          <Spin spinning={loading} style={{height: "100px" , alignItems: "center" , display: "flex" , margin: "0 0 0 10px"}} />
        </div>
        <Form form={useForm} layout="vertical" onFinish={onFinish} name="form" className="form">
          <Form.Item name="productName" label="Product Name" rules={[{ required: true, message: "productName" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="description" rules={[{ required: true, message: "description" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="promotion" label="promotion" rules={
            [
              { required: true, message: "promotion" },
            ]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="stock" label="stock" rules={[{ required: true, message: "stock" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="price" label={`price (${StoreSetting.currency})`} rules={[{ required: true, message: "price" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Drawer >
    </>
  )
}