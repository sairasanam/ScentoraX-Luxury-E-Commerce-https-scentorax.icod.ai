import Order, { type IOrder } from '../models/Order';
import Product from '../models/Product';

export interface CreateOrderInput {
  userId: string;
  items: { product: string; quantity: number }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}

export async function createOrder(input: CreateOrderInput): Promise<IOrder> {
  const orderItems = [];
  let subtotal = 0;

  for (const item of input.items) {
    const product = await Product.findById(item.product);
    if (!product) {
      const err = new Error(`Product not found: ${item.product}`);
      (err as any).statusCode = 404;
      throw err;
    }
    if (product.stock < item.quantity) {
      const err = new Error(`Insufficient stock for ${product.name}`);
      (err as any).statusCode = 400;
      throw err;
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      image: product.images[0] || '',
    });

    subtotal += product.price * item.quantity;

    await Product.findByIdAndUpdate(product._id, { $inc: { stock: -item.quantity } });
  }

  const shippingCost = subtotal >= 3000 ? 0 : 250;
  const tax = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + shippingCost + tax;

  const order = await Order.create({
    user: input.userId,
    items: orderItems,
    shippingAddress: input.shippingAddress,
    paymentMethod: input.paymentMethod,
    totalAmount,
    tax,
    shippingCost,
  });

  return order.toObject() as IOrder;
}

export async function getUserOrders(userId: string): Promise<IOrder[]> {
  const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate('items.product', 'name slug images');
  return orders.map((o) => o.toObject()) as IOrder[];
}

export async function getOrderById(orderId: string, userId: string): Promise<IOrder> {
  const order = await Order.findOne({ _id: orderId, user: userId }).populate('items.product', 'name slug images');
  if (!order) {
    const err = new Error('Order not found');
    (err as any).statusCode = 404;
    throw err;
  }
  return order.toObject() as IOrder;
}

export async function updateOrderStatus(orderId: string, status: string): Promise<IOrder> {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus: status },
    { new: true }
  );
  if (!order) {
    const err = new Error('Order not found');
    (err as any).statusCode = 404;
    throw err;
  }
  return order.toObject() as IOrder;
}
