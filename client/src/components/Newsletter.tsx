import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button, Input, Field } from '@/components/ui';
import { cn } from '@/utils/cn';

interface NewsletterProps {
  className?: string;
}

export default function Newsletter({ className }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      className={cn('border-t border-border/40 bg-card/50 py-16', className)}
      data-icod-id="src_components_newsletter_tsx_73aa">
      <div
        className="mx-auto max-w-xl px-4 text-center"
        data-icod-id="src_components_newsletter_tsx_bcda">
        <h2
          className="heading-luxury text-2xl font-bold text-foreground md:text-3xl"
          data-icod-id="src_components_newsletter_tsx_39d5">
          Join the ScentoraX Circle
        </h2>
        <p
          className="mt-3 text-sm text-muted-foreground"
          data-icod-id="src_components_newsletter_tsx_1849">
          Be the first to discover new collections, exclusive offers, and the art of fragrance.
        </p>
        {submitted ? (
          <div
            className="mt-6 rounded-lg border border-success/30 bg-success/10 p-4 text-sm text-success"
            data-icod-id="src_components_newsletter_tsx_f9fd">
            Welcome to the circle. Expect something beautiful soon.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex gap-3"
            data-icod-id="src_components_newsletter_tsx_838b">
            <Field
              label=""
              className="flex-1"
              data-icod-id="src_components_newsletter_tsx_bb7b">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
                data-icod-id="src_components_newsletter_tsx_0fbd" />
            </Field>
            <Button type="submit" size="lg" data-icod-id="src_components_newsletter_tsx_e793">
              Subscribe <ArrowRight className="h-4 w-4" data-icod-id="src_components_newsletter_tsx_69ab" />
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
