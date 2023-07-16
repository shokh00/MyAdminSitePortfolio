import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as Icon from "./icons/index";
import Router from './router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProduct } from './store/action';
const { Sider } = Layout;

const App = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [Router]);

  const items = [
    { key: "0", onClick: () => navigation("/") },
    {
      key: "1",
      icon: <Icon.category color="lightgray" />,
      label: "Dashboard",
      onClick: () => navigation("/dashboard")
    },
    {
      key: "2",
      icon: <Icon.chart color="lightgray" />,
      label: "Products",
      onClick: () => navigation("/product")
    },
    {
      key: "3",
      icon: <Icon.ticket color="gray" />,
      label: "Orders",
      onClick: () => navigation("/order")
    },
    {
      key: "4",
      icon: <Icon.document color="gray" />,
      label: "Store",
    },
    {
      key: "5",
      icon: <Icon.settings color="gray" />,
      label: "Settings",
      background: "black",
    },
  ]

  return (
    <div className="container">
      <Layout className='layout'>
        <Sider
          className='sider'
          theme='light'
        >
          <Menu defaultSelectedKeys={['0']} mode="inline" items={items} />
        </Sider>
      </Layout>
      <div className='content'>
        <Router />
      </div>
    </div>
  );
};
export default App;