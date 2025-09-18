'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Skeleton, SkeletonText } from './Skeleton';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal
            initial={{ y: 24, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 16 }}
            className="relative z-10 w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl"
          >
            {title && <h2 className="mb-2 text-lg font-semibold">{title}</h2>}
            <div>{children}</div>
            <div className="mt-4 flex justify-end">
              <button onClick={onClose} className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-800">
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function ModalSkeleton({ title }: { title?: string }) {
  return (
    <div className="relative z-10 w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl">
      {title ? <h2 className="mb-2 text-lg font-semibold">{title}</h2> : <Skeleton className="mb-2 h-5 w-1/3" />}
      <SkeletonText lines={5} />
      <div className="mt-4 flex justify-end">
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  );
}
