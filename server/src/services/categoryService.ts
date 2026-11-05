import Category, { type ICategory } from '../models/Category';

export async function getCategories(): Promise<ICategory[]> {
  const categories = await Category.find().sort({ sortOrder: 1 });
  return categories.map((c) => c.toObject()) as ICategory[];
}

export async function getCategoryBySlug(slug: string): Promise<ICategory> {
  const category = await Category.findOne({ slug });
  if (!category) {
    const err = new Error('Category not found');
    (err as any).statusCode = 404;
    throw err;
  }
  return category.toObject() as ICategory;
}
