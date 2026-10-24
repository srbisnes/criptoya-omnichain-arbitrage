import { ExchangeQuotes, Quote } from './criptoya';

export interface ArbitrageOpportunity {
  coin: string;
  fiat: string;
  volume: number;
  buyExchange: string;
  sellExchange: string;
  buyPrice: number;
  sellPrice: number;
  spreadPct: number;
  netProfitPct: number;
  estimatedProfit: number;
  omnichainSuggestion: string;
  risk: 'low' | 'medium' | 'high';
}

export function findBestArbitrage(
  quotes: ExchangeQuotes,
  coin: string,
  fiat: string,
  volume: number
): ArbitrageOpportunity[] {
  const opportunities: ArbitrageOpportunity[] = [];
  const exchanges = Object.entries(quotes).filter(([_, q]) => q.ask > 0 && q.bid > 0);

  for (let i = 0; i < exchanges.length; i++) {
    for (let j = 0; j < exchanges.length; j++) {
      if (i === j) continue;
      const [buyEx, buyQ] = exchanges[i];
      const [sellEx, sellQ] = exchanges[j];

      const buyPrice = buyQ.totalAsk || buyQ.ask;
      const sellPrice = sellQ.totalBid || sellQ.bid;

      if (sellPrice > buyPrice) {
        const spreadPct = ((sellPrice - buyPrice) / buyPrice) * 100;
        // Rough net: subtract estimated 0.5% trading + transfer fee impact
        const netProfitPct = Math.max(0, spreadPct - 1.2);
        const estimatedProfit = (sellPrice - buyPrice) * volume * 0.98; // after rough fees

        if (netProfitPct > 0.3) {
          opportunities.push({
            coin,
            fiat,
            volume,
            buyExchange: buyEx,
            sellExchange: sellEx,
            buyPrice,
            sellPrice,
            spreadPct: Math.round(spreadPct * 100) / 100,
            netProfitPct: Math.round(netProfitPct * 100) / 100,
            estimatedProfit: Math.round(estimatedProfit * 100) / 100,
            omnichainSuggestion: suggestOmnichain(buyEx, sellEx, coin),
            risk: netProfitPct > 2 ? 'high' : netProfitPct > 1 ? 'medium' : 'low',
          });
        }
      }
    }
  }

  return opportunities
    .sort((a, b) => b.netProfitPct - a.netProfitPct)
    .slice(0, 15);
}

function suggestOmnichain(buyEx: string, sellEx: string, coin: string): string {
  const p2p = ['binancep2p', 'bybitp2p', 'okexp2p', 'huobip2p', 'bitgetp2p', 'kucoinp2p'];
  if (p2p.includes(buyEx) || p2p.includes(sellEx)) {
    return `P2P route detected. For omnichain: buy on ${buyEx}, bridge via LayerZero/Axelar to target chain, settle on ${sellEx}. Use CCTP for USDC if stable.`;
  }
  if (coin === 'USDT' || coin === 'USDC') {
    return `Stablecoin arb. Suggest cross-chain via Circle CCTP or Wormhole for near-instant settlement between L2s (Arbitrum, Base, Optimism).`;
  }
  return `Standard CEX arb. Consider Hyperlane or LayerZero for message-based settlement if on different L1/L2. Monitor gas on destination.`;
}
