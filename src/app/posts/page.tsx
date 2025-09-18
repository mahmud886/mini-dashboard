'use client';

import { Button } from '@/components/ui/Button';
import { Card, itemRise, listStagger } from '@/components/ui/Card';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { useFetch } from '@/hooks/useFetch';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RefreshCw, Search, ShieldAlert, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Post = { id: number; title: string; body: string };

export default function PostsPage() {
  const [fail, setFail] = useState(false);
  const url = fail
    ? 'https://jsonplaceholder.typicode.com/invalid-posts' //for intentional error url
    : 'https://jsonplaceholder.typicode.com/posts'; // for successful request url

  const { data, loading, error, refetch } = useFetch<Post[]>(url);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Posts</h1>
        <div className="flex items-center gap-2 text-sm">
          <Button
            variant={fail ? 'success' : 'danger'}
            size="sm"
            leftIcon={fail ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
            onClick={() => setFail((s) => !s)}
          >
            {fail ? 'Disable error' : 'Simulate error'}
          </Button>
          <Button variant="outline" size="sm" leftIcon={<RefreshCw size={14} />} onClick={() => refetch()}>
            Refresh
          </Button>
        </div>
      </div>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

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
              <h1 className="mb-1 text-lg font-semibold">Failed to load posts. </h1>
              <p className="mb-4 text-sm text-zinc-400">Try again or disable the error.</p>
              <div className="flex items-center justify-center gap-2">
                <Button size="sm" variant="outline" leftIcon={<ArrowLeft size={14} />} onClick={() => history.back()}>
                  Go back
                </Button>
                <Button
                  variant={fail ? 'success' : 'danger'}
                  size="sm"
                  leftIcon={fail ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                  onClick={() => setFail((s) => !s)}
                >
                  {fail ? 'Disable error' : 'Simulate error'}
                </Button>
                <Button variant="outline" size="sm" leftIcon={<RefreshCw size={14} />} onClick={() => refetch()}>
                  Refresh
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div variants={listStagger} initial="hidden" animate="visible" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.slice(0, 18).map((post) => (
          <Card
            key={post.id}
            title={post.title}
            variants={itemRise}
            footer={
              <Link href={`/posts/${post.id}`} className="inline-block">
                <Button size="sm" variant="ghost" rightIcon={<ArrowRight size={14} />}>
                  Read more
                </Button>
              </Link>
            }
          >
            <p className="line-clamp-3 text-sm text-zinc-300">{post.body}</p>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
