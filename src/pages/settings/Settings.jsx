import { useEffect, useState } from 'react'
import { editId, editNewAddress, editNewCurrency, editNewId, getStore } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Input, Select } from 'antd';
import { v4 } from 'uuid';

export default function Settings() {
  const dispatch = useDispatch();
  const { settings } = useSelector(state => state.app);
  const [address, setAddress] = useState(null);
  const [currency, setCurrency] = useState("");
  console.log(settings);

  useEffect(() => {
    dispatch(getStore());
  }, []);

  const editAddress = () => dispatch(editNewAddress(settings, address));
  const editCurrency = () => dispatch(editNewCurrency(settings , currency));

  return (
    <div className='settings'>
      <Card className='card'>
        <div className="header">
          <h3>Current Address: {settings.address}</h3>
        </div>
        <div className="body">
          <Input onChange={(e) => setAddress(e.target.value)} value={address} />
          <Button type='primary' onClick={editAddress} >Edit</Button>
        </div>
      </Card>
      <Card className='card'>
        <div className="header">
          <h3>Current currency: {settings.currency}</h3>
        </div>
        <div className="body">
          <Select
            defaultValue="$"
            style={{
              width: 120,
            }}
            onChange={(e) => setCurrency(e)}
            options={[
              {
                value: '$',
                label: '$',
              },
              {
                value: '€',
                label: '€',
              },
              {
                value: '£',
                label: '£',
              },
            ]}
          />
          <Button type='primary' onClick={editCurrency} >Edit</Button>
        </div>
      </Card>
    </div>
  )
}