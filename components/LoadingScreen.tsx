"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <div className="bg-grid absolute inset-0 opacity-30 mask-radial" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-full bg-accent/20 blur-2xl animate-pulse-soft" />
            <Image
              src="/loreon-logo.jpg"
              alt="LoreonLabs"
              width={72}
              height={72}
              priority
              className="relative rounded-2xl ring-1 ring-white/10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6 text-sm font-medium tracking-tight text-foreground"
          >
            Loreon<span className="text-muted">Labs</span>
          </motion.div>

          <div className="mt-4 h-0.5 w-32 overflow-hidden rounded-full bg-border">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-full w-full bg-gradient-to-r from-transparent via-accent to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
