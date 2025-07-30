"use client";

import { cn } from "@/lib/utils";
import React from "react";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Image from "next/image";

export function FeatureBentoGrid() {
  return (
    <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
const SkeletonOne = () => (
  <motion.div
    initial="initial"
    whileHover="animate"
    className="flex flex-col space-y-2 w-full h-full dark:bg-dot-white/[0.2] bg-dot-black/[0.1]"
  >
    <motion.div
      variants={{
        initial: { x: 0 },
        animate: { x: 10, rotate: 5, transition: { duration: 0.2 } },
      }}
      className="flex items-center space-x-2 bg-white dark:bg-black border border-neutral-200 dark:border-white/[0.2] p-2 rounded-full"
    >
      <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
      <div className="w-full h-4 bg-gray-100 dark:bg-neutral-800 rounded-full" />
    </motion.div>
    <motion.div
      variants={{
        initial: { x: 0 },
        animate: { x: -10, rotate: -5, transition: { duration: 0.2 } },
      }}
      className="flex items-center space-x-2 bg-white dark:bg-black border border-neutral-200 dark:border-white/[0.2] p-2 w-3/4 ml-auto rounded-full"
    >
      <div className="w-full h-4 bg-gray-100 dark:bg-neutral-800 rounded-full" />
      <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
    </motion.div>
  </motion.div>
);

const SkeletonTwo = () => {
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-col space-y-2 w-full h-full dark:bg-dot-white/[0.2] bg-dot-black/[0.1]"
    >
      {arr.map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-white/[0.2] p-2"
          style={{
            maxWidth: `${Math.random() * (100 - 40) + 40}%`,
          }}
        />
      ))}
    </motion.div>
  );
};

const SkeletonThree = () => (
  <motion.div
    initial={{ backgroundPosition: "0 50%" }}
    animate={{
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    }}
    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
    className="rounded-lg h-full w-full"
    style={{
      background:
        "linear-gradient(-45deg, #00BFFF, #4B0082, #20B2AA, #00CED1)",
      backgroundSize: "400% 400%",
    }}
  />
);

const SkeletonFour = () => {
  return (
    <motion.div
      whileHover="hover"
      className="flex flex-row space-x-3 w-full h-full dark:bg-dot-white/[0.2] bg-dot-black/[0.1]"
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-white dark:bg-black border border-neutral-200 dark:border-white/[0.1] rounded-2xl p-4 flex flex-col items-center text-center"
        >
          <Image
            src="/doctor1.png" // Replace with a real image
            width={120}
            height={120}
            alt="doctor-avatar"
            className="rounded-full h-12 w-12 object-cover"
          />
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-3">
            {["Analyzing emotion", "Detecting stress", "Monitoring urgency"][i]}
          </p>
          <span className="text-xs mt-2 rounded-full px-2 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
            {["Empathy", "Calm", "Triage Priority"][i]}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};


const items = [
  {
    title: "Voice-Based Symptom Checker",
    description: (
      <span className="text-sm">
        Patients describe symptoms verbally and receive real-time analysis.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-blue-500 dark:text-blue-400" />,
  },
  {
    title: "Automated Appointment Booking",
    description: (
      <span className="text-sm">
        AI assistant books appointments and sends reminders.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-green-500 dark:text-green-400" />,
  },
  {
    title: "Real-Time EMR Summarization",
    description: (
      <span className="text-sm">
        Turn voice conversations into structured EMR notes instantly.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-purple-500 dark:text-purple-400" />,
  },
  {
    title: "Sentiment & Tone Detection",
    description: (
      <span className="text-sm">
        Understand patient emotion and urgency in real-time for better triage.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-pink-500 dark:text-pink-400" />,
  },
];
