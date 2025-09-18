'use client';

import { Button } from '@/components/ui/Button';
import { Card, itemRise } from '@/components/ui/Card';
import { Skeleton, SkeletonAvatar } from '@/components/ui/Skeleton';
import { motion } from 'framer-motion';
import { ArrowLeft, LogOut, Mail, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Profile() {
  const router = useRouter();
  const {
    data: session,
    status,
    update,
  } = useSession({
    required: true,
    onUnauthenticated: () => {
      if (typeof window !== 'undefined') {
        router.push('/auth/signin');
      }
    },
  });

  // Reload once after successful sign-in to ensure fresh UI
  useEffect(() => {
    if (status === 'authenticated' && typeof window !== 'undefined') {
      const alreadyReloaded = sessionStorage.getItem('profileReloaded');
      if (!alreadyReloaded) {
        sessionStorage.setItem('profileReloaded', '1');
        window.location.reload();
      }
    }
  }, [status]);

  // Show loading state until authenticated AND user data is available
  if (status !== 'authenticated' || !session?.user) {
    return (
      <div className="space-y-4">
        <Link href="/" className="inline-block">
          <Button size="sm" variant="outline" leftIcon={<ArrowLeft size={14} />}>
            Back to dashboard
          </Button>
        </Link>
        <Card title="Profile" className="max-w-md">
          <div className="flex items-center gap-4">
            <SkeletonAvatar size={60} />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link href="/" className="inline-block">
        <Button size="sm" variant="outline" leftIcon={<ArrowLeft size={14} />}>
          Back to dashboard
        </Button>
      </Link>

      <motion.div variants={itemRise} initial="hidden" animate="visible" className="max-w-md">
        <Card title="Profile" className="space-y-4">
          <div className="flex items-center gap-4">
            {session?.user?.image ? (
              <Image
                src={session?.user?.image}
                alt={session?.user?.name || 'User'}
                width={96}
                height={96}
                className="h-15 w-15 rounded-full"
              />
            ) : (
              <div className="flex h-15 w-15 items-center justify-center rounded-full bg-zinc-800 text-zinc-400">
                <User size={24} />
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{session?.user?.name || 'User'}</h2>
              <p className="text-sm text-zinc-400">{session?.user?.email}</p>
            </div>
          </div>

          <div className="space-y-3 border-t border-zinc-700 pt-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-zinc-500" />
              <span className="text-zinc-300">{session?.user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <User size={16} className="text-zinc-500" />
              <span className="text-zinc-300">{session?.user?.name || 'No name provided'}</span>
            </div>
          </div>

          <div className="border-t border-zinc-700 pt-4">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<LogOut size={14} />}
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              className="w-full"
            >
              Sign out
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
