import { Form, Input, Col, Button, Row, Tag, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUserInfo, putUserInfo } from '../../config/action';

export default function UserSettings() {
    const dispatch = useDispatch();
    const { UserSetting, loadings: { UserSettingLoadign } } = useSelector(selector => selector.app);
    const [useForm] = Form.useForm();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getUserInfo());
        useForm.setFieldsValue({
            fullName: UserSetting.fullName,
            email: UserSetting.email,
            password: UserSetting.password,
            phone: UserSetting.phone
        });
    }, [dispatch]);

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
                "ngrok-skip-browser-warning": true,
            }
        }).then(res => setImage(res.data.url))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    const onFinish = value => {
        let newValue;

        if (image == null) {
            newValue = {
                ...value,
                image: UserSetting.image,
                id: UserSetting.id
            }
        }
        else {
            newValue = {
                ...value,
                image,
                id: UserSetting.id
            }
        }

        dispatch(putUserInfo(newValue));
    }

    return (
        <Row gutter={[30, 30]}>
            <Col>
                <div className='card'>
                    <div className="sider">
                        <Row style={{ textAlign: "center" }}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <input id="input" type="file" onChange={postImg} style={{ display: "none" }} />
                                <label htmlFor="input">
                                    <img src={image || UserSetting.image} height={100} width={150} alt="..." />
                                </label>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <h4>{UserSetting.fullName}</h4>
                            </Col>
                            <Spin spinning={loading} style={{ width: "100%", textAlign: "center", margin: "5px 0 0 0" }} />
                        </Row>
                    </div>
                    <div className="mainBody">
                        <h3>Account Settings</h3>
                        <div className='about'>
                            <Form layout='vertical' form={useForm} onFinish={onFinish}>
                                <Row gutter={[30, 0]}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} >
                                        <Form.Item name="fullName" label="fullName" >
                                            <Input className='input' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} >
                                        <Form.Item name="email" label="Email" >
                                            <Input className='input' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item rules={[{ min: 8 }]} name="password" label="Password" >
                                            <Input className='input' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item rules={[{ min: 7 }]} name="phone" label="Phone" >
                                            <Input addonBefore="+998" type='number' className='input' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ display: "flex", alignItems: "end" }}>
                                        <Form.Item>
                                            <Button style={{ alignItems: "center" }} htmlType='submit' block type='primary' loading={UserSettingLoadign}> Update </Button>
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
