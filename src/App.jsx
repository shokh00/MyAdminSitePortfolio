import { Layout, Menu, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as Icon from "./icons/index";
import Router from './router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, getStoreInfo, getUserInfo } from './store/action';
const { Sider } = Layout;

const App = () => {
  const url = window.location.pathname;
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { UserSetting } = useSelector(selector => selector.app);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getUserInfo());
    dispatch(getStoreInfo());
  }, [Router]);

  const items = [
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
      icon: <Icon.settings color="gray" />,
      label: collapsed ? "" : "Settings",
      onClick: () => navigation("/setting")
    },
  ]

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
    if (width < 768) {
      setCollapsed(true);
    }
    else {
      setCollapsed(false);
    }
  })

  return (
    <div className="container">
      <Layout className='layout'>
        <Sider
          className='sider'
          theme='light'
          collapsed={collapsed}
        >
          <div style={{ textAlign: "center", padding: '0px 6px' }}>
            <svg width="50" height="61" viewBox="0 0 60 61" fill="none" style={{margin: "0 0 10px 0"}} xmlns="http://www.w3.org/2000/svg">
              <path d="M29.6448 4.18053L23.7949 1V13.6653L29.6448 15.7099L35.5231 13.6653V1L29.6448 4.18053Z" fill="#3A36DB" stroke="#3A36DB" strokeWidth="0.0567951" />
              <path d="M29.6166 14.6023L9 4.29395V17.0445L29.6166 27.8923L51 17.0445V4.29395L29.6166 14.6023Z" fill="#3A36DB" stroke="#3A36DB" strokeWidth="0.0567951" />
              <path d="M29.9865 8.83785L17.0088 2.3916V14.5458L29.9865 20.9352L42.5098 14.1482V2.3916L29.9865 8.83785Z" fill="#3A36DB" stroke="#3A36DB" strokeWidth="0.0567951" />
              <path d="M4.62 54L0.55 38.6H3.564L6.336 50.854L9.592 38.6H12.694L15.862 50.854L18.634 38.6H21.67L17.49 54H14.146L11.088 42.582L7.942 54H4.62ZM27.7207 54.264C26.6647 54.264 25.7114 54.022 24.8607 53.538C24.0247 53.054 23.3574 52.3867 22.8587 51.536C22.3747 50.6707 22.1327 49.6733 22.1327 48.544C22.1327 47.4147 22.382 46.4247 22.8807 45.574C23.3794 44.7087 24.0467 44.034 24.8827 43.55C25.7334 43.066 26.6867 42.824 27.7427 42.824C28.784 42.824 29.7227 43.066 30.5587 43.55C31.4094 44.034 32.0767 44.7087 32.5607 45.574C33.0594 46.4247 33.3087 47.4147 33.3087 48.544C33.3087 49.6733 33.0594 50.6707 32.5607 51.536C32.0767 52.3867 31.4094 53.054 30.5587 53.538C29.708 54.022 28.762 54.264 27.7207 54.264ZM27.7207 51.822C28.454 51.822 29.092 51.5507 29.6347 51.008C30.1774 50.4507 30.4487 49.6293 30.4487 48.544C30.4487 47.4587 30.1774 46.6447 29.6347 46.102C29.092 45.5447 28.4614 45.266 27.7427 45.266C26.9947 45.266 26.3494 45.5447 25.8067 46.102C25.2787 46.6447 25.0147 47.4587 25.0147 48.544C25.0147 49.6293 25.2787 50.4507 25.8067 51.008C26.3494 51.5507 26.9874 51.822 27.7207 51.822ZM35.8265 54V43.088H38.3125L38.5325 44.936C38.8698 44.2907 39.3538 43.7773 39.9845 43.396C40.6298 43.0147 41.3852 42.824 42.2505 42.824C43.5998 42.824 44.6485 43.2493 45.3965 44.1C46.1445 44.9507 46.5185 46.1973 46.5185 47.84V54H43.7025V48.104C43.7025 47.1653 43.5118 46.4467 43.1305 45.948C42.7492 45.4493 42.1552 45.2 41.3485 45.2C40.5565 45.2 39.9038 45.4787 39.3905 46.036C38.8918 46.5933 38.6425 47.3707 38.6425 48.368V54H35.8265ZM53.7213 54.264C52.7533 54.264 51.9026 54.11 51.1693 53.802C50.4359 53.4793 49.8493 53.0393 49.4093 52.482C48.9693 51.9247 48.7053 51.2793 48.6173 50.546H51.4553C51.5433 50.9713 51.7779 51.338 52.1593 51.646C52.5553 51.9393 53.0613 52.086 53.6773 52.086C54.2933 52.086 54.7406 51.9613 55.0193 51.712C55.3126 51.4627 55.4593 51.1767 55.4593 50.854C55.4593 50.3847 55.2539 50.0693 54.8433 49.908C54.4326 49.732 53.8606 49.5633 53.1273 49.402C52.6579 49.2993 52.1813 49.1747 51.6973 49.028C51.2133 48.8813 50.7659 48.698 50.3553 48.478C49.9593 48.2433 49.6366 47.95 49.3873 47.598C49.1379 47.2313 49.0133 46.784 49.0133 46.256C49.0133 45.288 49.3946 44.474 50.1573 43.814C50.9346 43.154 52.0199 42.824 53.4133 42.824C54.7039 42.824 55.7306 43.1247 56.4933 43.726C57.2706 44.3273 57.7326 45.156 57.8793 46.212H55.2173C55.0559 45.4053 54.4473 45.002 53.3913 45.002C52.8633 45.002 52.4526 45.1047 52.1593 45.31C51.8806 45.5153 51.7413 45.772 51.7413 46.08C51.7413 46.4027 51.9539 46.6593 52.3793 46.85C52.8046 47.0407 53.3693 47.2167 54.0733 47.378C54.8359 47.554 55.5326 47.752 56.1633 47.972C56.8086 48.1773 57.3219 48.4927 57.7033 48.918C58.0846 49.3287 58.2753 49.9227 58.2753 50.7C58.2899 51.3747 58.1139 51.9833 57.7473 52.526C57.3806 53.0687 56.8526 53.494 56.1633 53.802C55.4739 54.11 54.6599 54.264 53.7213 54.264Z" fill="#3A36DB" />
            </svg>
          </div>
          <Menu mode="inline" items={items}
            defaultSelectedKeys={[url == "/dashboard" ? "1" : url == "/product" ? "2" :
              url == "/order" ? "3" : "4"]} />
        </Sider>
      </Layout>
      <div className='content'>
        <Router />
      </div>
    </div>
  );
};
export default App;