"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles, LogIn } from "lucide-react";

import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all duration-300 dark:border-slate-800/80 dark:bg-slate-950/80">
      
      {/* ================================================= */}
      {/* NAVBAR CONTAINER */}
      {/* ================================================= */}
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* ================================================= */}
        {/* LOGO SECTION */}
        {/* ================================================= */}
        <div className="flex items-center gap-3">
          {/* Render Logo directly (Logo already contains its own <Link>) */}
          <Logo />
          
          {/* Status Badge */}
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Platform
          </span>
        </div>

        {/* ================================================= */}
        {/* ACTIONS (LOGIN & GET STARTED) */}
        {/* ================================================= */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Login Button */}
          <Link href="/login">
            <Button
              variant="ghost"
              className="group h-9 rounded-lg px-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <LogIn className="mr-2 h-4 w-4 text-slate-400 transition-colors group-hover:text-slate-900 dark:group-hover:text-white" />
              Login
            </Button>
          </Link>

          {/* Get Started Button */}
          <Link href="/register">
            <Button className="group relative flex h-9 items-center overflow-hidden rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100">
              <Sparkles className="mr-2 h-3.5 w-3.5 text-amber-300 transition-transform duration-300 group-hover:rotate-12" />
              
              <span>Get Started</span>

              <ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
          </Link>

        </div>

      </div>
    </header>
  );
}