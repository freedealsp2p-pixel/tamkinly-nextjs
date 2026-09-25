import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from './db';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
          include: {
            accessCodes: {
              where: { isActive: true },
            },
          },
        });

        if (!user || !user.password) {
          return null;
        }

        // Check password (bcrypt or legacy SHA256)
        let isValid = false;
        
        if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
          isValid = await bcrypt.compare(credentials.password, user.password);
        } else {
          // Legacy SHA256 support
          const [salt, storedHash] = user.password.split(':');
          if (salt && storedHash) {
            const crypto = await import('crypto');
            const hash = crypto.createHash('sha256').update(credentials.password + salt).digest('hex');
            isValid = hash === storedHash;
            
            if (isValid) {
              const newHashedPassword = await bcrypt.hash(credentials.password, 12);
              await db.user.update({
                where: { id: user.id },
                data: { password: newHashedPassword },
              });
            }
          }
        }

        if (!isValid) {
          return null;
        }

        // Get highest access tier
        const tiers = ['FREE', 'TRIAL', 'BASIC', 'PREMIUM', 'BUNDLE'];
        const userTiers = user.accessCodes.map(code => code.tier);
        const highestTier = userTiers.length > 0 
          ? tiers[Math.max(...userTiers.map(t => tiers.indexOf(t)))]
          : 'FREE';

        // Update last login
        await db.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          accessTier: highestTier,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.accessTier = user.accessTier;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.accessTier = token.accessTier;
      }
      return session;
    },
  },
  pages: {
    signIn: '/account',
    error: '/account',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // JWT secret - MUST be set via environment variable in production
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  // Skip secret validation in development or when no secret is provided
  debug: process.env.NODE_ENV === 'development',
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
