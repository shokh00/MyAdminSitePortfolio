import call from '../config/call';
import { updateState } from './reducer';

export const getProduct = () => {
  return dispatch => {
    call.get('/product').then(response => {
      dispatch(updateState({ products: response.data }))
    })
      .catch(err => console.log(err))
      .finally(() => dispatch(updateState({ loadings: { tableLoading: false } })))
  }
};

export const postProduct = data => {
  return dispatch => {
    dispatch(updateState({ loadings: {saveBtnLoading: true }}))
    call.post('/product', data).then(() => {
      dispatch(getProduct());
      dispatch(updateState({ isProductOpen: false }))
    })
      .catch(err => console.log(err))
      .finally(() => dispatch(updateState({ loadings: { saveBtnLoading: false } })))
  }
};

export const remakeProduct = data => {
  return dispatch => {
    call.put(`/product/${data.id}`, data)
      .then(() => {
        dispatch(getProduct())
        dispatch(updateState({ isProductOpen: false }))
      })
      .catch(err => console.log(err));
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