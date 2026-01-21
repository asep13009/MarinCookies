import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { jsonData } = await request.json();

    // Validate JSON
    JSON.parse(jsonData);

    // Path to products.json
    const filePath = path.join(process.cwd(), 'public', 'products.json');

    // Write to file
    fs.writeFileSync(filePath, jsonData, 'utf8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving products:', error);
    return NextResponse.json({ error: 'Failed to save products' }, { status: 500 });
  }
}
