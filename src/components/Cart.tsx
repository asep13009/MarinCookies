"use client";

import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import CheckoutForm from './CheckoutForm';

export default function Cart() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    toggleCart, 
    getTotalItems, 
    getTotalPrice, 
    updateQuantity, 
    removeItem 
  } = useCartStore();
  
  const [showCheckout, setShowCheckout] = useState(false);
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleBackToCart = () => {
    setShowCheckout(false);
  };

  return (
    <>
      {/* Cart Trigger Button */}
      <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="relative bg-orange-100 hover:bg-orange-200 border-orange-200"
          >
            <ShoppingCart className="h-4 w-4 text-orange-600" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                {totalItems}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        
        <SheetContent className="w-full sm:max-w-lg flex flex-col max-h-screen">
          {!showCheckout ? (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Keranjang Belanja
                </SheetTitle>
                <SheetDescription>
                  {totalItems > 0 ? `${totalItems} item dalam keranjang` : 'Keranjang kosong'}
                </SheetDescription>
              </SheetHeader>

              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Keranjang Kosong</h3>
                  <p className="text-gray-500 mb-4">Belum ada produk yang dipilih</p>
                  <Button onClick={closeCart} className="bg-orange-500 hover:bg-orange-600">
                    Mulai Belanja
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col h-full overflow-hidden">
                  <div className="flex-1 overflow-y-auto -mx-6 px-6">
                    <div className="space-y-4 py-4 pb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-gray-800 truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {formatPrice(item.product.price)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeItem(item.product.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0 border-t bg-white pt-4 space-y-4 -mx-6 px-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-orange-600">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                    
                    <Button 
                      onClick={handleCheckout}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                      size="lg"
                    >
                      Lanjut ke Checkout
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <SheetHeader>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBackToCart}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <SheetTitle>Checkout</SheetTitle>
                </div>
                <SheetDescription>
                  Lengkapi data untuk menyelesaikan pesanan
                </SheetDescription>
              </SheetHeader>
              
              <CheckoutForm onBack={handleBackToCart} />
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}