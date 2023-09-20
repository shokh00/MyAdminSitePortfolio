import { Button, Layout, Menu } from 'antd';
import { useNavigate, Router, Outlet } from 'react-router-dom';
import * as Icon from "../icons/index";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreInfo } from '../config/action';
import call from '../config/call';
const { Sider } = Layout;

const MyLayout = () => {
    const url = window.location.pathname;
    const { StoreSetting } = useSelector(state => state.app);
    const navigation = useNavigate();
    const [collapsed, setCollapsed] = useState(window.innerWidth > 710 ? false : true);
    const token = localStorage.getItem("x-auth-token");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStoreInfo());
    }, []);

    const items = [
        {
            key: "1",
            icon: <Icon.category color={url == "/" ? "blue" : "gray"} />,
            label: collapsed ? "" : "Dashboard",
            className: window.location.pathname == "/" ? "ant-menu-item-selected" : "",
            onClick: () => navigation("/")
        },
        {
            key: "2",
            icon: <Icon.chart color={url == "/product" ? "blue" : "gray"} />,
            label: collapsed ? "" : "Products",
            onClick: () => navigation("/product")
        },
        {
            key: "3",
            icon: <Icon.ticket color={url == "/order" ? "blue" : "gray"} />,
            label: collapsed ? "" : "Orders",
            onClick: () => navigation("/order")
        },
        {
            key: "4",
            icon: <Icon.settings color="gray" />,
            label: collapsed ? "" : "Settings",
            onClick: () => navigation("/setting")
        },
    ]

    return (
        <div className="container">
            <Layout className='layout' >
                <Sider
                    className='sider'
                    theme='light'
                    collapsed={collapsed}
                >
                    <div className='siderImg'>
                        <img src={StoreSetting?.image} alt="" />
                    </div>
                    <Menu mode="inline" items={items}
                        defaultSelectedKeys={[url == "/dashboard" ? "1" : url == "/product" ? "2" :
                            url == "/order" ? "3" : url == "/setting" ? "4" : "0"]} />
                </Sider>
            </Layout>
            <div className='content'>
                <Outlet />
            </div>
        </div>
    );
};

export default MyLayout;