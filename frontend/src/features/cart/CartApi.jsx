// CartApi.js

import { axiosi } from '../../config/axios';

// Existing functions...
export const addToCart = async (item) => {
    try {
        const res = await axiosi.post('/cart', item);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchCartByUserId = async (id) => {
    try {
        const res = await axiosi.get(`/cart/user/${id}`);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateCartItemById = async (update) => {
    try {
        const res = await axiosi.patch(`/cart/${update._id}`, update);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteCartItemById = async (id) => {
    try {
        const res = await axiosi.delete(`/cart/${id}`);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

// New function to reset the user's cart
export const resetCartByUserId = async (userId) => {
    try {
        const res = await axiosi.delete(`/cart/user/${userId}`);
        return res.data;  // Assuming the API supports this kind of operation
    } catch (error) {
        throw error.response.data;
    }
};
