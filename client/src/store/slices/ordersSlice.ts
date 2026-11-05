import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrderRequest, fetchUserOrdersRequest } from '../../services/apiClient';
import type { Order, ShippingAddress } from '../../types';

interface OrdersState {
  items: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  createStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  lastCreated: Order | null;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  status: 'idle',
  createStatus: 'idle',
  lastCreated: null,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchUserOrdersRequest();
      if (res.data) return res.data;
      return rejectWithValue('Failed to fetch orders');
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch orders');
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/create',
  async (
    orderData: {
      items: { product: string; quantity: number }[];
      shippingAddress: ShippingAddress;
      paymentMethod: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await createOrderRequest(orderData);
      if (res.data) return res.data;
      return rejectWithValue(res.error || 'Failed to create order');
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to create order');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetCreateStatus(state) {
      state.createStatus = 'idle';
      state.lastCreated = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(createOrder.pending, (state) => { state.createStatus = 'loading'; state.error = null; })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.lastCreated = action.payload;
        state.items.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { resetCreateStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
