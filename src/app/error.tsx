'use client';

import { Button } from '@/components/ui/Button';
import { itemRise } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="grid min-h-[60vh] place-items-center px-4">
      <motion.div
        variants={itemRise}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center shadow-sm"
      >
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-red-500/10 text-red-400">
          <AlertTriangle size={20} />
        </div>
        <h1 className="mb-1 text-lg font-semibold">Something went wrong</h1>
        <p className="mb-4 text-sm text-zinc-400">
          {process.env.NODE_ENV === 'development' && error?.message ? error.message : 'An unexpected error occurred.'}
        </p>
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<RefreshCw size={14} />} onClick={() => reset()}>
            Try again
          </Button>
          <Link href="/" className="inline-block">
            <Button size="sm" leftIcon={<Home size={14} />}>
              Go home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
