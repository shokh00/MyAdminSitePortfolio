import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as Icon from "./icons/index";
import Router from './router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProduct } from './store/action';
const { Sider } = Layout;

const App = () => {
  const url = window.location.pathname;
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    dispatch(getProduct());
    if (window.innerWidth < 600) {
      setCollapsed(true);
    }
  }, [Router]);

  const items = [
    { key: "0", onClick: () => navigation("/") },
    {
      key: "1",
      icon: <Icon.category color={url == "/dashboard" ? "blue" : "gray"} />,
      label: collapsed ? "" : "Dashboard",
      onClick: () => navigation("/dashboard")
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
      icon: <Icon.document color={url == "/store" ? "blue" : "gray"} />,
      label: collapsed ? "" : "Store",
      onClick: () => navigation("/store")
    },
    {
      key: "5",
      icon: <Icon.settings color="gray" />,
      label: collapsed ? "" : "Settings",
      onClick: () => navigation("/setting")
    },
  ]

  return (
    <div className="container">
      <Layout className='layout'>
        <Sider
          className='sider'
          theme='light'
          collapsed={collapsed}
        >
          <Menu mode="inline" items={items}
            defaultSelectedKeys={[url == "/dashboard" ? "1" : url == "/product" ? "2" :
              url == "/order" ? "3" : url == "/store" ? "4" : url == "/setting" ? "5" : "0"]} />
        </Sider>
      </Layout>
      <div className='content'>
        <Router />
      </div>
    </div>
  );
};
export default App;