'use client';

import { motion } from 'framer-motion';

export function Skeleton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      aria-hidden
      className={`animate-pulse rounded-md bg-zinc-800 ${className}`}
      style={style}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.2, repeat: Infinity }}
    />
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-3 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <Skeleton className="h-5 w-1/3" />
      </div>
      <SkeletonText lines={3} />
      <div className="mt-3">
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonTableRows({ rows = 6, cols = 3 }: { rows?: number; cols?: number }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} className="border-b border-zinc-800 odd:bg-zinc-950/30 even:bg-zinc-900/20">
          {Array.from({ length: cols }).map((_, c) => (
            <td key={c} className="px-4 py-3">
              <Skeleton className="h-4 w-3/4" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <Skeleton className="rounded-full" style={{ width: size, height: size }} />;
}
