'use client';

import { Button } from '@/components/ui/Button';
import { itemRise } from '@/components/ui/Card';
import { Modal, ModalSkeleton } from '@/components/ui/Modal';
import { SkeletonTableRows } from '@/components/ui/Skeleton';
import { useFetch } from '@/hooks/useFetch';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Home, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  phone: string;
  website: string;
  address: { city: string };
};

export default function UsersPage() {
  const { data, loading, error } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');
  const [selected, setSelected] = useState<User | null>(null);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Users</h1>
      <AnimatePresence>
        {loading && (
          <div className="overflow-x-auto">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 shadow-sm">
              <table className="min-w-full table-fixed text-sm">
                <thead className="bg-zinc-900/60">
                  <tr className="text-left">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-300">Name</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-300">Email</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-300">Company</th>
                  </tr>
                </thead>
                <SkeletonTableRows rows={6} cols={3} />
              </table>
            </div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {error && (
          <div className="grid min-h-[60vh] place-items-center px-4">
            <motion.div
              variants={itemRise}
              initial="hidden"
              animate="visible"
              className="w-full max-w-lg rounded-xl border border-dashed border-red-700 bg-zinc-900 p-6 text-center shadow-sm"
            >
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-zinc-800 text-zinc-400">
                <Search size={20} />
              </div>
              <h1 className="mb-1 text-lg font-semibold">Failed to load users.</h1>
              <p className="mb-4 text-sm text-zinc-400">Try refreshing or go back to the dashboard.</p>
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
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && data && (
          <motion.div className="overflow-x-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-left ">
                  <th className="px-3 py-2 font-medium">Name</th>
                  <th className="px-3 py-2 font-medium">Email</th>
                  <th className="px-3 py-2 font-medium">Company</th>
                </tr>
              </thead>
              <motion.tbody
                key={data.length}
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              >
                {data?.map((u) => (
                  <motion.tr
                    key={u.id}
                    onClick={() => setSelected(u)}
                    className="group cursor-pointer border-b border-zinc-800 odd:bg-zinc-950/30 even:bg-zinc-900/20 hover:bg-zinc-900"
                    variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  >
                    <td className="px-4 py-3 whitespace-nowrap truncate">{u.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap truncate">{u.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap truncate">{u.company?.name}</td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {!selected ? (
          <ModalSkeleton />
        ) : (
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">Email:</span> {selected.email}
            </p>
            <p>
              <span className="font-medium">Company:</span> {selected.company?.name}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {selected.phone}
            </p>
            <p>
              <span className="font-medium">Website:</span> {selected.website}
            </p>
            <p>
              <span className="font-medium">City:</span> {selected.address?.city}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
