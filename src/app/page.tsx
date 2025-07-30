"use client";

import { motion } from "motion/react";
import { FeatureBentoGrid } from "@/components/FeatureBentoGrid";
import { SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSectionOne() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#0f0f11] dark:via-[#121215] dark:to-[#0f0f11]">
      <Navbar />

      {/* Decorative Lines */}
      <GradientBorders />

      {/* Hero Content */}
      <div className="w-full max-w-6xl px-6 py-16 md:py-24 text-center">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-800 dark:text-white"
          initial="hidden"
          animate="visible"
        >
          {"Revolutionize Patient Care with AI Voice Agents"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Deliver instant, accurate medical information and support using cutting-edge AI voice assistants built for healthcare.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Link href="/sign-in">
            <Button className="w-48 text-lg py-6 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Get Started
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="mt-20 rounded-3xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          
        </motion.div>
      </div>

      <FeatureBentoGrid />
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md px-6 py-4 dark:bg-black/60 dark:border-neutral-800 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
          MediVoice AI
        </h1>
      </div>
      <div>
        {!user ? (
          <SignedOut>
            <div className="flex gap-4">
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Sign Up</Button>
              </SignUpButton>
            </div>
          </SignedOut>
        ) : (
          <div className="flex items-center gap-4">
            <UserButton />
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const GradientBorders = () => (
  <>
    <div className="absolute inset-y-0 left-0 w-px bg-neutral-200/80 dark:bg-neutral-800/80">
      <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
    </div>
    <div className="absolute inset-y-0 right-0 w-px bg-neutral-200/80 dark:bg-neutral-800/80">
      <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
    </div>
    <div className="absolute bottom-0 inset-x-0 h-px bg-neutral-200/80 dark:bg-neutral-800/80">
      <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </div>
  </>
);

export default HeroSectionOne;
