'use client';

import { Button } from '@/components/ui/Button';
import { Card, itemRise, listStagger } from '@/components/ui/Card';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { useFetch } from '@/hooks/useFetch';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCw, ShieldAlert, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Post = { id: number; title: string; body: string };

export default function PostsPage() {
  const [fail, setFail] = useState(false);
  const url = fail
    ? 'https://jsonplaceholder.typicode.com/invalid-posts' //for intentional error
    : 'https://jsonplaceholder.typicode.com/posts'; // for successful request

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
      {error && <p className="text-sm text-red-600">Failed to load posts. Try again or disable the error.</p>}

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
