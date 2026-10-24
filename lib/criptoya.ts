export interface Quote {
  ask: number;
  totalAsk: number;
  bid: number;
  totalBid: number;
  time: number;
}

export interface ExchangeQuotes {
  [exchange: string]: Quote;
}

const BASE_URL = 'https://criptoya.com/api';

export async function fetchQuotes(coin: string, fiat: string, volume: number): Promise<ExchangeQuotes> {
  const url = `${BASE_URL}/${coin}/${fiat}/${volume}`;
  const res = await fetch(url, { next: { revalidate: 30 } });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  if (typeof data === 'string') throw new Error(data);
  return data as ExchangeQuotes;
}

export async function fetchFees(): Promise<any> {
  const res = await fetch(`${BASE_URL}/fees`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Fees error: ${res.status}`);
  return res.json();
}
