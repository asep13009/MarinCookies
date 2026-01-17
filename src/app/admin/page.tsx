"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProductsStore } from '@/lib/products-store';
import { Product } from '@/types';

export default function AdminPage() {
  const { products, setProducts, bearerToken, setBearerToken } = useProductsStore();
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileId] = useState('1g07svT2seVembqhuFE9SGYUIrNNtskdd');

  const fetchProductsFromDrive = async () => {
    if (!bearerToken) {
      setError('Please enter your Bearer token first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const textData = await response.text();
      const parsedProducts: Product[] = JSON.parse(textData);
      setProducts(parsedProducts); // Update local store immediately
      setJsonText(JSON.stringify(parsedProducts, null, 2));
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products from Google Drive. Please check your token and try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveProductsToDrive = async () => {
    if (!bearerToken) {
      setError('Please enter your Bearer token first.');
      return;
    }

    try {
      const parsedProducts: Product[] = JSON.parse(jsonText);
      setLoading(true);
      setError('');

      const response = await fetch(
        `https://www.googleapis.com/upload/drive/v3/files/${fileId}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'text/plain',
          },
          body: jsonText,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local store immediately
      setProducts(parsedProducts);
      alert('Products updated successfully on Google Drive!');
    } catch (err) {
      console.error('Error saving products:', err);
      setError('Failed to save products to Google Drive. Please check your token and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    try {
      JSON.parse(jsonText); // Validate JSON
      saveProductsToDrive();
    } catch (err) {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel - Edit Products</h1>
          <p className="text-gray-600">
            Edit the products data below. Make sure to maintain valid JSON format.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Google Drive Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="bearer-token" className="block text-sm font-medium text-gray-700 mb-2">
                Bearer Token
              </label>
              <Input
                id="bearer-token"
                type="password"
                value={bearerToken}
                onChange={(e) => setBearerToken(e.target.value)}
                placeholder="Enter your Google Drive Bearer token"
                className="w-full"
              />
            </div>
            <Button
              onClick={fetchProductsFromDrive}
              disabled={loading || !bearerToken}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Loading...' : 'Fetch Products from Google Drive'}
            </Button>
          </CardContent>
        </Card>

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
                disabled={loading || !bearerToken}
                className="bg-green-600 hover:bg-green-700"
              >
                {loading ? 'Saving...' : 'Save to Google Drive'}
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
            <li>Enter your Google Drive Bearer token in the configuration section</li>
            <li>Click "Fetch Products from Google Drive" to load current data</li>
            <li>Edit the JSON in the textarea as needed</li>
            <li>Each product must have: id (number), name (string), price (number), description (string), image (string), category (string), popular (boolean)</li>
            <li>Use valid JSON syntax</li>
            <li>Click "Save to Google Drive" to update the data</li>
            <li>Changes sync automatically across all devices every 30 seconds</li>
            <li>No need to refresh - data updates automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
