'use client';

import { useState, useEffect } from 'react';

interface Opp {
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
  risk: string;
}

export default function Home() {
  const [opps, setOpps] = useState<Opp[]>([]);
  const [loading, setLoading] = useState(false);
  const [coin, setCoin] = useState('USDT');
  const [fiat, setFiat] = useState('ARS');
  const [volume, setVolume] = useState(1000);

  const scan = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/arb?coin=${coin}&fiat=${fiat}&volume=${volume}`);
      const data = await res.json();
      setOpps(data.opportunities || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    scan();
  }, []);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-2 text-emerald-400">
        CryptoYa Omnichain Arbitrage Expert
      </h1>
      <p className="text-gray-400 mb-6">
        Escáner AI-powered alimentado en tiempo real por la API de CryptoYa. Detecta spreads LATAM, calcula profit neto y sugiere rutas omnichaín L0-L3 (LayerZero, Axelar, CCTP, Wormhole).
      </p>

      <div className="flex gap-4 mb-6 flex-wrap">
        <select value={coin} onChange={(e) => setCoin(e.target.value)} className="bg-gray-800 p-2 rounded">
          <option>USDT</option>
          <option>BTC</option>
          <option>ETH</option>
          <option>USDC</option>
        </select>
        <select value={fiat} onChange={(e) => setFiat(e.target.value)} className="bg-gray-800 p-2 rounded">
          <option>ARS</option>
          <option>USD</option>
          <option>BRL</option>
          <option>COP</option>
        </select>
        <input
          type="number"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="bg-gray-800 p-2 rounded w-32"
          placeholder="Volumen"
        />
        <button
          onClick={scan}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? 'Escaneando...' : 'Escanear Arbitrajes'}
        </button>
      </div>

      {opps.length === 0 && !loading && (
        <p className="text-yellow-400">No se encontraron oportunidades significativas en este momento.</p>
      )}

      <div className="grid gap-4">
        {opps.map((opp, i) => (
          <div key={i} className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">
                  Comprar en <span className="text-green-400">{opp.buyExchange}</span> → Vender en <span className="text-blue-400">{opp.sellExchange}</span>
                </h3>
                <p className="text-sm text-gray-400">
                  {opp.coin}/{opp.fiat} | Volumen: {opp.volume}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-400">{opp.netProfitPct}%</div>
                <div className="text-sm">Spread bruto: {opp.spreadPct}%</div>
                <div className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                  opp.risk === 'low' ? 'bg-green-900' : opp.risk === 'medium' ? 'bg-yellow-900' : 'bg-red-900'
                }`}>
                  Riesgo {opp.risk}
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>Precio compra: <strong>{opp.buyPrice.toLocaleString()}</strong></div>
              <div>Precio venta: <strong>{opp.sellPrice.toLocaleString()}</strong></div>
              <div>Profit estimado: <strong className="text-emerald-300">{opp.estimatedProfit.toLocaleString()} {opp.fiat}</strong></div>
            </div>
            <div className="mt-3 p-3 bg-gray-800 rounded text-sm text-cyan-300">
              <strong>Sugerencia Omnichain:</strong> {opp.omnichainSuggestion}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        Alimentado por CryptoYa API · Arquitectura Web3 Omnichain · Elcryptoboy Solutions
      </footer>
    </main>
  );
}
