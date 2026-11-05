import { Link } from 'react-router-dom';
import { Card } from '@/components/ui';
import { cn } from '@/utils/cn';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const gradients = [
  'from-[#1a0a2e] via-[#2d1b4e] to-[#0a0a0a]',
  'from-[#0a1628] via-[#1b2d4e] to-[#0a0a0a]',
  'from-[#1a0f0a] via-[#2e1b0a] to-[#0a0a0a]',
];

export default function CategoryCard({ category, className }: CategoryCardProps) {
  const gradientIndex = category.sortOrder % gradients.length;

  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className={cn('group block', className)}
      data-icod-id="src_components_categorycard_tsx_4d26">
      <Card
        className="relative aspect-[3/4] overflow-hidden border-border/40 transition-luxury group-hover:shadow-gold"
        data-icod-id="src_components_categorycard_tsx_38e2">
        <div
          className={cn('absolute inset-0 bg-gradient-to-br', gradients[gradientIndex])}
          data-icod-id="src_components_categorycard_tsx_81f3" />
        <div
          className="absolute inset-0 bg-foreground/10 transition-luxury group-hover:bg-foreground/5"
          data-icod-id="src_components_categorycard_tsx_93fd" />
        <div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-6"
          data-icod-id="src_components_categorycard_tsx_c523">
          <p
            className="heading-luxury text-xl font-bold text-foreground"
            data-icod-id="src_components_categorycard_tsx_67d4">{category.name}</p>
          {category.description && (
            <p
              className="mt-2 line-clamp-2 text-sm text-muted-foreground"
              data-icod-id="src_components_categorycard_tsx_d04a">{category.description}</p>
          )}
        </div>
      </Card>
    </Link>
  );
}
