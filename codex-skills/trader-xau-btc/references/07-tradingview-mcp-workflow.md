# TradingView, MCP et Semi-automatisation

## Role du Systeme

Le systeme est un assistant de decision, pas un robot magique.

Objectif:

- Lire le contexte.
- Scanner XAU/USD et BTC/USD.
- Detecter les setups.
- Calculer risque, SL, TP, taille.
- Refuser les mauvais trades.
- Journaliser.
- Apprendre des resultats.

## Acces TradingView Necessaires

Indispensable:

- Symbole actuel.
- Timeframe.
- OHLCV.
- Historique multi-timeframe.
- Capture graphique.
- PDH, PDL, PDC, daily open.
- Objets ou niveaux traces si disponibles.

Tres utile:

- Changer symbole.
- Changer timeframe.
- Lire indicateurs.
- Creer alertes.
- Lire Paper Trading: ordres, positions, P&L.
- Export/journal local.
- Lire ou importer des donnees avancees si disponibles: Volume Profile, CVD, delta, footprint, DOM, heatmap, liquidation map.

Optimal:

- Watchlist XAU/USD et BTC/USD.
- Scan automatique.
- Paper trading demo avec ordre prepare.
- Validation humaine avant execution reelle.
- Connecteurs complementaires pour BTC: donnees Binance/Bybit publiques, funding, open interest, liquidation heatmap si source autorisee.

## Mode Demo

En demo:

- Autoriser semi-automatisation avancee.
- Le skill peut proposer et preparer un ordre.
- Paper Trading doit simuler:
  - capital 200 USD;
  - levier compte 100:1 si voulu;
  - commissions/spread proches du reel;
  - sizing strict 1%.

Le skill doit journaliser tous les signaux, meme refuses.

## Mode Reel

En reel:

- Codex propose.
- Codex calcule.
- Codex refuse si risque mauvais.
- L'utilisateur valide explicitement.
- Aucune execution autonome sans validation.

## Format de Signal

```text
SIGNAL XAU/BTC
Actif:
Timeframe:
Session:
Strategie:
Biais:
Niveau cle:
POI:
Order flow:
Footprint:
Heatmap/liquidite:
Direction:
Entree:
SL:
TP:
Risque:
Taille:
Levier effectif:
Score:
Autorisation:
Validation humaine requise:
```

## Refus Automatique

Refuser si:

- Pas de SL.
- SL non structurel.
- Risque > 1%.
- R:R < 1:2.
- News rouge en blackout.
- Spread trop eleve.
- ATR hors seuil.
- Session interdite.
- Score insuffisant.
- Deuxieme trade correle sans score >= 9/12.
- BTC nuit/weekend sans conditions niveau 3.
