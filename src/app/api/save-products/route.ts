import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { jsonData } = await request.json();

    // Validate JSON
    const products = JSON.parse(jsonData);

    // Save to Supabase
    const { error } = await supabase
      .from('products')
      .upsert(products, { onConflict: 'id' });

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving products:', error);
    return NextResponse.json({ error: 'Failed to save products' }, { status: 500 });
  }
}
