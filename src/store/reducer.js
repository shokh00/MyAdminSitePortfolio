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
        loadings: {
            tableLoading: true,
            saveBtnLoading: false,
        },
    },
    reducers: {
        updateState: (state, action) => ({ ...state, ...action.payload }),
    }
});

export const { updateState } = slice.actions;
export default slice.reducer;