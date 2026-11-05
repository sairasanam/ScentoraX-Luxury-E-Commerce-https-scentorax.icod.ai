import type { Response, NextFunction } from 'express';
import * as orderService from '../services/orderService';
import type { AuthRequest } from '../middleware/authMiddleware';

export async function createOrder(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    if (!items || !shippingAddress || !paymentMethod) {
      res.status(400).json({ success: false, error: 'Items, shipping address, and payment method are required', statusCode: 400 });
      return;
    }
    const order = await orderService.createOrder({
      userId: req.user!._id.toString(),
      items,
      shippingAddress,
      paymentMethod,
    });
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}

export async function getUserOrders(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const orders = await orderService.getUserOrders(req.user!._id.toString());
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
}

export async function getOrderById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const order = await orderService.getOrderById(req.params.id, req.user!._id.toString());
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}

export async function updateOrderStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status } = req.body;
    if (!status) {
      res.status(400).json({ success: false, error: 'Status is required', statusCode: 400 });
      return;
    }
    const order = await orderService.updateOrderStatus(req.params.id, status);
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}
