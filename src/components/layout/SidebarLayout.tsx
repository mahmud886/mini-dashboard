'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, LogIn, LogOut, Newspaper, User, Users } from 'lucide-react';
import type { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type NavItem = { href: string; label: string; icon?: React.ReactNode };

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: <Home size={16} /> },
  { href: '/posts', label: 'Posts', icon: <Newspaper size={16} /> },
  { href: '/users', label: 'Users', icon: <Users size={16} /> },
];

const getAuthItems = (session: Session | null, status: string) => {
  if (status === 'loading') return [];
  if (session) {
    return [{ href: '/profile', label: 'Profile', icon: <User size={16} /> }];
  }
  return [];
};

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // desktop width toggle
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile off-canvas toggle
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Detect desktop and set defaults
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const setByMQ = () => {
      setIsDesktop(mql.matches);
      setCollapsed(!mql.matches);
      setDrawerOpen(false);
    };
    setByMQ();
    mql.addEventListener('change', setByMQ);
    return () => mql.removeEventListener('change', setByMQ);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Backdrop for mobile */}
      {drawerOpen && <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setDrawerOpen(false)} />}

      <motion.aside
        initial={false}
        animate={{
          width: isDesktop ? (collapsed ? 72 : 240) : drawerOpen ? 240 : 72,
          x: 0,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="fixed right-0 top-0 z-40 h-screen w-60 shrink-0 border-l border-zinc-800 bg-zinc-900/70 backdrop-blur md:sticky md:z-auto md:w-auto md:translate-x-0 md:right-0 md:ml-auto"
      >
        <div className="flex h-full flex-col">
          <nav className="mt-2 space-y-1 px-2">
            {/* Nav items */}
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href} className="block" aria-current={active ? 'page' : undefined}>
                  <motion.div
                    whileHover={{ x: -4 }}
                    className={cn(
                      'relative flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-zinc-800',
                      active && 'bg-zinc-800 text-zinc-50'
                    )}
                  >
                    <span className={cn('grid h-5 w-5 place-items-center text-zinc-400', active && 'text-zinc-100')}>{item.icon}</span>
                    <AnimatePresence initial={false}>
                      {(isDesktop ? !collapsed : drawerOpen) && (
                        <motion.span
                          key="label"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.15 }}
                          className="truncate"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {active && <span className="absolute right-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-zinc-100" />}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
          {/* Auth actions footer */}
          <div className="mt-auto border-t border-zinc-700 p-2">
            {status === 'loading' ? (
              <div className="flex items-center gap-3 rounded-md px-2 py-2">
                <div className="h-5 w-5 animate-pulse rounded bg-zinc-700" />
                {(isDesktop ? !collapsed : drawerOpen) && <div className="h-4 w-20 animate-pulse rounded bg-zinc-700" />}
              </div>
            ) : session ? (
              <div className="space-y-1">
                {/* Auth items */}
                {getAuthItems(session, status).map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} className="block" aria-current={active ? 'page' : undefined}>
                      <motion.div
                        whileHover={{ x: -4 }}
                        className={cn(
                          'relative flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-zinc-800',
                          active && 'bg-zinc-800 text-zinc-50'
                        )}
                      >
                        <span className={cn('grid h-5 w-5 place-items-center text-zinc-400', active && 'text-zinc-100')}>{item.icon}</span>
                        <AnimatePresence initial={false}>
                          {(isDesktop ? !collapsed : drawerOpen) && (
                            <motion.span
                              key="label"
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -8 }}
                              transition={{ duration: 0.15 }}
                              className="truncate"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {active && <span className="absolute right-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-zinc-100" />}
                      </motion.div>
                    </Link>
                  );
                })}
                <div className="flex items-center gap-3 rounded-md px-2 py-2 text-sm">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      width={20}
                      height={20}
                      className="h-5 w-5 rounded-full"
                    />
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 text-zinc-400">
                      <User size={12} />
                    </div>
                  )}
                  {(isDesktop ? !collapsed : drawerOpen) && <span className="truncate text-zinc-300">{session.user?.name || 'User'}</span>}
                </div>
                <motion.button
                  whileHover={{ x: -4 }}
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-zinc-400 hover:bg-zinc-800"
                >
                  <LogOut size={16} />
                  {(isDesktop ? !collapsed : drawerOpen) && <span>Sign out</span>}
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ x: -4 }}
                onClick={() => signIn('google', { callbackUrl: '/profile' })}
                className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-zinc-400 hover:bg-zinc-800"
              >
                <LogIn size={16} />
                {(isDesktop ? !collapsed : drawerOpen) && <span>Sign in</span>}
              </motion.button>
            )}
          </div>
        </div>
      </motion.aside>

      <div className="flex-1 md:mr-0 mr-[72px]">
        <div className="flex items-center justify-between">
          <div className="px-3">
            <button
              aria-label="Toggle sidebar"
              onClick={() => (isDesktop ? setCollapsed((s) => !s) : setDrawerOpen((s) => !s))}
              className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-zinc-800"
            >
              {(isDesktop ? !collapsed : drawerOpen) ? (
                <>
                  <ChevronLeft size={14} />
                </>
              ) : (
                <ChevronRight size={14} />
              )}
            </button>
          </div>
          <div className="flex h-14 items-center justify-between px-3">
            <Link href="/" className="text-sm font-semibold">
              Mini Dashboard
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-full px-4 py-6">{children}</div>
      </div>
    </div>
  );
}
