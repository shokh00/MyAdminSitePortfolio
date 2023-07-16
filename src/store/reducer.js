import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'app',
    initialState: {
        products: [],
        isProductOpen: false,
        oneProduct: {},
        loadings: {
            tableLoading: true,
            saveBtnLoading: false,
        }
    },
    reducers: {
        updateState: (state, action) => ({ ...state, ...action.payload }),
        switchStatus: (state, action) => ({ ...state, ...state.products.status, status: !state.products.status })
    }
});

export const { updateState } = slice.actions;
export default slice.reducer;