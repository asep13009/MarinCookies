"use client";

import { Product } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/whatsapp';
import { ShoppingCart, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
    openCart();
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={`${product.name} - donat lezat dengan topping premium`}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.popular && (
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white">
            Populer
          </Badge>
        )}
        <Badge 
          variant="secondary" 
          className="absolute top-3 right-3 bg-white/90 text-gray-700"
        >
          {product.category}
        </Badge>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            onClick={handleAddToCart}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah ke Keranjang
          </Button>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-gray-800 group-hover:text-orange-600 transition-colors">
          {product.name}
        </CardTitle>
        <CardDescription className="text-gray-600 line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-600">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <ShoppingCart className="w-4 h-4 mr-1" />
            <span>Siap pesan</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold group-hover:bg-orange-600 transition-colors"
          size="lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah ke Keranjang
        </Button>
      </CardFooter>
    </Card>
  );
}