import { Card, Form, Input, Col, Button, Row, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { putStoreInfo, putUserInfo } from '../../store/action';

export default function UserSettings() {
    const dispatch = useDispatch();
    const { StoreSetting } = useSelector(selector => selector.app);
    const [useForm] = Form.useForm();
    const [image, setImage] = useState(null);

    useEffect(() => {
        useForm.setFieldsValue({
            name: StoreSetting.name,
            currency: StoreSetting.currency,
            supportEmail: StoreSetting.supportEmail,
            supportPhone: StoreSetting.supportPhone,
            address: StoreSetting.address
        });
    }, [StoreSetting]);

    console.log(StoreSetting);

    function postImg(e) {
        console.log("123");
        let formData = new FormData()
        formData.append('image', e.target.files[0])
        axios({
            url: 'https://f-07-backend.vercel.app/api/v1/file',
            data: formData,
            method: 'post',
            headers: {
                apiKey: "2ap7JQwe9l58hUtfGsHT",
                "ngrok-skip-browser-warning": true,
            }
        }).then(res => {
            console.log(res);
            setImage(res.data.url);
        })
            .catch(err => console.log(err))
    }

    console.log(image);

    const onFinish = value => {
        const newValue = {

        }
        // dispatch(putStoreInfo(newValue));

        // let newValue;

    }

    return (
        <Row gutter={[30, 30]}>
            <Col>
                <div className='card' >
                    <div className="sider">
                        <Row style={{ textAlign: "center" }}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <input id="input" type="file" onChange={postImg} style={{ display: "none" }} />
                                <label htmlFor="input">
                                    <img src={image || StoreSetting.logo} alt="Something went wrong" />
                                </label>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <h4>{StoreSetting.name}</h4>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <h6>{StoreSetting.id}</h6>
                            </Col>
                        </Row>
                    </div>
                    <div className="mainBody">
                        <h3>Account Settings</h3>
                        <div className='about'>
                            <Form layout='vertical' form={useForm} onFinish={onFinish}>
                                <Row gutter={[30, 0]}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={8} >
                                        <Form.Item name="name" label="Store Name" >
                                            <Input className='input' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={8} >
                                        <Form.Item name="currency" label="Currency" >
                                            <Input className='input' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={8}>
                                        <Form.Item rules={[{ min: 8 }]} name="supportEmail" label="Support Email" >
                                            <Input className='input' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={8}>
                                        <Form.Item rules={[{ min: 7 }]} name="supportPhone" label="Support Phone" >
                                            <Input type='number' className='input' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={8}>
                                        <Form.Item name="address" label="Address" >
                                            <Input className='input' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={8} style={{ display: "flex" , alignItems: "end" }}>
                                        <Form.Item>
                                            <Button style={{ alignItems: "center" }} htmlType='submit' block type='primary'> Update </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}
