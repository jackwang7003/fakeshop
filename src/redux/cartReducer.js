
import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';


const initialState = {
    products: [],
   
};

export const fetchCartByUserId = createAsyncThunk('cart/fetchCartByUserId', async (userId) => {
    const res = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
    const data = await res.json();
    const productsId = data[0].products;
    
    return productsId;
    
});

export const fetchProductById = createAsyncThunk('cart/fetchProductById', async (productId) => {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await res.json();
    return data;
});

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.products.find((item) => item.productId === action.payload.productId);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
              // console.log(action.payload.productId);
                state.products.push(action.payload);    
            }
             //console.log(state.products);
        },

        



        removeFromCart: (state, action) => {
            state.products = state.products.filter((item) => item.productId !== action.payload);
        },
        resetCart: (state) => {
            state.products = [];
        }
    },

    
});

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;

export default cartSlice.reducer;