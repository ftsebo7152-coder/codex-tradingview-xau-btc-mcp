---
name: trader-xau-btc
description: "Skill de trading intraday semi-automatise dedie uniquement a XAU/USD et BTC/USD. Utiliser pour analyser XAU/USD, BTC/USD, l'or, le bitcoin, TradingView, Paper Trading, Daily Sweep, OPR, OB + FVG, Liquidity Sweep, Liquidity Sweep + Volume Zone, Fibonacci 61.8 + OB, London Breakout, structure de marche, stop-loss, sizing, levier, news macro, API news/fundamentals, DXY, US10Y, BTC funding/open interest, sessions Londres/New York, journal de trading, backtest, forward test, rentabilite demo, gestion du risque et validation d'un setup long ou short."
---

# Trader XAU/BTC

Skill intraday semi-automatise pour XAU/USD et BTC/USD uniquement.

Objectif: assister la decision de trading, filtrer les mauvais setups, calculer le risque, produire un plan executable en demo, puis en reel seulement apres validation humaine explicite.

Ne jamais promettre la rentabilite. Le skill cherche un processus robuste, mesurable et ameliorable.

## Regles Absolues

1. Refuser tout trade sans stop-loss defini avant l'entree.
2. Risque initial par trade: 1% du capital, sauf plan de progression valide par journal.
3. Capital de reference initial: 200 USD en demo, configure comme le futur reel.
4. Levier compte possible: 100:1 en Paper Trading, mais le levier effectif est controle par la taille de position, la distance du SL et la marge.
5. Mode reel: aucune execution sans confirmation humaine explicite.
6. Actifs autorises: XAU/USD et BTC/USD seulement.
7. Style: day trading intraday, pas scalping. Entrees M15, confirmation possible M5, biais H1/H4/D1.
8. Maximum 4 trades par jour, optimal 2 a 3 trades. Si deux pertes consecutives, un seul trade supplementaire autorise.
9. Stop quotidien: -3% du capital. Stop hebdomadaire: -6% en phase apprentissage ou -10% maximum en regime mature.
10. Aucun trade si une news haute importance rend le risque non maitrisable.
11. Avant tout briefing pre-session XAU/USD ou BTC/USD, appeler `codex_pre_session_json` si le MCP news/fundamentals est disponible.
12. Si `blackout.tradeAllowed` est false, refuser toute nouvelle entree.

## Ordre de Lecture Obligatoire

Lire les references selon la demande:

- Toujours lire `references/03-risk-capital-levier.md` avant de proposer une entree.
- Pour tout briefing pre-session, lire `references/02-fondamental-macro-news.md` puis `references/04-sessions-timing.md`.
- Pour toute analyse graphique, lire `references/01-technique-structure.md`.
- Pour choisir un setup, lire `references/05-strategies-playbooks.md`.
- Pour revue, optimisation ou suivi demo, lire `references/06-journal-amelioration.md`.
- Pour interaction TradingView/Codex/MCP, lire `references/07-tradingview-mcp-workflow.md`.
- Pour lecture professionnelle du flux d'ordres, lire `references/08-orderflow-footprint-heatmap.md` si des donnees de volume, delta, footprint, heatmap, liquidation map, DOM, CVD ou Volume Profile sont disponibles.
- Pour ajouter ou evaluer une strategie intraday, lire `references/09-strategies-statistiques.md`.
- Pour utiliser les APIs news/macro/BTC, lire `references/10-mcp-news-fundamentals.md`.

## Workflow Standard

### 1. Pre-session

1. Appeler `codex_pre_session_json asset=XAUUSD|BTCUSD session=london|new_york timezone=Europe/Paris` si le MCP news/fundamentals est connecte.
2. Si le MCP news n'est pas disponible, verifier manuellement le calendrier economique: Investing.com, ForexFactory, Financial Juice, InvestingLive.
3. Lire le biais hebdomadaire: ING Think, Fed, DXY, US10Y, geopolitiques, COT, ETF BTC.
4. Ne jamais inventer une news, un chiffre macro, un funding, un open interest ou une headline.
5. Si une source API est indisponible, reduire la confiance et ne pas compenser par une supposition.
6. Marquer les niveaux: PDH, PDL, PDC, daily open, asian range, OPR, swing highs/lows, EQH/EQL, OB, FVG, breaker, mitigation, premium/discount.
7. Lire le flux d'ordres si disponible: Volume Profile, delta, CVD, footprint, heatmap, liquidations, DOM.
8. Classer la session: XAU session autorisee ou interdite; BTC niveau 1, 2 ou 3.
9. Definir le biais: long, short ou neutre. Si contradiction forte, rester neutre.

### 2. Detection du Setup

Priorite d'apprentissage:

1. Semaines 1 a 3: OB + FVG Retest uniquement.
2. Ajouter Liquidity Sweep + Reversal seulement apres 30 trades OB + FVG et Profit Factor > 1.5.
3. Ajouter Fibonacci 61.8 + OB ensuite.
4. Ajouter London Breakout uniquement pour XAU/USD.
5. Ajouter OPR et Daily Sweep quand la lecture des niveaux journaliers est stable.
6. Ajouter les filtres order flow/footprint/heatmap seulement si les donnees sont disponibles et comprises; ne jamais inventer ces donnees.
7. Ajouter Liquidity Sweep + Volume Zone seulement quand les donnees de volume, Volume Profile, order book, delta ou CVD sont disponibles.

Un setup doit obtenir le score minimum adapte a la session:

- XAU/USD: 7/12 minimum en session autorisee, 8/12 pour news ou lundi matin.
- BTC niveau 1: 7/12.
- BTC niveau 2: 8/12.
- BTC niveau 3 nuit/weekend: 9/12 et taille reduite de 50%.

### 3. Plan de Trade

Chaque plan doit fournir:

```text
Actif:
Session:
Strategie:
Biais HTF:
Direction:
Zone d'entree:
Stop-loss:
Take-profit 1/2/3:
Distance SL:
Risque en USD et en %:
Taille de position:
Levier effectif:
Marge estimee:
R:R:
Score /12:
Confirmation order flow:
Contexte fondamental/news:
Blackout news:
Trade autorise: oui/non
Condition d'invalidation:
Raison du refus si non:
```

### 4. Gestion

- TP1: fermer 50%, deplacer le SL a break-even si le prix confirme.
- TP2: fermer 30%, verrouiller un gain partiel.
- TP3: laisser courir 20% si le contexte reste valide.
- Ne jamais elargir le SL.
- Sortir avant fin de session si le trade n'est pas resolu et que le contexte se degrade.

### 5. Journal et Amelioration

Apres chaque trade:

1. Journaliser la these, l'entree, le SL, les TP, le resultat en R, les emotions et le respect des regles.
2. Ajouter une capture avant/apres si disponible.
3. Mettre a jour les scores par strategie chaque semaine.
4. Ne passer au reel qu'apres plusieurs mois demo avec respect des regles, Profit Factor > 1.5, drawdown maitrise et au moins 80 a 100 trades journalises.
