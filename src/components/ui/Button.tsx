'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

export type ButtonVariant = 'default' | 'primary' | 'success' | 'danger' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
  primary: 'bg-indigo-500 text-white hover:bg-indigo-400',
  success: 'bg-emerald-500 text-white hover:bg-emerald-400',
  danger: 'bg-rose-500 text-white hover:bg-rose-400',
  outline: 'border border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800',
  ghost: 'text-zinc-100 hover:bg-zinc-800',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-3.5 text-sm',
  lg: 'h-10 px-4 text-base',
};

export function Button({
  children,
  className,
  variant = 'default',
  size = 'md',
  onClick,
  disabled,
  leftIcon,
  rightIcon,
  type = 'button',
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex select-none items-center justify-center gap-2 rounded-md font-medium shadow-sm transition-colors cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-60 cursor-not-allowed',
        className
      )}
    >
      {leftIcon && <span className="-ml-0.5 grid h-4 w-4 place-items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="-mr-0.5 grid h-4 w-4 place-items-center">{rightIcon}</span>}
    </motion.button>
  );
}
