import Review, { type IReview } from '../models/Review';
import Product from '../models/Product';

export interface CreateReviewInput {
  userId: string;
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
}

export async function createReview(input: CreateReviewInput): Promise<IReview> {
  const existing = await Review.findOne({ user: input.userId, product: input.productId });
  if (existing) {
    const err = new Error('You have already reviewed this product');
    (err as any).statusCode = 400;
    throw err;
  }

  const review = await Review.create(input);

  // Update product rating
  const reviews = await Review.find({ product: input.productId });
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await Product.findByIdAndUpdate(input.productId, {
    rating: Math.round(avgRating * 10) / 10,
    numReviews: reviews.length,
  });

  return (await review.populate('user', 'name')).toObject() as IReview;
}

export async function getProductReviews(productId: string): Promise<IReview[]> {
  const reviews = await Review.find({ product: productId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });
  return reviews.map((r) => r.toObject()) as IReview[];
}
