'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton';
import { useFetch } from '@/hooks/useFetch';
import { ArrowLeft, Home, Search } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

type Post = { id: number; title: string; body: string };

export default function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, loading, error } = useFetch<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);

  return (
    <div className="space-y-4">
      <Link href="/posts" className="inline-block">
        <Button size="sm" variant="outline" leftIcon={<ArrowLeft size={14} />}>
          Back to posts
        </Button>
      </Link>
      {loading && (
        <div className="rounded-xl border border-zinc-800 p-4">
          <Skeleton className="mb-3 h-5 w-2/3" />
          <SkeletonText lines={4} />
        </div>
      )}
      {!loading && (error || !data || !('id' in data) || !data.id) && (
        <div className="grid place-items-center px-2">
          <div className="w-full max-w-lg rounded-xl border border-dashed border-zinc-700 bg-zinc-900 p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-zinc-800 text-zinc-400">
              <Search size={20} />
            </div>
            <h1 className="mb-1 text-lg font-semibold">Post not found</h1>
            <p className="mb-4 text-sm text-zinc-400">The post you&apos;re looking for does not exist.</p>
            <div className="flex items-center justify-center gap-2">
              <Link href="/" className="inline-block">
                <Button size="sm" leftIcon={<Home size={14} />}>
                  Go home
                </Button>
              </Link>
              <Link href="/posts" className="inline-block">
                <Button size="sm" variant="outline" leftIcon={<ArrowLeft size={14} />}>
                  Back to posts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {data && (
        <Card title={data.title} hoverLift={false} animated={false}>
          <p className="whitespace-pre-line text-zinc-300">{data.body}</p>
        </Card>
      )}
    </div>
  );
}
