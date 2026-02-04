"use client";

import { MessageSquare, Activity, Scale } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

export const Trust = () => {
  return (
    <section
      id="trust"
      className="w-full py-24 bg-gradient-to-b from-background to-card/30 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-foreground animate-slide-up">
              Built on Trust, <br />
              <span className="text-gradient-primary">Powered by Data.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Most trading communities are black boxes. TradeLens brings
              institutional-grade transparency to the retail ecosystem.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Scale
                    className="text-indigo-600 dark:text-indigo-400"
                    size={24}
                  />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-foreground">
                    SEBI Status Displayed
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We clearly label every creator as SEBI-registered or
                    unregistered. You decide what level of regulatory backing
                    you require before subscribing.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Activity
                    className="text-emerald-600 dark:text-emerald-400"
                    size={24}
                  />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-foreground">
                    Live Performance Tracking
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    No edited screenshots. Each trade idea is automatically
                    tracked against live market feeds. Outcomes
                    (Reached/Invalidated) are immutable.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
                  <MessageSquare
                    className="text-orange-600 dark:text-orange-400"
                    size={24}
                  />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-foreground">
                    Verified Member Feedback
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Only members with active paid access can leave ratings and
                    reviews. Zero fake testimonials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ScrollReveal delay={200}>
            <div className="relative mt-8 lg:mt-0">
              {/* Abstract Code/Data visual - Keeping dark theme for code aesthetic */}
              <div className="bg-card rounded-xl border border-border p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 mb-4 border-b border-border pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-muted-foreground text-[10px] sm:text-xs">
                    audit_log.json
                  </span>
                </div>
                <div className="space-y-1 sm:space-y-2 text-muted-foreground">
                  <div className="opacity-50">{"{"}</div>
                  <div className="pl-2 sm:pl-4">
                    <span className="text-purple-400">&quot;event_id&quot;</span>:{" "}
                    <span className="text-success">&quot;evt_88392&quot;</span>,
                  </div>
                  <div className="pl-2 sm:pl-4">
                    <span className="text-purple-400">&quot;creator_id&quot;</span>:{" "}
                    <span className="text-success">&quot;cr_theta&quot;</span>,
                  </div>
                  <div className="pl-2 sm:pl-4">
                    <span className="text-purple-400">&quot;trade_idea&quot;</span>: {"{"}
                  </div>
                  <div className="pl-4 sm:pl-8">
                    <span className="text-purple-400">&quot;ticker&quot;</span>:{" "}
                    <span className="text-yellow-200">&quot;BANKNIFTY&quot;</span>,
                  </div>
                  <div className="pl-4 sm:pl-8">
                    <span className="text-purple-400">&quot;entry&quot;</span>:{" "}
                    <span className="text-blue-400">44500.00</span>,
                  </div>
                  <div className="pl-4 sm:pl-8">
                    <span className="text-purple-400">&quot;time&quot;</span>:{" "}
                    <span className="text-success">&quot;09:15:00Z&quot;</span>,
                  </div>
                  <div className="pl-4 sm:pl-8">
                    <span className="text-purple-400">&quot;status&quot;</span>:{" "}
                    <span className="text-success">&quot;VERIFIED&quot;</span>
                  </div>
                  <div className="pl-2 sm:pl-4">{"},"}</div>
                  <div className="pl-2 sm:pl-4">
                    <span className="text-purple-400">&quot;source&quot;</span>:{" "}
                    <span className="text-success">&quot;NSE_REALTIME&quot;</span>
                  </div>
                  <div className="opacity-50">{"}"}</div>
                </div>
              </div>
              {/* Badge floating */}
              <div className="absolute -bottom-4 right-4 sm:-bottom-6 sm:-right-6 bg-card text-foreground border border-border px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-xl font-bold flex items-center gap-2 text-sm sm:text-base z-10 transition-colors">
                <Activity className="text-success w-4 h-4 sm:w-5 sm:h-5" />
                Real-time Audit
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
