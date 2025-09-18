'use client';

import { cn } from '@/lib/utils';
import { motion, Variants } from 'framer-motion';
import React from 'react';

export type CardProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  hoverLift?: boolean;
  animated?: boolean;
  variants?: Variants;
  onClick?: () => void;
};

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Card({
  title,
  subtitle,
  footer,
  children,
  className,
  as = 'div',
  hoverLift = true,
  animated = true,
  variants = defaultVariants,
  onClick,
}: CardProps) {
  const Component = animated ? (motion[as as keyof typeof motion] as React.ComponentType<Record<string, unknown>>) : as;
  const base = cn(
    'rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm',
    hoverLift && 'transition-transform duration-200 will-change-transform hover:-translate-y-0.5',
    className
  );

  const content = (
    <>
      {(title || subtitle) && (
        <div className="mb-2">
          {typeof title !== 'undefined' && <h3 className="text-base font-semibold text-zinc-100">{title}</h3>}
          {typeof subtitle !== 'undefined' && <p className="mt-0.5 text-sm text-zinc-400">{subtitle}</p>}
        </div>
      )}
      {children}
      {typeof footer !== 'undefined' && <div className="mt-3 text-sm text-zinc-400">{footer}</div>}
    </>
  );

  if (animated && typeof Component !== 'string') {
    return (
      <Component
        className={base}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        onClick={onClick}
      >
        {content}
      </Component>
    );
  }

  const StaticComponent = as as React.ElementType;
  return (
    <StaticComponent className={base} onClick={onClick}>
      {content}
    </StaticComponent>
  );
}

export const listStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export const itemRise: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};
