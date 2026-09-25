'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  Package,
  CreditCard,
  Shield,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { getCart, removeFromCart, clearCart, type CartData } from '@/lib/cart-client';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from '@/components/providers/LocaleProvider';

export default function CartPage() {
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('cartPage');

  // Fetch cart data from localStorage
  useEffect(() => {
    const cartData = getCart();
    setCart(cartData);
    setLoading(false);

    // Listen for cart updates from other components
    const handleCartUpdate = () => {
      const updatedCart = getCart();
      setCart(updatedCart);
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  const { toast } = useToast();

  // Remove item from cart
  const handleRemoveItem = (productId: string, name: string) => {
    const updatedCart = removeFromCart(productId);
    setCart(updatedCart);
    toast({
      title: t('itemRemoved'),
      description: t('itemRemovedDesc').replace('{name}', name),
    });
  };

  // Clear entire cart
  const handleClearCart = () => {
    clearCart();
    setCart({ items: [], total: 0, itemCount: 0 });
    toast({
      title: t('cartCleared'),
      description: t('cartClearedDesc'),
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-12 h-12 text-[#1F6F78] mx-auto mb-4 animate-bounce" />
          <p className="text-[#8A94A6]">{t('loading')}</p>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F6F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-[#1F6F78]" />
            </div>
            <h1 className="text-3xl font-bold text-[#0F1C2E] mb-4">{t('emptyTitle')}</h1>
            <p className="text-[#8A94A6] mb-8">
              {t('emptySubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-12 px-8">
                  {t('browseProducts')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/quiz">
                <Button variant="outline" className="h-12 px-8 border-[#3DD4B0] text-[#3DD4B0]">
                  {t('takeFreeAssessment')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center text-[#1F6F78] hover:text-[#3DD4B0] mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('continueShopping')}
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0F1C2E]">{t('shoppingCart')}</h1>
              <p className="text-[#8A94A6] mt-1">
                {t('itemCount').replace('{count}', String(cart.itemCount))}
              </p>
            </div>
            <Button 
              variant="ghost" 
              className="text-[#1F6F78] hover:text-[#185C64] hover:bg-[#F0F8F8]"
              onClick={handleClearCart}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t('clearCart')}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <Card key={item.productId} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Icon */}
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78] flex items-center justify-center flex-shrink-0">
                      <Package className="w-8 h-8 text-[#3DD4B0]" />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.productId}`}>
                        <h3 className="font-semibold text-[#0F1C2E] hover:text-[#1F6F78] transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-bold text-[#0F1C2E]">
                          ${item.price}
                        </span>
                        {item.comparePrice && item.comparePrice > item.price && (
                          <span className="text-sm text-[#8A94A6] line-through">
                            ${item.comparePrice}
                          </span>
                        )}
                        {item.comparePrice && item.comparePrice > item.price && (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            {t('save')} ${item.comparePrice - item.price}
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs">{t('digitalProductMonthly')}</Badge>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.productId, item.name)}
                      className="text-[#B88A8E] hover:text-[#185C64] hover:bg-[#F0F8F8] p-2 rounded-lg transition-colors self-start"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-[#0F1C2E]">{t('orderSummary')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-slate-600 truncate mr-2">{item.name}</span>
                    <span className="font-medium text-[#0F1C2E]">${item.price}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-sm text-[#8A94A6]">
                  <span>{t('tax')}</span>
                  <span>$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold text-[#0F1C2E]">
                  <span>{t('total')}</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-12 mt-4 font-semibold">
                    <CreditCard className="w-4 h-4 mr-2" />
                    {t('proceedToCheckout')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-[#8A94A6]">
                    <Shield className="w-4 w-4 text-[#3DD4B0]" />
                    <span>{t('secureCheckout')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8A94A6]">
                    <CheckCircle2 className="w-4 h-4 text-[#3DD4B0]" />
                    <span>{t('moneyBackGuarantee')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8A94A6]">
                    <Package className="w-4 h-4 text-[#3DD4B0]" />
                    <span>{t('instantDigitalAccess')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
