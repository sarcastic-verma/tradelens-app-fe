"use client";

import { useState } from "react";
import { LandingNavbar } from "@/components/common/landing-navbar";
import { AuthModal } from "@/components/auth/auth-modal";
import { Hero } from "@/components/landing/hero";
import { Benefits } from "@/components/landing/benefits";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Trust } from "@/components/landing/trust";
import { PainPoints } from "@/components/landing/pain-points";
import { Performance } from "@/components/landing/performance";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import { MobileStickyBar } from "@/components/landing/mobile-sticky-bar";

export const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <LandingNavbar onLoginClick={openAuthModal} />

      <main>
        <Hero onLoginClick={openAuthModal} />
        <Benefits />
        <HowItWorks />
        <Trust />
        <PainPoints />
        <Performance />
        <FAQ />
      </main>

      <Footer />
      <MobileStickyBar onLoginClick={openAuthModal} />

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </div>
  );
};
