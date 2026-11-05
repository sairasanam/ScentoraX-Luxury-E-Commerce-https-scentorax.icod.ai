import axios from 'axios';
import type {
  ApiResponse,
  AuthResponse,
  User,
  Product,
  Category,
  PaginatedProducts,
  Order,
  Review,
  ProductFilters,
} from '@/types';

// VITE_API_URL already ends with /api — NEVER append another /api to paths.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token from localStorage
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;

// ─── Auth ──────────────────────────────────────────────────────────────────────
export async function loginRequest(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
  const { data } = await apiClient.post('/auth/login', { email, password });
  return data;
}

export async function registerRequest(name: string, email: string, password: string): Promise<ApiResponse<AuthResponse>> {
  const { data } = await apiClient.post('/auth/register', { name, email, password });
  return data;
}

export async function getMeRequest(): Promise<ApiResponse<User>> {
  const { data } = await apiClient.get('/auth/me');
  return data;
}

// ─── Products ──────────────────────────────────────────────────────────────────
export async function fetchProductsRequest(filters?: ProductFilters): Promise<ApiResponse<PaginatedProducts>> {
  const params = new URLSearchParams();
  if (filters?.category) params.set('category', filters.category);
  if (filters?.search) params.set('search', filters.search);
  if (filters?.sort) params.set('sort', filters.sort);
  if (filters?.page) params.set('page', String(filters.page));
  if (filters?.limit) params.set('limit', String(filters.limit));
  if (filters?.minPrice !== undefined) params.set('minPrice', String(filters.minPrice));
  if (filters?.maxPrice !== undefined) params.set('maxPrice', String(filters.maxPrice));
  const { data } = await apiClient.get(`/products?${params.toString()}`);
  return data;
}

export async function fetchProductBySlugRequest(slug: string): Promise<ApiResponse<Product>> {
  const { data } = await apiClient.get(`/products/${slug}`);
  return data;
}

export async function fetchFeaturedRequest(): Promise<ApiResponse<Product[]>> {
  const { data } = await apiClient.get('/products/featured');
  return data;
}

export async function fetchBestsellersRequest(): Promise<ApiResponse<Product[]>> {
  const { data } = await apiClient.get('/products/bestsellers');
  return data;
}

// ─── Categories ────────────────────────────────────────────────────────────────
export async function fetchCategoriesRequest(): Promise<ApiResponse<Category[]>> {
  const { data } = await apiClient.get('/categories');
  return data;
}

// ─── Orders ────────────────────────────────────────────────────────────────────
export async function createOrderRequest(orderData: {
  items: { product: string; quantity: number }[];
  shippingAddress: { street: string; city: string; state: string; postalCode: string; country: string };
  paymentMethod: string;
}): Promise<ApiResponse<Order>> {
  const { data } = await apiClient.post('/orders', orderData);
  return data;
}

export async function fetchUserOrdersRequest(): Promise<ApiResponse<Order[]>> {
  const { data } = await apiClient.get('/orders');
  return data;
}

export async function fetchOrderByIdRequest(id: string): Promise<ApiResponse<Order>> {
  const { data } = await apiClient.get(`/orders/${id}`);
  return data;
}

// ─── Reviews ───────────────────────────────────────────────────────────────────
export async function createReviewRequest(reviewData: {
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
}): Promise<ApiResponse<Review>> {
  const { data } = await apiClient.post('/reviews', reviewData);
  return data;
}

export async function fetchProductReviewsRequest(productId: string): Promise<ApiResponse<Review[]>> {
  const { data } = await apiClient.get(`/reviews/product/${productId}`);
  return data;
}

// ─── User / Wishlist ──────────────────────────────────────────────────────────
export async function updateProfileRequest(profileData: Partial<Pick<User, 'name' | 'phone' | 'address'>>): Promise<ApiResponse<User>> {
  const { data } = await apiClient.put('/users/profile', profileData);
  return data;
}

export async function fetchWishlistRequest(): Promise<ApiResponse<Product[]>> {
  const { data } = await apiClient.get('/users/wishlist');
  return data;
}

export async function addToWishlistRequest(productId: string): Promise<ApiResponse<void>> {
  const { data } = await apiClient.post(`/users/wishlist/${productId}`);
  return data;
}

export async function removeFromWishlistRequest(productId: string): Promise<ApiResponse<void>> {
  const { data } = await apiClient.delete(`/users/wishlist/${productId}`);
  return data;
}
