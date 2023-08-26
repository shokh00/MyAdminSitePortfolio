import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'app',
    initialState: {
        products: [],
        isProductOpen: false,
        oneProduct: {},
        UserSetting: [],
        StoreSetting: [],
        OrderHistory: [],
        DashboardInfo: [],
        OneOrderHistory: [],
        loadings: {
            productTableLoading: true,
            saveProductBtn: false,
            UserSettingLoadign: false,
            StoreSettingLoadign: false,
        },
    },
    reducers: {
        updateState: (state, action) => ({ ...state, ...action.payload }),
        updateLoadings: (state, action) => ({
            ...state, loadings: {
                ...state.loadings, ...action.payload
            }
        }),
    },
});

export const { updateState, updateLoadings } = slice.actions;
export default slice.reducer;