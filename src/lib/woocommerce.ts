/**
 * WooCommerce REST API Client
 * Handles all communication with WooCommerce store
 */

import crypto from 'crypto';

// WooCommerce API Configuration
const WC_URL = process.env.WOOCOMMERCE_URL || 'https://tamkinly.com';
const WC_CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

// Types
export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  categories: { id: number; name: string; slug: string }[];
  images: { id: number; src: string; alt: string }[];
  attributes: { id: number; name: string; options: string[] }[];
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  status: 'publish' | 'draft' | 'private';
  featured: boolean;
  virtual: boolean;
  downloadable: boolean;
  downloads?: { id: string; name: string; file: string }[];
}

export interface WooOrder {
  id: number;
  status: 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled' | 'refunded' | 'failed';
  date_created: string;
  date_completed?: string;
  total: string;
  currency: string;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    city: string;
    country: string;
  };
  line_items: {
    id: number;
    name: string;
    product_id: number;
    quantity: number;
    price: number;
    total: string;
  }[];
  customer_id: number;
}

export interface WooCustomer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

// Base fetch function with authentication
async function wooFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${WC_URL}/wp-json/wc/v3${endpoint}`;
  
  // Create Basic Auth header
  const credentials = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${credentials}`,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`WooCommerce API Error: ${response.status} - ${error}`);
    throw new Error(`WooCommerce API Error: ${response.status}`);
  }

  return response.json();
}

// Products API
export const WooCommerceProducts = {
  // Get all products
  async list(params: {
    page?: number;
    per_page?: number;
    search?: string;
    category?: number;
    featured?: boolean;
    status?: 'publish' | 'draft' | 'private';
  } = {}): Promise<WooProduct[]> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    return wooFetch<WooProduct[]>(`/products?${searchParams.toString()}`);
  },

  // Get single product
  async get(id: number): Promise<WooProduct> {
    return wooFetch<WooProduct>(`/products/${id}`);
  },

  // Get product by slug
  async getBySlug(slug: string): Promise<WooProduct[]> {
    return wooFetch<WooProduct[]>(`/products?slug=${slug}`);
  },
};

// Orders API
export const WooCommerceOrders = {
  // Get all orders
  async list(params: {
    page?: number;
    per_page?: number;
    status?: string;
    customer?: number;
  } = {}): Promise<WooOrder[]> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    return wooFetch<WooOrder[]>(`/orders?${searchParams.toString()}`);
  },

  // Get single order
  async get(id: number): Promise<WooOrder> {
    return wooFetch<WooOrder>(`/orders/${id}`);
  },

  // Create order
  async create(data: Partial<WooOrder>): Promise<WooOrder> {
    return wooFetch<WooOrder>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update order status
  async updateStatus(id: number, status: WooOrder['status']): Promise<WooOrder> {
    return wooFetch<WooOrder>(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

// Customers API
export const WooCommerceCustomers = {
  // Get customer by email
  async getByEmail(email: string): Promise<WooCustomer[]> {
    return wooFetch<WooCustomer[]>(`/customers?email=${encodeURIComponent(email)}`);
  },

  // Create customer
  async create(data: {
    email: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    password?: string;
  }): Promise<WooCustomer> {
    return wooFetch<WooCustomer>('/customers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Webhook verification helper
export function verifyWebhookSignature(
  payload: string,
  signature: string | null
): boolean {
  if (!signature) return false;
  
  const secret = process.env.WOOCOMMERCE_WEBHOOK_SECRET || '';
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('base64');
  
  return signature === expectedSignature;
}

// Product ID mapping for internal use
// Based on WooCommerce Products API (March 2026):
// 215: 7-Day Trial ($7)
// 216: Identity Recode Planner ($17)
// 217: Premium Transformation ($27)
// 218: Complete Bundle ($47)
export const PRODUCT_ID_MAP: Record<number, string> = {
  215: 'trial',       // 7-Day Trial
  216: 'planner',     // Identity Recode Planner
  217: 'premium',     // Premium Transformation
  218: 'bundle',      // Complete Bundle
};

// Reverse mapping
export const INTERNAL_TO_WOO_ID: Record<string, number> = {
  'trial': 215,
  'planner': 216,
  'premium': 217,
  'bundle': 218,
};

// WooCommerce client object
const WooCommerceClient = {
  products: WooCommerceProducts,
  orders: WooCommerceOrders,
  customers: WooCommerceCustomers,
  verifyWebhookSignature,
};

export default WooCommerceClient;
