import { NextRequest, NextResponse } from 'next/server';
import { fetchQuotes } from '@/lib/criptoya';
import { findBestArbitrage } from '@/lib/arbitrage';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const coin = searchParams.get('coin') || 'USDT';
  const fiat = searchParams.get('fiat') || 'ARS';
  const volume = Number(searchParams.get('volume') || 1000);

  try {
    const quotes = await fetchQuotes(coin, fiat, volume);
    const opportunities = findBestArbitrage(quotes, coin, fiat, volume);

    return NextResponse.json({
      success: true,
      timestamp: Date.now(),
      opportunities,
      source: 'CryptoYa API',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
