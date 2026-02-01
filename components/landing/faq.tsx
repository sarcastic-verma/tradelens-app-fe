"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "./scroll-reveal";

const faqs = [
  {
    question: "What is TradeLens?",
    answer:
      "TradeLens is India's first creator verification platform. We help members discover, compare, and subscribe to trading creators with real-time accuracy tracking, SEBI verification badges, and authentic community reviews.",
  },
  {
    question: "How do you verify SEBI registration?",
    answer:
      "We verify each creator's SEBI registration number directly against the official SEBI database. Verified advisors receive a 'SEBI Verified' badge on their profile. Non-verified creators can still join the platform, but are clearly marked as 'Not SEBI Verified'.",
  },
  {
    question: "Can non-SEBI registered creators join?",
    answer:
      "Yes! We welcome all trading creators to our platform. However, we clearly distinguish between SEBI-verified and non-verified creators. All creators undergo the same performance tracking, so users can make informed decisions based on actual results.",
  },
  {
    question: "How does accuracy tracking work?",
    answer:
      "Every trade recommendation is automatically logged and verified against real market data. We calculate win rates, risk/reward ratios, and overall returns. No more edited screenshots or fake P&L claims — just transparent, verifiable performance.",
  },
  {
    question: "Who can leave reviews?",
    answer:
      "Only paid subscribers can rate and review creators. This prevents fake testimonials and ensures all reviews come from people who have actually used the service. We believe in authentic feedback only.",
  },
  {
    question: "How do I join?",
    answer:
      "You can sign up immediately by clicking the 'Get Started' button. We are open for both creators and members. Create an account to start exploring verified traders or to list your own services.",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="relative py-16 md:py-28 px-4 bg-gradient-to-b from-background to-card/30 overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 hero-glow opacity-50" />
      <div className="absolute top-1/3 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 md:w-64 h-48 md:h-64 bg-success/5 rounded-full blur-3xl" />

      <div className="container max-w-3xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
              Everything you need to know about TradeLens.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-xl px-5 md:px-6 bg-card/50 data-[state=open]:bg-card data-[state=open]:border-primary/30 transition-all duration-200"
              >
                <AccordionTrigger className="text-left text-sm md:text-base font-medium py-4 md:py-5 hover:no-underline hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground pb-4 md:pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
};
