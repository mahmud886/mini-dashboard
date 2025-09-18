import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<string | false | null | undefined | number | Record<string, boolean>>) {
  return twMerge(clsx(inputs));
}
