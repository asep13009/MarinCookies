import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('id');

    if (error) {
      throw error;
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const product = await request.json();
    const { data, error } = await supabase.from('products').insert(product).select();
    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const product = await request.json();
    const { data, error } = await supabase.from('products').update(product).eq('id', product.id).select();
    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    // First, get the product to retrieve the image URL
    const { data: product, error: fetchError } = await supabase
      .from('products')
      .select('image')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Delete the image from storage if it exists
    if (product?.image) {
      const imagePath = product.image.split('/').pop(); // Extract filename from URL
      if (imagePath) {
        await supabase.storage.from('product_image').remove([imagePath]);
      }
    }

    // Delete the product from database
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
