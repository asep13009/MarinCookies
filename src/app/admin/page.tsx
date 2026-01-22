"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from '@/types';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const parsedProducts: Product[] = await response.json();
      setProducts(parsedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setCurrentProduct({ name: '', price: 0, description: '', image: '', category: '', popular: false });
    setSelectedImage(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setSelectedImage(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch('/api/products', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        if (!response.ok) throw new Error('Failed to delete');
        fetchProducts();
      } catch (err) {
        setError('Failed to delete product');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;
    try {
      let imageUrl = currentProduct.image;

      // Upload image if selected
      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);
        const uploadResponse = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });
        if (!uploadResponse.ok) throw new Error('Failed to upload image');
        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url;
      }

      const productData = { ...currentProduct, image: imageUrl };
      const method = currentProduct.id ? 'PUT' : 'POST';
      const response = await fetch('/api/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Failed to save');
      setIsDialogOpen(false);
      setSelectedImage(null);
      fetchProducts();
    } catch (err) {
      setError('Failed to save product');
    }
  };

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
      fetchProducts();
    } else {
      setLoginError('Invalid username or password');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full"
              />
            </div>
            {loginError && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                {loginError}
              </div>
            )}
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel - Manage Products</h1>
            <p className="text-gray-600">Add, edit, or delete products.</p>
          </div>
          <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
            Add Product
          </Button>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="font-semibold text-lg mb-2">Rp {product.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
                <p className="text-sm text-gray-500 mb-4">Popular: {product.popular ? 'Yes' : 'No'}</p>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(product)} variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(product.id)} variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentProduct?.id ? 'Edit Product' : 'Add Product'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={currentProduct?.name || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct!, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <Input
                  type="number"
                  value={currentProduct?.price || 0}
                  onChange={(e) => setCurrentProduct({ ...currentProduct!, price: Number(e.target.value) })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={currentProduct?.description || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct!, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                />
                {currentProduct?.image && !selectedImage && (
                  <p className="text-sm text-gray-500 mt-1">Current image: {currentProduct.image}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Input
                  value={currentProduct?.category || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct!, category: e.target.value })}
                 
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="popular"
                  checked={currentProduct?.popular || false}
                  onCheckedChange={(checked) => setCurrentProduct({ ...currentProduct!, popular: !!checked })}
                />
                <label htmlFor="popular" className="text-sm font-medium">Popular</label>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
