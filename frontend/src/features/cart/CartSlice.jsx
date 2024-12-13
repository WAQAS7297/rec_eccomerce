// CartSlice.jsx
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { 
    addToCart, 
    fetchCartByUserId, 
    updateCartItemById, 
    deleteCartItemById, 
    resetCartByUserId  // Added resetCartByUserId function
} from './CartApi';

// Initial state setup
const initialState = {
    status: "idle",
    items: [],
    cartItemAddStatus: "idle",
    cartItemRemoveStatus: "idle",
    errors: null,
    successMessage: null
};

// Thunks (async actions)
export const addToCartAsync = createAsyncThunk('cart/addToCartAsync', async (item) => {
    const addedItem = await addToCart(item);
    return addedItem;
});

export const fetchCartByUserIdAsync = createAsyncThunk('cart/fetchCartByUserIdAsync', async (id) => {
    const items = await fetchCartByUserId(id);
    return items;
});

export const updateCartItemByIdAsync = createAsyncThunk('cart/updateCartItemByIdAsync', async (update) => {
    const updatedItem = await updateCartItemById(update);
    return updatedItem;
});

export const deleteCartItemByIdAsync = createAsyncThunk('cart/deleteCartItemByIdAsync', async (id) => {
    const deletedItem = await deleteCartItemById(id);
    return deletedItem;
});

// New async thunk to reset cart by user ID
export const resetCartByUserIdAsync = createAsyncThunk('cart/resetCartByUserIdAsync', async (userId) => {
    const resetResponse = await resetCartByUserId(userId);  // Clear cart for specific user
    return resetResponse;
});

// Cart slice creation
const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        resetCartItemAddStatus: (state) => {
            state.cartItemAddStatus = 'idle';
        },
        resetCartItemRemoveStatus: (state) => {
            state.cartItemRemoveStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            // Handling addToCartAsync
            .addCase(addToCartAsync.pending, (state) => {
                state.cartItemAddStatus = 'pending';
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.cartItemAddStatus = 'fulfilled';
                state.items.push(action.payload);
            })
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.cartItemAddStatus = 'rejected';
                state.errors = action.error;
            })
            
            // Handling fetchCartByUserIdAsync
            .addCase(fetchCartByUserIdAsync.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchCartByUserIdAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.items = action.payload;
            })
            .addCase(fetchCartByUserIdAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.errors = action.error;
            })
            
            // Handling updateCartItemByIdAsync
            .addCase(updateCartItemByIdAsync.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(updateCartItemByIdAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                const index = state.items.findIndex(item => item._id === action.payload._id);
                state.items[index] = action.payload;
            })
            .addCase(updateCartItemByIdAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.errors = action.error;
            })
            
            // Handling deleteCartItemByIdAsync
            .addCase(deleteCartItemByIdAsync.pending, (state) => {
                state.cartItemRemoveStatus = 'pending';
            })
            .addCase(deleteCartItemByIdAsync.fulfilled, (state, action) => {
                state.cartItemRemoveStatus = 'fulfilled';
                state.items = state.items.filter(item => item._id !== action.payload._id);
            })
            .addCase(deleteCartItemByIdAsync.rejected, (state, action) => {
                state.cartItemRemoveStatus = 'rejected';
                state.errors = action.error;
            })
            
            // Handling resetCartByUserIdAsync (clearing cart)
            .addCase(resetCartByUserIdAsync.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(resetCartByUserIdAsync.fulfilled, (state) => {
                state.status = 'fulfilled';
                state.items = [];  // Empty the cart
            })
            .addCase(resetCartByUserIdAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.errors = action.error;
            });
    }
});

// Exporting selectors to access cart state
export const selectCartStatus = (state) => state.CartSlice.status;
export const selectCartItems = (state) => state.CartSlice.items;
export const selectCartErrors = (state) => state.CartSlice.errors;
export const selectCartSuccessMessage = (state) => state.CartSlice.successMessage;
export const selectCartItemAddStatus = (state) => state.CartSlice.cartItemAddStatus;
export const selectCartItemRemoveStatus = (state) => state.CartSlice.cartItemRemoveStatus;

// Exporting actions (reducers)
export const { resetCartItemAddStatus, resetCartItemRemoveStatus } = cartSlice.actions;

// Exporting the reducer
export default cartSlice.reducer;
