# codex-tradingview-xau-btc-mcp

Custom MCP bridge for connecting Codex to TradingView Desktop on Windows 11.

This project is optimized first for:

- XAU/USD intraday trading;
- BTC/USD intraday trading;
- Paper Trading workflows;
- human-validated live execution;
- future extension to other pairs through a generic profile.

It is built on top of the TradingView Desktop CDP/MCP ecosystem, with `ulianbass/tradingview-mcp` used as the primary engine and additional ideas from Codex Windows setup, self-learning journal, and type-safe diagnostic repositories.

## Important

This project does not guarantee profitability. It is an assistant and automation bridge. Every trade still carries risk.

Absolute rules:

- no trade without stop-loss;
- risk must be calculated before entry;
- Paper Trading first;
- live execution requires explicit human validation;
- TradingView terms of use and broker rules must be respected.

## Quick Start

Install dependencies:

```powershell
npm install
```

Set up Codex on Windows:

```powershell
npm run setup:codex:windows
```

Launch TradingView Desktop with CDP:

```powershell
npm run tv -- launch
```

Check connection:

```powershell
npm run tv -- health
```

## Codex Session Commands

London XAU/USD paper session:

```text
session_start asset=XAUUSD session=london mode=paper
```

New York XAU/USD paper session:

```text
session_start asset=XAUUSD session=new_york mode=paper
```

Immediate scan:

```text
session_scan_now
```

Pause before news:

```text
session_pause reason="high-impact US news"
```

Stop session:

```text
session_stop
```

## Custom MCP Tools

Added on top of the upstream engine:

- `session_start`
- `session_status`
- `session_scan_now`
- `session_pause`
- `session_resume`
- `session_stop`
- `risk_calculate_position`
- `trade_validate_plan`

These tools are designed to make the workflow simple for the user while keeping the underlying process structured and safe.

## Documentation

- [Codex Windows Setup](docs/CODEX_WINDOWS_SETUP.md)
- [XAU/BTC Trading Workflow](docs/TRADING_WORKFLOW_XAU_BTC.md)
- [Multi-Asset Extension](docs/MULTI_ASSET_EXTENSION.md)
- [Safety and Limits](docs/SAFETY_AND_LIMITS.md)
- [Upstream Integration Notes](docs/UPSTREAM_INTEGRATION.md)

## Attribution

This repository includes and adapts MIT-licensed work from public TradingView MCP projects. See [UPSTREAM_INTEGRATION.md](docs/UPSTREAM_INTEGRATION.md) and [LICENSE](LICENSE).
