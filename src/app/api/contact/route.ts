import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Create CSV entry
    const csvEntry = `${data.name},${data.email},${data.message}\n`;
    const csvPath = path.join(process.cwd(), 'database.csv');
    
    // Append to CSV file
    fs.appendFileSync(csvPath, csvEntry);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving contact form:', error);
    return NextResponse.json({ error: 'Failed to save contact form' }, { status: 500 });
  }
}
