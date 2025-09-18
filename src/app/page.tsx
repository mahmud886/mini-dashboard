'use client';

import { Badge } from '@/components/ui/Badge';
import { Card, itemRise, listStagger } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-baseline justify-between"
        style={{ opacity: 1 }}
      >
        <h1 className="text-2xl font-semibold">Welcome back 👋</h1>
        <div className="text-sm text-zinc-500">
          Explore{' '}
          <Link href="/posts" className="underline">
            Posts
          </Link>{' '}
          and{' '}
          <Link href="/users" className="underline">
            Users
          </Link>
        </div>
      </motion.div>

      <motion.div
        variants={listStagger}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        style={{ opacity: 1 }}
      >
        <Card title="Weekly Views" subtitle="12,342" variants={itemRise}>
          <div className="mt-2 h-24">
            <AnimatedBar widthPercent={76} />
          </div>
          <div className="mt-3">
            <Badge variant="primary" size="sm">
              View report
            </Badge>
          </div>
        </Card>
        <Card title="Conversion" subtitle="3.1%" variants={itemRise}>
          <div className="mt-2 h-24">
            <AnimatedBar widthPercent={31} colorClass="bg-emerald-500" />
          </div>
          <div className="mt-3">
            <Badge variant="success" size="sm">
              Improve
            </Badge>
          </div>
        </Card>
        <Card title="New Users" subtitle="+241" variants={itemRise}>
          <div className="mt-2 h-24">
            <AnimatedBar widthPercent={54} colorClass="bg-indigo-500" />
          </div>
          <div className="mt-3">
            <Badge variant="neutral" size="sm">
              Invite
            </Badge>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

function AnimatedBar({ widthPercent, colorClass = 'bg-zinc-900' }: { widthPercent: number; colorClass?: string }) {
  return (
    <div className="flex h-full items-end gap-1">
      {[...Array(12)].map((_, i) => {
        const height = Math.max(8, Math.round((Math.sin((i / 12) * Math.PI) * widthPercent) / 1.2));
        return (
          <motion.div
            key={i}
            initial={{ height: 8 }}
            animate={{ height }}
            transition={{ delay: 0.1 + i * 0.04, type: 'spring', stiffness: 120, damping: 18 }}
            className={`w-full rounded-sm ${colorClass}`}
            style={{ width: `${100 / 12}%` }}
          />
        );
      })}
    </div>
  );
}
