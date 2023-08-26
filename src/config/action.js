import { message } from 'antd';
import call from './call';
import { updateState, updateLoadings } from '../store/reducer';
import SignUp from '../pages/SignUp';
import { useDispatch } from 'react-redux';

// Product requests

export const getProduct = () => {
  return dispatch => {
    call.get('/product').then(response => {
      dispatch(updateState({ products: response.data }))
    })
      .catch(err => console.log(err))
      .finally(() => {
        dispatch(updateLoadings({ productTableLoading: false }))
      })
  }
};

export const postProduct = data => {
  return dispatch => {
    dispatch(updateLoadings({ saveProductBtn: true }));
    call.post('/product', data).then(() => {
      dispatch(getProduct());
      dispatch(updateState({ isProductOpen: false }));
      message.success('Success');
    })
      .catch(err => console.log(err))
      .finally(() => dispatch(updateLoadings({ saveProductBtn: false })))
  }
};

export const remakeProduct = data => {
  return dispatch => {
    dispatch(updateLoadings({ saveProductBtn: true }));
    call.put(`/product/${data.id}`, data)
      .then(() => {
        dispatch(getProduct())
        dispatch(updateState({ isProductOpen: false }))
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(updateLoadings({ saveProductBtn: false })));
  }
}

export const deleteProduct = id => {
  return dispatch => {
    call.delete(`product/${id}`).then(() => dispatch(getProduct()))
      .catch(err => console.log(err))
  }
}

export const SwitchStatus = (item) => {
  return dispatch => {
    call.put(`/product/status/${item.id}`, { status: !item.status }).then(res => {
      dispatch(getProduct());
    })
  }
}

// Order requests

export const getOrderHistory = () => {
  return dispatch => {
    call.get("/order")
      .then(res => dispatch(updateState({ OrderHistory: res.data })));
  }
}

export const getOneOrder = (id) => {
  return dispatch => {
    call.get(`/order/${id}`)
      .then(res => dispatch(updateState({ OneOrderHistory: res.data })));
  }
};

export const deleteOrder = id => {
  return dispatch => {
    call.delete(`/order/${id}`)
      .then(() => {
        dispatch(getOrderHistory())
      })
  }
}

export const getDashboardInfo = () => {
  return dispatch => {
    call.get("/dashboard")
      .then(res => dispatch(updateState({ DashboardInfo: res.data })));
  }
}

//!! Setting request

export const getUserInfo = () => {
  return dispatch => {
    call.get("/auth")
      .then(res => dispatch(updateState({
        UserSetting: res.data
      })))
  }
};

export const putUserInfo = data => {
  return dispatch => {
    dispatch(updateLoadings({ UserSettingLoadign: true }));
    call.put("/auth", data)
      .then(() => {
        message.success('Success');
        dispatch(getUserInfo())
      })
      .finally(() => dispatch(updateLoadings({ UserSettingLoadign: false })))
  };
};


export const getStoreInfo = () => {
  return dispatch => {
    call.get("/store")
      .then(res => {
        dispatch(updateState({
          StoreSetting: res.data
        }))
      })
  }
};

export const putStoreInfo = data => {
  return dispatch => {
    dispatch(updateLoadings({ StoreSettingLoadign: true }));
    call.put(`/store/${data.id}`)
      .then(() => {
        message.success('Success');
        dispatch(getStoreInfo());
      })
      .finally(() => dispatch(updateLoadings({ StoreSettingLoadign: false })));
  };
};