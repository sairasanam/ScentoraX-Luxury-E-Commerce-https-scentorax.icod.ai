import type { Request, Response, NextFunction } from 'express';
import * as productService from '../services/productService';

export async function getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, search, sort, page, limit, minPrice, maxPrice } = req.query;
    const result = await productService.getProducts({
      category: category as string | undefined,
      search: search as string | undefined,
      sort: sort as any,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function getProductBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const product = await productService.getProductBySlug(req.params.slug);
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}

export async function getFeatured(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const products = await productService.getFeaturedProducts();
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
}

export async function getBestsellers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const products = await productService.getBestsellers();
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
}
