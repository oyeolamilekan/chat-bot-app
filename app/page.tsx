'use client'
import { Feature, Hero, Navigation } from "@/components/landing-page";

export default function Home() {
  return (
    <div className="w-screen min-h-screen pb-10 bg-gradient-to-r from-rose-100 to-teal-100">
      <Navigation />
      <Hero />
      <Feature />
    </div>
  );
}
