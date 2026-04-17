"use client";

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumbs Component
 * 
 * Provides navigation context for users and search engines.
 * Includes BreadcrumbList schema for rich snippets.
 * 
 * Usage:
 * <Breadcrumbs items={[
 *   { label: 'Home', href: '/' },
 *   { label: 'Concepts', href: '/concepts' },
 *   { label: 'Accountability Gap', href: '/concepts/accountability-gap' }
 * ]} />
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Build JSON-LD for breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://thearmchairfuturist.com${item.href}`
    }))
  };

  return (
    <>
      {/* Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
        <ol 
          className="flex items-center gap-2 flex-wrap"
          itemScope 
          itemType="https://schema.org/BreadcrumbList"
        >
          {/* Home link */}
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link 
              href="/" 
              className="flex items-center gap-1 hover:text-primary transition-colors"
              itemProp="item"
            >
              <Home className="w-4 h-4" />
              <span itemProp="name" className="sr-only">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          
          {/* Breadcrumb items */}
          {items.map((item, index) => (
            <li 
              key={item.href} 
              className="flex items-center gap-2"
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              {index === items.length - 1 ? (
                // Last item - current page (not a link)
                <span className="text-foreground font-medium" itemProp="name">
                  {item.label}
                </span>
              ) : (
                // Link to parent pages
                <Link 
                  href={item.href}
                  className="hover:text-primary transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 2)} />
            </li>
          ))}
        </ol>
      </nav>

      {/* BreadcrumbList JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  );
}