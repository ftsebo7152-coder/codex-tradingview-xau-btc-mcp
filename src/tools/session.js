import { z } from "zod";
import { jsonResult } from "./_format.js";
import * as core from "../core/session.js";

export function registerSessionTools(server) {
  server.tool(
    "session_start",
    "Start a structured Codex trading desk session for TradingView Desktop. Optimized for XAU/USD and BTC/USD, with a generic mode for other pairs.",
    {
      asset: z.string().default("XAUUSD").describe("XAUUSD, BTCUSD, or another symbol/pair."),
      session: z.enum(["london", "new_york", "full_day"]).default("london"),
      mode: z.enum(["paper", "live"]).default("paper"),
      capital: z.coerce.number().default(200),
      risk_pct: z.coerce.number().default(1),
      scan_interval_minutes: z.coerce.number().default(15),
      set_chart: z.coerce.boolean().default(true),
      symbol: z.string().optional().describe("TradingView symbol override, e.g. OANDA:XAUUSD or BINANCE:BTCUSDT."),
      timeframe: z.string().optional().describe("TradingView timeframe override, e.g. 15, 60, 240."),
    },
    async (args) => {
      try {
        return jsonResult(await core.startSession(args));
      } catch (err) {
        return jsonResult({ success: false, error: err.message }, true);
      }
    },
  );

  server.tool("session_status", "Return the active Codex trading desk session state.", {}, async () => {
    try {
      return jsonResult(core.getSessionStatus());
    } catch (err) {
      return jsonResult({ success: false, error: err.message }, true);
    }
  });

  server.tool(
    "session_scan_now",
    "Run an immediate structured market scan for the active session. This reads chart context and returns a decision template; it does not execute trades.",
    {
      include_screenshot: z.coerce.boolean().default(false),
      include_pine_drawings: z.coerce.boolean().default(true),
      ohlcv_count: z.coerce.number().default(80),
      pine_filter: z.string().optional(),
    },
    async (args) => {
      try {
        return jsonResult(await core.scanNow(args));
      } catch (err) {
        return jsonResult({ success: false, error: err.message }, true);
      }
    },
  );

  server.tool(
    "session_pause",
    "Pause the active session, for example before a high-impact news release.",
    {
      reason: z.string().optional(),
    },
    async (args) => {
      try {
        return jsonResult(core.pauseSession(args));
      } catch (err) {
        return jsonResult({ success: false, error: err.message }, true);
      }
    },
  );

  server.tool("session_resume", "Resume a paused session.", {}, async () => {
    try {
      return jsonResult(core.resumeSession());
    } catch (err) {
      return jsonResult({ success: false, error: err.message }, true);
    }
  });

  server.tool(
    "session_stop",
    "Stop the active session and write a journal event.",
    {
      notes: z.string().optional(),
    },
    async (args) => {
      try {
        return jsonResult(core.stopSession(args));
      } catch (err) {
        return jsonResult({ success: false, error: err.message }, true);
      }
    },
  );

  server.tool(
    "risk_calculate_position",
    "Calculate position size from capital, risk percentage, entry, stop-loss and point value. Use before every trade.",
    {
      capital: z.coerce.number().default(200),
      risk_pct: z.coerce.number().default(1),
      entry: z.coerce.number(),
      stop_loss: z.coerce.number(),
      point_value: z.coerce.number().default(1),
    },
    async (args) => {
      try {
        return jsonResult(core.calculateRisk(args));
      } catch (err) {
        return jsonResult({ success: false, error: err.message }, true);
      }
    },
  );

  server.tool(
    "trade_validate_plan",
    "Validate a proposed trade plan before execution: SL, R:R, score and human validation rules.",
    {
      direction: z.string(),
      entry: z.coerce.number(),
      stop_loss: z.coerce.number(),
      take_profit: z.coerce.number(),
      score: z.coerce.number().default(0),
      rr_min: z.coerce.number().default(2),
      mode: z.enum(["paper", "live"]).default("paper"),
      human_validated: z.coerce.boolean().default(false),
    },
    async (args) => {
      try {
        return jsonResult(core.validateTradePlan(args));
      } catch (err) {
        return jsonResult({ success: false, error: err.message }, true);
      }
    },
  );
}
