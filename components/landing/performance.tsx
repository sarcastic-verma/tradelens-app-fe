"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ArrowDownRight, Target, AlertTriangle } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const DATA = [
  { date: "Jan", value: 100000 },
  { date: "Feb", value: 105000 },
  { date: "Mar", value: 102000 },
  { date: "Apr", value: 112000 },
  { date: "May", value: 118000 },
  { date: "Jun", value: 115000 },
  { date: "Jul", value: 125000 },
  { date: "Aug", value: 132000 },
];

export const Performance = () => {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-5 px-2">
              Deep Performance Analytics
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Go beyond P&L screenshots. Analyze the equity curve, drawdown, and
              risk management style of every trading educator.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 bg-background rounded-2xl border border-border p-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-semibold text-foreground">Equity Curve</h3>
                <p className="text-sm text-muted">
                  Model Portfolio Performance
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-mono font-bold text-success">
                  +32.0%
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Net Return (YTD)
                </p>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#334155"
                    opacity={0.2}
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    domain={["dataMin", "auto"]}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      borderColor: "#334155",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#10b981" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side Stats */}
          <div className="space-y-6">
            <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                  <ArrowDownRight size={20} />
                </div>
                <h4 className="font-medium text-foreground">Max Drawdown</h4>
              </div>
              <p className="text-3xl font-mono font-bold text-foreground">
                -4.2%
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Low risk profile. Capital preservation priority.
              </p>
            </div>

            <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <Target size={20} />
                </div>
                <h4 className="font-medium text-foreground">
                  Avg. Risk:Reward
                </h4>
              </div>
              <p className="text-3xl font-mono font-bold text-foreground">
                1 : 3.5
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                For every ₹1 risk, targets ₹3.5 profit.
              </p>
            </div>

            <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg text-amber-600 dark:text-amber-400">
                  <AlertTriangle size={20} />
                </div>
                <h4 className="font-medium text-foreground">Risk Limit</h4>
              </div>
              <p className="text-sm text-foreground">
                Strict stops placed on all ideas. <br />
                <span className="font-bold text-foreground">
                  Hard Stop Loss
                </span>{" "}
                used 100% of time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
