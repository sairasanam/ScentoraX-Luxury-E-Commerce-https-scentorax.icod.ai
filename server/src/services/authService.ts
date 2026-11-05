import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { type IUser } from '../models/User';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export async function registerUser(input: RegisterInput): Promise<{ user: Omit<IUser, 'password'>; token: string }> {
  const existing = await User.findOne({ email: input.email.toLowerCase() });
  if (existing) {
    const err = new Error('Email already registered');
    (err as any).statusCode = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  const user = await User.create({
    name: input.name,
    email: input.email.toLowerCase(),
    password: hashedPassword,
  });

  const token = generateToken(user._id.toString());
  const userWithoutPassword = user.toObject();
  delete (userWithoutPassword as any).password;

  return { user: userWithoutPassword as Omit<IUser, 'password'>, token };
}

export async function loginUser(input: LoginInput): Promise<{ user: Omit<IUser, 'password'>; token: string }> {
  const user = await User.findOne({ email: input.email.toLowerCase() });
  if (!user) {
    const err = new Error('Invalid email or password');
    (err as any).statusCode = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(input.password, user.password);
  if (!isMatch) {
    const err = new Error('Invalid email or password');
    (err as any).statusCode = 401;
    throw err;
  }

  const token = generateToken(user._id.toString());
  const userWithoutPassword = user.toObject();
  delete (userWithoutPassword as any).password;

  return { user: userWithoutPassword as Omit<IUser, 'password'>, token };
}

export async function getUserById(userId: string): Promise<Omit<IUser, 'password'>> {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    const err = new Error('User not found');
    (err as any).statusCode = 404;
    throw err;
  }
  return user.toObject() as Omit<IUser, 'password'>;
}

export async function updateProfile(
  userId: string,
  data: Partial<Pick<IUser, 'name' | 'phone' | 'address'>>
): Promise<Omit<IUser, 'password'>> {
  const user = await User.findByIdAndUpdate(userId, data, { new: true }).select('-password');
  if (!user) {
    const err = new Error('User not found');
    (err as any).statusCode = 404;
    throw err;
  }
  return user.toObject() as Omit<IUser, 'password'>;
}

export async function seedDemoUsers(): Promise<void> {
  const { DEMO_USERS } = await import('../config/demoUsers');
  for (const u of DEMO_USERS) {
    const password = await bcrypt.hash(u.password, 10);
    await User.updateOne(
      { email: u.email },
      { $set: { email: u.email, password, role: u.role, name: u.name } },
      { upsert: true }
    );
  }
  console.log('[SEED] Demo users seeded');
}

function generateToken(userId: string): string {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
}
