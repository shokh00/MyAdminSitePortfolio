import { useEffect, useState, useRef } from "react";
import { Form, Button, Input, InputNumber, Drawer } from "antd";
import { LeftOutlined, CameraFilled, DownloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { postProduct, remakeProduct } from "../../store/action";
import { updateState } from "../../store/reducer";
import axios from "axios";

export default function AddProductModal({ newStatus }) {
  const dispatch = useDispatch();
  const { isProductOpen, oneProduct , loadings: {saveBtnLoading} } = useSelector(state => state.app);
  const [image, setImage] = useState(null);
  const [useForm] = Form.useForm();

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
    const newValue = {
      ...value,
      price: value.price,
      promotion: value.promotion,
      stock: value.stock,
      image
    };
    if (oneProduct?.id) {
      dispatch(remakeProduct({ ...newValue, id: oneProduct.id, status: oneProduct.status }));
    }
    else {
      dispatch(postProduct(newValue));
    }
  }

  function postImg(e) {
    let formData = new FormData()
    formData.append('image', e.target.files[0])
    axios({
      url: 'https://f-07.onrender.com/api/v1/file',
      data: formData,
      method: 'post',
      headers: {
        apiKey: "2ap7JQwe9l58hUtfGsHT",
        "ngrok-skip-browser-warning": true,
      }
    }).then(res => setImage(res.data.url))
      .catch(err => console.log(err));
  }



  return (
    <>
      <Button className="btn" onClick={toggleOpen}>+ Add New</Button>
      <Drawer
        footer={
          <Button onClick={() => useForm.submit()} loading={saveBtnLoading} type="primary"> <DownloadOutlined /> Save Product </Button>
        }
        style={{ textAlign: "center", alignItems: "center" }} closeIcon={<LeftOutlined />} title="Add a New Product" onClose={toggleOpen} open={isProductOpen}
      >
        <input id="input" type="file" onChange={postImg} style={{ display: "none" }} />
        <label htmlFor="input">
            <CameraFilled className="circle" style={{ fontSize: 18 }} />
        </label>
        {image && <img src={image} alt="error" width={100} />}
        <Form form={useForm} layout="vertical" onFinish={onFinish} name="form">
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
          <Form.Item name="price" label="price ($)" rules={[{ required: true, message: "price" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Drawer >
    </>
  )
}