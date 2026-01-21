"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProductsStore } from '@/lib/products-store';
import { Product } from '@/types';

export default function AdminPage() {
  const { products, setProducts } = useProductsStore();
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/products.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const textData = await response.text();
      const parsedProducts: Product[] = JSON.parse(textData);
      setProducts(parsedProducts);
      setJsonText(JSON.stringify(parsedProducts, null, 2));
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveProducts = async () => {
    try {
      const parsedProducts: Product[] = JSON.parse(jsonText);
      setLoading(true);
      setError('');

      const response = await fetch('/api/save-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jsonData: jsonText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setProducts(parsedProducts);
      alert('Products updated successfully!');
    } catch (err) {
      console.error('Error saving products:', err);
      setError('Failed to save products. Please check your JSON and try again.');
    } finally {
      setLoading(false);
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

  const handleSave = () => {
    try {
      JSON.parse(jsonText); // Validate JSON
      saveProducts();
    } catch {
      setError('Invalid JSON format. Please check your syntax.');
    }
  };

  const handleReset = () => {
    setJsonText(JSON.stringify(products, null, 2));
    setError('');
  };

  useEffect(() => {
    if (products.length > 0) {
      setJsonText(JSON.stringify(products, null, 2));
    }
  }, [products]);

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
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel - Edit Products</h1>
          <p className="text-gray-600">
            Edit the products data below. Make sure to maintain valid JSON format.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Products JSON Editor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder="Products JSON will appear here after fetching..."
              className="min-h-[600px] font-mono text-sm"
            />

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
              >
                {loading ? 'Saving...' : 'Save Products'}
              </Button>
              <Button onClick={handleReset} variant="outline">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-sm text-gray-500">
          <p><strong>Instructions:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Edit the JSON in the textarea as needed</li>
            <li>Each product must have: id (number), name (string), price (number), description (string), image (string), category (string), popular (boolean)</li>
            <li>Use valid JSON syntax</li>
            <li>Click "Save Products" to update the data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
