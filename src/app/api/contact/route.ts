import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Create CSV entry
    const csvEntry = `${data.name},${data.email},${data.message}\n`;
    const csvPath = path.join(process.cwd(), 'database.csv');
    fs.appendFileSync(csvPath, csvEntry);
    
    // Send Telegram notification
    await sendTelegramNotification(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving contact form:', error);
    return NextResponse.json({ error: 'Failed to save contact form' }, { status: 500 });
  }
}

async function sendTelegramNotification(data: any) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return;
  
  const message = `
Source: Personal website
---
🆕 *New Contact Form Submission*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
💬 *Message:*
${data.message}
  `;

  await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    chat_id: chatId,
    text: message,
    parse_mode: 'Markdown',
  });
}
