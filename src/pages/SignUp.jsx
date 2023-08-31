import { Button, Card, Form, Input, message } from 'antd'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import call from '../config/call';

export default function SignUp(props) {
    const navigation = useNavigate();
    const [form] = Form.useForm();
    const [emailDomain, setEmailDomain] = useState("");
    // const dispatch = useDispatch();
    // const token = localStorage.getItem("token");

    useEffect(() => {
        call.get(`/login`, {
            validateStatus: (status) => {
                return status < 500; // Resolve only if the status code is less than 500
            }
        }).then(res => {
            if (!res.data.success) {
                return
            } else {
                navigation("/dashboard");
            }
        })
    }, []);

    const onFinish = value => {
        call.post("/login", value, {
        })
            .then(res => {
                localStorage.setItem("token", res.headers["x-auth-token"]); 
                message.success("Xush kelibsiz")
                // navigation("/dashboard")
            })
            .catch(err => {
                if (err.response.status == 422) {
                    message.error("email notog`ri")
                }
                else if (err.response.data.message == "Password error") {
                    message.error("password notog`ri")
                }
            });
    }

    return (
        <div className='Sign'>
            <Card id='card'>
                <img src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                <h2>Sign in to your account</h2>
                <Form form={form} onFinish={onFinish} layout='vertical' style={{ margin: "20px 0 0 0" }}>
                    <Form.Item name={"email"} rules={[{ required: true }]} label={"Email address"}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={"password"} rules={[{ required: true, min: 4 }]} label={"Password"}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button block type='primary' htmlType='submit'> Sign In </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
