'use client';

import { Button } from '@/components/ui/Button';
import { itemRise } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-4">
      <motion.div
        variants={itemRise}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg rounded-xl border border-dashed border-zinc-700 bg-zinc-900 p-6 text-center shadow-sm"
      >
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-zinc-800 text-zinc-400">
          <Search size={20} />
        </div>
        <h1 className="mb-1 text-lg font-semibold">Page not found</h1>
        <p className="mb-4 text-sm text-zinc-400">The page you are looking for does not exist.</p>
        <div className="flex items-center justify-center gap-2">
          <Link href="/" className="inline-block">
            <Button size="sm" leftIcon={<Home size={14} />}>
              Go home
            </Button>
          </Link>
          <Button size="sm" variant="outline" leftIcon={<ArrowLeft size={14} />} onClick={() => history.back()}>
            Go back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
