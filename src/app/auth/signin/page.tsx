'use client';

import { Button } from '@/components/ui/Button';
import { Card, itemRise } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { Chrome } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <motion.div variants={itemRise} initial="hidden" animate="visible" className="w-full max-w-md">
        <Card title="Welcome to Mini Dashboard" className="text-center">
          <p className="mb-6 text-sm text-zinc-400">Sign in to access your profile and personalized dashboard.</p>
          <Button onClick={() => signIn('google', { callbackUrl: '/' })} className="w-full" leftIcon={<Chrome size={20} />}>
            Continue with Google
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
