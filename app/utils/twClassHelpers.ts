import { Breakpoints } from '@/ui/params/types';

export function breakPointsToClass(
  breakPointsAndValues: Record<Breakpoints, any>,
  property: string
) {
  return Object.entries(breakPointsAndValues)
    .map(([key, value]) => `${key}:${property}-${value}`)
    .join(' ');
}
