/**
 * Digital Product Delivery Service
 * Handles secure delivery of digital products to customers
 */

import { db } from './db';
import { encrypt, decrypt, generateAccessCode, maskEmail } from './security';
import EmailService from './email-service';

// Product delivery status
export type DeliveryStatus = 'pending' | 'delivered' | 'failed' | 'expired';

// Digital product delivery record
export interface DigitalDelivery {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  customerEmail: string; // encrypted
  customerName: string | null;
  accessCode: string;
  licenseKey: string; // encrypted
  tier: string;
  status: DeliveryStatus;
  downloadCount: number;
  maxDownloads: number;
  expiresAt: Date | null;
  deliveredAt: Date | null;
  createdAt: Date;
}

/**
 * Generate a unique license key for the product
 */
export function generateLicenseKey(productId: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const productCode = productId.substring(0, 3).toUpperCase();
  
  return `TMLY-${productCode}-${timestamp}-${random}`;
}

/**
 * Create a digital delivery record
 */
export async function createDigitalDelivery(params: {
  orderId: string;
  productId: string;
  productName: string;
  customerEmail: string;
  customerName?: string;
  tier: string;
  price: number;
}): Promise<{ success: boolean; delivery?: DigitalDelivery; error?: string }> {
  try {
    const { orderId, productId, productName, customerEmail, customerName, tier } = params;
    
    // Generate access code and license key
    const accessCode = generateAccessCode();
    const licenseKey = generateLicenseKey(productId);
    
    // Encrypt sensitive data
    const encryptedEmail = encrypt(customerEmail.toLowerCase());
    const encryptedLicenseKey = encrypt(licenseKey);
    
    // Check if delivery already exists for this order
    const existingDelivery = await db.digitalDelivery.findFirst({
      where: { orderId },
    });
    
    if (existingDelivery) {
      return {
        success: true,
        delivery: {
          id: existingDelivery.id,
          orderId: existingDelivery.orderId,
          productId: existingDelivery.productId,
          productName: existingDelivery.productName,
          customerEmail: decrypt(existingDelivery.customerEmail),
          customerName: existingDelivery.customerName,
          accessCode: existingDelivery.accessCode,
          licenseKey: decrypt(existingDelivery.licenseKey),
          tier: existingDelivery.tier,
          status: existingDelivery.status as DeliveryStatus,
          downloadCount: existingDelivery.downloadCount,
          maxDownloads: existingDelivery.maxDownloads,
          expiresAt: existingDelivery.expiresAt,
          deliveredAt: existingDelivery.deliveredAt,
          createdAt: existingDelivery.createdAt,
        },
      };
    }
    
    // Create delivery record
    const delivery = await db.digitalDelivery.create({
      data: {
        orderId,
        productId,
        productName,
        customerEmail: encryptedEmail,
        customerName: customerName || null,
        accessCode,
        licenseKey: encryptedLicenseKey,
        tier,
        status: 'pending',
        downloadCount: 0,
        maxDownloads: 10, // Allow up to 10 downloads
        expiresAt: null, // No expiration for lifetime access
      },
    });
    
    // Also create app access record
    await db.appAccess.create({
      data: {
        code: accessCode,
        email: customerEmail.toLowerCase(),
        customerName: customerName || null,
        orderId,
        productId,
        productName,
        tier,
        isUsed: false,
        isActive: true,
      },
    }).catch(() => {
      // Ignore if already exists
    });
    
    return {
      success: true,
      delivery: {
        id: delivery.id,
        orderId: delivery.orderId,
        productId: delivery.productId,
        productName: delivery.productName,
        customerEmail,
        customerName,
        accessCode,
        licenseKey,
        tier: delivery.tier,
        status: delivery.status as DeliveryStatus,
        downloadCount: delivery.downloadCount,
        maxDownloads: delivery.maxDownloads,
        expiresAt: delivery.expiresAt,
        deliveredAt: delivery.deliveredAt,
        createdAt: delivery.createdAt,
      },
    };
  } catch (error) {
    console.error('Failed to create digital delivery:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create delivery',
    };
  }
}

/**
 * Mark delivery as delivered and send email
 */
export async function deliverProduct(deliveryId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const delivery = await db.digitalDelivery.findUnique({
      where: { id: deliveryId },
    });
    
    if (!delivery) {
      return { success: false, error: 'Delivery not found' };
    }
    
    const customerEmail = decrypt(delivery.customerEmail);
    const licenseKey = decrypt(delivery.licenseKey);
    
    // Send delivery email
    const emailResult = await EmailService.sendPurchaseConfirmationEmail({
      to: customerEmail,
      name: delivery.customerName || 'Friend',
      productName: delivery.productName,
      accessKey: delivery.accessCode,
    });
    
    if (emailResult.success) {
      // Update delivery status
      await db.digitalDelivery.update({
        where: { id: deliveryId },
        data: {
          status: 'delivered',
          deliveredAt: new Date(),
        },
      });
      
      return { success: true };
    } else {
      return { success: false, error: emailResult.error || 'Failed to send email' };
    }
  } catch (error) {
    console.error('Failed to deliver product:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to deliver product',
    };
  }
}

/**
 * Verify and use access code
 */
export async function verifyAccessCode(
  code: string,
  email?: string
): Promise<{ valid: boolean; delivery?: DigitalDelivery; error?: string }> {
  try {
    const access = await db.appAccess.findFirst({
      where: { code: code.toUpperCase() },
    });
    
    if (!access) {
      return { valid: false, error: 'Invalid access code' };
    }
    
    if (!access.isActive) {
      return { valid: false, error: 'Access code has been deactivated' };
    }
    
    // Verify email if provided
    if (email && access.email !== email.toLowerCase()) {
      return { valid: false, error: 'Email does not match access code' };
    }
    
    // Mark as used
    if (!access.isUsed) {
      await db.appAccess.update({
        where: { id: access.id },
        data: {
          isUsed: true,
          usedAt: new Date(),
        },
      });
    }
    
    // Get delivery info
    const delivery = await db.digitalDelivery.findFirst({
      where: { accessCode: code.toUpperCase() },
    });
    
    return {
      valid: true,
      delivery: delivery ? {
        id: delivery.id,
        orderId: delivery.orderId,
        productId: delivery.productId,
        productName: delivery.productName,
        customerEmail: decrypt(delivery.customerEmail),
        customerName: delivery.customerName,
        accessCode: delivery.accessCode,
        licenseKey: decrypt(delivery.licenseKey),
        tier: delivery.tier,
        status: delivery.status as DeliveryStatus,
        downloadCount: delivery.downloadCount,
        maxDownloads: delivery.maxDownloads,
        expiresAt: delivery.expiresAt,
        deliveredAt: delivery.deliveredAt,
        createdAt: delivery.createdAt,
      } : undefined,
    };
  } catch (error) {
    console.error('Failed to verify access code:', error);
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Verification failed',
    };
  }
}

/**
 * Record a download
 */
export async function recordDownload(
  accessCode: string
): Promise<{ success: boolean; remaining?: number; error?: string }> {
  try {
    const delivery = await db.digitalDelivery.findFirst({
      where: { accessCode: accessCode.toUpperCase() },
    });
    
    if (!delivery) {
      return { success: false, error: 'Delivery not found' };
    }
    
    if (delivery.downloadCount >= delivery.maxDownloads) {
      return { success: false, error: 'Download limit reached' };
    }
    
    const updated = await db.digitalDelivery.update({
      where: { id: delivery.id },
      data: { downloadCount: { increment: 1 } },
    });
    
    return {
      success: true,
      remaining: updated.maxDownloads - updated.downloadCount,
    };
  } catch (error) {
    console.error('Failed to record download:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to record download',
    };
  }
}

/**
 * Get customer's deliveries
 */
export async function getCustomerDeliveries(
  email: string
): Promise<DigitalDelivery[]> {
  try {
    const encryptedEmail = encrypt(email.toLowerCase());
    
    const deliveries = await db.digitalDelivery.findMany({
      where: { customerEmail: encryptedEmail },
      orderBy: { createdAt: 'desc' },
    });
    
    return deliveries.map(d => ({
      id: d.id,
      orderId: d.orderId,
      productId: d.productId,
      productName: d.productName,
      customerEmail: email,
      customerName: d.customerName,
      accessCode: d.accessCode,
      licenseKey: decrypt(d.licenseKey),
      tier: d.tier,
      status: d.status as DeliveryStatus,
      downloadCount: d.downloadCount,
      maxDownloads: d.maxDownloads,
      expiresAt: d.expiresAt,
      deliveredAt: d.deliveredAt,
      createdAt: d.createdAt,
    }));
  } catch (error) {
    console.error('Failed to get customer deliveries:', error);
    return [];
  }
}

/**
 * Revoke access
 */
export async function revokeAccess(
  accessCode: string,
  reason?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await db.appAccess.updateMany({
      where: { code: accessCode.toUpperCase() },
      data: { isActive: false },
    });
    
    await db.digitalDelivery.updateMany({
      where: { accessCode: accessCode.toUpperCase() },
      data: { status: 'expired' },
    });
    
    console.log(`Access revoked for ${accessCode}: ${reason || 'No reason provided'}`);
    
    return { success: true };
  } catch (error) {
    console.error('Failed to revoke access:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to revoke access',
    };
  }
}

// Export service
const DigitalDeliveryService = {
  createDigitalDelivery,
  deliverProduct,
  verifyAccessCode,
  recordDownload,
  getCustomerDeliveries,
  revokeAccess,
  generateLicenseKey,
};

export default DigitalDeliveryService;
