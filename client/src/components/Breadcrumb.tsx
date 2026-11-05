import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1 text-sm', className)}
      data-icod-id="src_components_breadcrumb_tsx_4578">
      {items.map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-1"
          data-icod-id={`src_components_breadcrumb_tsx_49de_${i}`}>
          {i > 0 && <ChevronRight
            className="h-3 w-3 text-muted-foreground"
            data-icod-id={`src_components_breadcrumb_tsx_e633_${i}`} />}
          {item.to ? (
            <Link
              to={item.to}
              className="text-muted-foreground hover:text-primary transition-luxury"
              data-icod-id={`src_components_breadcrumb_tsx_2dfb_${i}`}>
              {item.label}
            </Link>
          ) : (
            <span
              className="text-foreground"
              data-icod-id={`src_components_breadcrumb_tsx_1ff4_${i}`}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
