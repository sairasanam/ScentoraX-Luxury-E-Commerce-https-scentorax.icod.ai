import { Star } from 'lucide-react';
import { cn } from '@/utils/cn';

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showCount?: boolean;
  count?: number;
}

const sizeMap = { sm: 'h-3 w-3', md: 'h-4 w-4', lg: 'h-5 w-5' };

export default function RatingStars({
  rating,
  max = 5,
  size = 'md',
  className,
  showCount,
  count,
}: RatingStarsProps) {
  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      data-icod-id="src_components_ratingstars_tsx_b6c0">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeMap[size],
            i < Math.round(rating) ? 'fill-primary text-primary' : 'text-muted-foreground/30'
          )}
          data-icod-id={`src_components_ratingstars_tsx_e8c8_${i}`} />
      ))}
      {showCount && count !== undefined && (
        <span
          className="ml-1 text-xs text-muted-foreground"
          data-icod-id="src_components_ratingstars_tsx_9658">({count})</span>
      )}
    </div>
  );
}
