import User from '../models/User';
import type { IProduct } from '../models/Product';

export async function getWishlist(userId: string): Promise<IProduct[]> {
  const user = await User.findById(userId).populate('wishlist');
  if (!user) {
    const err = new Error('User not found');
    (err as any).statusCode = 404;
    throw err;
  }
  return (user.wishlist as unknown as IProduct[]).map((p: any) =>
    typeof p.toObject === 'function' ? p.toObject() : p
  );
}

export async function addToWishlist(userId: string, productId: string): Promise<void> {
  await User.findByIdAndUpdate(userId, { $addToSet: { wishlist: productId } });
}

export async function removeFromWishlist(userId: string, productId: string): Promise<void> {
  await User.findByIdAndUpdate(userId, { $pull: { wishlist: productId } });
}
