import Product from '../models/Product';
import type { FilterQuery } from 'mongoose';
import type { IProduct } from '../models/Product';

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'rating';
  page?: number;
  limit?: number;
}

export async function getProducts(filters: ProductFilters): Promise<{
  products: IProduct[];
  total: number;
  page: number;
  pages: number;
}> {
  const query: FilterQuery<IProduct> = { isActive: true };

  if (filters.category) {
    const Category = (await import('../models/Category')).default;
    const cat = await Category.findOne({ slug: filters.category });
    if (cat) query.category = cat._id;
  }

  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } },
    ];
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    query.price = {};
    if (filters.minPrice !== undefined) query.price.$gte = filters.minPrice;
    if (filters.maxPrice !== undefined) query.price.$lte = filters.maxPrice;
  }

  let sortObj: Record<string, 1 | -1> = { createdAt: -1 };
  switch (filters.sort) {
    case 'price-asc': sortObj = { price: 1 }; break;
    case 'price-desc': sortObj = { price: -1 }; break;
    case 'rating': sortObj = { rating: -1 }; break;
    default: sortObj = { createdAt: -1 };
  }

  const page = Math.max(1, filters.page || 1);
  const limit = Math.min(50, Math.max(1, filters.limit || 12));
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate('category', 'name slug')
      .sort(sortObj)
      .skip(skip)
      .limit(limit),
    Product.countDocuments(query),
  ]);

  return {
    products: products.map((p) => p.toObject()) as IProduct[],
    total,
    page,
    pages: Math.ceil(total / limit),
  };
}

export async function getProductBySlug(slug: string): Promise<IProduct> {
  const product = await Product.findOne({ slug, isActive: true }).populate('category', 'name slug');
  if (!product) {
    const err = new Error('Product not found');
    (err as any).statusCode = 404;
    throw err;
  }
  return product.toObject() as IProduct;
}

export async function getFeaturedProducts(limit = 4): Promise<IProduct[]> {
  const products = await Product.find({ isFeatured: true, isActive: true })
    .populate('category', 'name slug')
    .sort({ createdAt: -1 })
    .limit(limit);
  return products.map((p) => p.toObject()) as IProduct[];
}

export async function getBestsellers(limit = 4): Promise<IProduct[]> {
  const products = await Product.find({ isActive: true })
    .populate('category', 'name slug')
    .sort({ numReviews: -1, rating: -1 })
    .limit(limit);
  return products.map((p) => p.toObject()) as IProduct[];
}

export async function getRelatedProducts(productId: string, categoryId: string, limit = 4): Promise<IProduct[]> {
  const products = await Product.find({
    _id: { $ne: productId },
    category: categoryId,
    isActive: true,
  })
    .populate('category', 'name slug')
    .sort({ rating: -1 })
    .limit(limit);
  return products.map((p) => p.toObject()) as IProduct[];
}
