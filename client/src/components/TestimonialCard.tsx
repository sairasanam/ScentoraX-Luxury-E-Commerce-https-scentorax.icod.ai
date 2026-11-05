import { Star } from 'lucide-react';
import { Card } from '@/components/ui';
import { cn } from '@/utils/cn';

interface TestimonialCardProps {
  quote: string;
  author: string;
  location?: string;
  rating?: number;
  className?: string;
}

export default function TestimonialCard({
  quote,
  author,
  location,
  rating = 5,
  className,
}: TestimonialCardProps) {
  return (
    <Card
      className={cn('flex flex-col gap-4 border-border/40 p-6', className)}
      data-icod-id="src_components_testimonialcard_tsx_e3af">
      <div
        className="flex gap-0.5"
        data-icod-id="src_components_testimonialcard_tsx_9759">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-primary text-primary"
            data-icod-id={`src_components_testimonialcard_tsx_e687_${i}`} />
        ))}
      </div>
      <blockquote
        className="flex-1 font-serif text-base italic leading-relaxed text-foreground/90"
        data-icod-id="src_components_testimonialcard_tsx_a4a3">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div data-icod-id="src_components_testimonialcard_tsx_68b4">
        <p
          className="text-sm font-medium text-foreground"
          data-icod-id="src_components_testimonialcard_tsx_4e5f">{author}</p>
        {location && <p
          className="text-xs text-muted-foreground"
          data-icod-id="src_components_testimonialcard_tsx_02ce">{location}</p>}
      </div>
    </Card>
  );
}
