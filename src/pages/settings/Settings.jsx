import { Tabs } from 'antd';
import StoreSettings from './StoreSettings';
import UserSettings from './UserSettings';

export default function Settings() {
  const items = [
    {
      key: '1',
      label: `User settings`,
      children: <UserSettings />,
    },
    {
      key: '2',
      label: `Store settings`,
      children: <StoreSettings />,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className='settings' style={{display: "flex" , flexDirection: "column"}}>
      <h3> Sozlamalar </h3>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}
