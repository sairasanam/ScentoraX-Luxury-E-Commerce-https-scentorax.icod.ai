import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProductsRequest,
  fetchFeaturedRequest,
  fetchBestsellersRequest,
  fetchCategoriesRequest,
} from '../../services/apiClient';
import type { Product, Category, ProductFilters, PaginatedProducts } from '../../types';

interface ProductsState {
  items: Product[];
  featured: Product[];
  bestsellers: Product[];
  categories: Category[];
  total: number;
  page: number;
  pages: number;
  filters: ProductFilters;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  featuredStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  categoriesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  featured: [],
  bestsellers: [],
  categories: [],
  total: 0,
  page: 1,
  pages: 1,
  filters: {},
  status: 'idle',
  featuredStatus: 'idle',
  categoriesStatus: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (filters: ProductFilters | undefined, { rejectWithValue }) => {
    try {
      const res = await fetchProductsRequest(filters);
      if (res.data) return res.data;
      return rejectWithValue('Failed to fetch products');
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch products');
    }
  }
);

export const fetchFeatured = createAsyncThunk(
  'products/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchFeaturedRequest();
      if (res.data) return res.data;
      return rejectWithValue('Failed to fetch featured');
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch featured');
    }
  }
);

export const fetchBestsellers = createAsyncThunk(
  'products/fetchBestsellers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchBestsellersRequest();
      if (res.data) return res.data;
      return rejectWithValue('Failed to fetch bestsellers');
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch bestsellers');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchCategoriesRequest();
      if (res.data) return res.data;
      return rejectWithValue('Failed to fetch categories');
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch categories');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = {};
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchFeatured.pending, (state) => { state.featuredStatus = 'loading'; })
      .addCase(fetchFeatured.fulfilled, (state, action) => {
        state.featuredStatus = 'succeeded';
        state.featured = action.payload;
      })
      .addCase(fetchFeatured.rejected, (state) => { state.featuredStatus = 'failed'; })
      .addCase(fetchBestsellers.fulfilled, (state, action) => {
        state.bestsellers = action.payload;
      })
      .addCase(fetchCategories.pending, (state) => { state.categoriesStatus = 'loading'; })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => { state.categoriesStatus = 'failed'; });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
