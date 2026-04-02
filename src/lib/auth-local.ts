/**
 * Local Authentication Service
 * Handles user authentication locally with NextAuth and Prisma
 */

import { db } from './db';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: Date;
}

interface AuthResult {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

/**
 * Authenticate user locally with email and password
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    // Find user in local database
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.password) {
      return {
        success: false,
        error: 'Invalid email or password',
      };
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return {
        success: false,
        error: 'Invalid email or password',
      };
    }

    // Update last login
    await db.user.update({
      where: { id: user.id },
      data: { updatedAt: new Date() },
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed',
    };
  }
}

/**
 * Register a new user locally
 */
export async function registerUser(
  email: string,
  password: string,
  name?: string
): Promise<AuthResult> {
  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return {
        success: false,
        error: 'An account with this email already exists',
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await db.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name?.trim() || null,
        role: 'CUSTOMER',
      },
    });

    // Check for existing access codes
    const existingCodes = await db.appAccess.findMany({
      where: { email: email.toLowerCase() },
    });

    // Link existing access codes to new user
    if (existingCodes.length > 0) {
      await db.appAccess.updateMany({
        where: { email: email.toLowerCase() },
        data: { userId: user.id },
      });
    }

    // Create user progress
    await db.userProgress.create({
      data: { userId: user.id },
    }).catch(() => {});

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Registration failed',
    };
  }
}

/**
 * Generate a password reset token
 */
export async function generateResetToken(email: string): Promise<string | null> {
  try {
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return null; // Don't reveal if user exists
    }

    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour

    // Store token (you might need to add a PasswordReset table to schema)
    // For now, we'll just return the token
    return token;
  } catch {
    return null;
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: string): Promise<User | null> {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  } catch {
    return null;
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  } catch {
    return null;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  data: { name?: string; email?: string }
): Promise<User | null> {
  try {
    const user = await db.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: data.email?.toLowerCase(),
        updatedAt: new Date(),
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  } catch {
    return null;
  }
}

/**
 * Change user password
 */
export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.password) {
      return { success: false, error: 'User not found' };
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return { success: false, error: 'Current password is incorrect' };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await db.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        updatedAt: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to change password',
    };
  }
}

// Local Auth Service
const LocalAuthService = {
  authenticateUser,
  registerUser,
  generateResetToken,
  getUserById,
  getUserByEmail,
  updateUserProfile,
  changePassword,
};

export default LocalAuthService;
