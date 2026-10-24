# CryptoYa Omnichain Arbitrage Expert

**El mejor arquitecto Web3 Solutions Omnichain.** Herramienta de arbitraje alimentada en tiempo real por la API de [CryptoYa](https://criptoya.com/api).

## Arquitectura Innovadora

- **Data Layer**: CryptoYa Public API (precios CEX/P2P LATAM, fees, dólar).
- **Detection Engine**: Algoritmo de spreads cross-exchange con ajuste de fees y profit neto.
- **Omnichain Layer**: Sugerencias de ejecución usando LayerZero, Axelar, Chainlink CCIP, Hyperlane, Wormhole, Circle CCTP.
- **AI Integration**: Ranking de oportunidades + recomendaciones de ruta (extensible a LLMs para análisis de riesgo).
- **Frontend**: Next.js 15 App Router, TypeScript, dark-mode, real-time scanner.
- **Fintech/Bank ready**: Compatible con flujos fiat (ARS, BRL, etc.) y tokens stables.

## Features

- Escaneo de mejores arbitrajes USDT/BTC/ETH vs ARS/USD/BRL/COP.
- Cálculo de spread bruto y profit neto estimado.
- Sugerencias omnichaín para settlement cross-chain.
- Actualización cada ~1 minuto (rate limit CryptoYa 120 req/min).
- Listo para deploy en Vercel y extensión con smart contracts (Foundry).

## Setup Local

```bash
git clone https://github.com/srbisnes/criptoya-omnichain-arbitrage.git
cd criptoya-omnichain-arbitrage
npm install
npm run dev
```

Abre http://localhost:3000

## Deploy

Push a GitHub y conecta a Vercel. Zero config.

## Extensiones Futuras

- Smart contract de settlement omnichaín.
- Alertas Telegram/Discord.
- Integración wallets (wagmi) para ejecución semi-automática.
- Backtesting histórico.

**Creado por Elcryptoboy** — combinando AI + Crypto + Blockchain + Web3 + Fintech + Tokens + Smart Contracts + Layers 0-1-2-3.
