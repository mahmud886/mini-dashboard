'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

type BadgeVariant = 'neutral' | 'primary' | 'success' | 'danger';
type BadgeSize = 'sm' | 'md';

export type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  onClick?: () => void;
  disabled?: boolean;
};

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-zinc-800 text-zinc-100 ring-1 ring-inset ring-zinc-700 hover:bg-zinc-700/80',
  primary: 'bg-indigo-900/40 text-indigo-200 ring-1 ring-inset ring-indigo-800 hover:bg-indigo-900/60',
  success: 'bg-emerald-900/40 text-emerald-200 ring-1 ring-inset ring-emerald-800 hover:bg-emerald-900/60',
  danger: 'bg-rose-900/40 text-rose-200 ring-1 ring-inset ring-rose-800 hover:bg-rose-900/60',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3.5 py-1.5 text-sm',
};

export function Badge({ children, className, variant = 'neutral', size = 'md', onClick, disabled }: BadgeProps) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex select-none items-center gap-1 rounded-full font-medium shadow-sm transition-colors cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-60 cursor-not-allowed',
        className
      )}
    >
      {children}
    </motion.button>
  );
}
