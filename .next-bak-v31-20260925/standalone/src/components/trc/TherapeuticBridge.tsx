"use client";

import { motion } from 'framer-motion';

interface TherapeuticBridgeProps {
  children: React.ReactNode;
  delay?: number;
}

export default function TherapeuticBridge({ children, delay = 0 }: TherapeuticBridgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className="bg-gradient-to-br from-[#1F6F78]/5 to-[#3DD4B0]/5
        border border-[#1F6F78]/10 rounded-2xl p-6 md:p-8"
    >
      {children}
    </motion.div>
  );
}
