"use client";

import { format } from 'date-fns';
import { Clock, RefreshCw } from 'lucide-react';

interface LastUpdatedProps {
  date: string | Date;
  showIcon?: boolean;
  className?: string;
}

/**
 * LastUpdated Component
 * 
 * Displays "Last updated" date with schema markup for E-E-A-T signals.
 * Tells search engines when content was last modified.
 * 
 * Usage:
 * <LastUpdated date="2026-03-29" />
 * <LastUpdated date={new Date()} showIcon />
 */
export default function LastUpdated({ date, showIcon = true, className = '' }: LastUpdatedProps) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const formattedDate = format(dateObj, 'MMMM d, yyyy');
  const isoDate = format(dateObj, 'yyyy-MM-dd');

  return (
    <div 
      className={`text-xs text-muted-foreground flex items-center gap-1.5 ${className}`}
      itemProp="dateModified"
      content={isoDate}
    >
      {showIcon && <RefreshCw className="w-3 h-3" />}
      <span>
        Last updated: {formattedDate}
      </span>
      <meta itemProp="dateModified" content={isoDate} />
    </div>
  );
}