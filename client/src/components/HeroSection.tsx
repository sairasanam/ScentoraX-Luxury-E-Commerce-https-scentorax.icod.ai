import { Link } from 'react-router-dom';
import { Button, buttonClass } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import { getAssetUrl } from '@/utils/assetUrl';

interface HeroSectionProps {
  className?: string;
  featuredImage?: string;
}

// Prompt-time asset - served directly from client/public/assets/
const SIGNATURE_IMAGE_ASSET = '/assets/1791519976291_ScentoraX_Purple_Luxury_Fragrance_Ad-upload.webp';

export default function HeroSection({ className, featuredImage }: HeroSectionProps) {
  // If featuredImage is provided (from API), use getAssetUrl; otherwise use the static asset path
  const imageUrl = featuredImage ? getAssetUrl(featuredImage) : SIGNATURE_IMAGE_ASSET;

  return (
    <section
      className={cn(
        'relative flex min-h-[90vh] items-center overflow-hidden',
        className
      )}
      data-icod-id="src_components_herosection_tsx_2e14">
      {/* Background gradient layers */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#12081f] to-[#0a0a0a]"
        data-icod-id="src_components_herosection_tsx_5f61" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
        data-icod-id="src_components_herosection_tsx_7de4" />
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"
        data-icod-id="src_components_herosection_tsx_997a" />
      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8"
        data-icod-id="src_components_herosection_tsx_b0a0">
        <div
          className="grid items-center gap-12 lg:grid-cols-2"
          data-icod-id="src_components_herosection_tsx_44b1">
          {/* Text Content */}
          <div
            className="text-center lg:text-left"
            data-icod-id="src_components_herosection_tsx_fa48">
            <p
              className="heading-luxury mb-4 text-sm tracking-[0.3em] text-primary md:text-base animate-fade-in-up"
              data-icod-id="src_components_herosection_tsx_75b3">
              Pakistani Luxury Fragrances
            </p>
            <h1
              className="font-serif text-5xl font-bold leading-tight text-foreground md:text-7xl lg:text-8xl animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
              data-icod-id="src_components_herosection_tsx_c771">
              Leave a Signature.
            </h1>
            <p
              className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground md:text-xl lg:mx-0 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
              data-icod-id="src_components_herosection_tsx_2c45">
              Crafted with rare ingredients from the heart of Pakistan. Each fragrance tells a story of heritage, elegance, and timeless sophistication.
            </p>
            <div
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
              data-icod-id="src_components_herosection_tsx_fe2e">
              <Link
                to="/shop"
                className={buttonClass({ size: 'lg' })}
                data-icod-id="src_components_herosection_tsx_9051">
                Discover Collection <ArrowRight className="h-4 w-4" data-icod-id="src_components_herosection_tsx_07c7" />
              </Link>
              <Link
                to="/about"
                className={buttonClass({ variant: 'outline', size: 'lg' })}
                data-icod-id="src_components_herosection_tsx_80a4">
                Our Story
              </Link>
            </div>
          </div>

          {/* Featured Product Image */}
          {imageUrl && (
            <div
              className="relative hidden lg:block animate-fade-in"
              style={{ animationDelay: '0.4s' }}
              data-icod-id="src_components_herosection_tsx_0398">
              <div
                className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-2xl shadow-primary/20"
                data-icod-id="src_components_herosection_tsx_edb2">
                <img
                  src={imageUrl}
                  alt="ScentoraX Signature Fragrance"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  data-icod-id="src_components_herosection_tsx_43b8" />
                {/* Overlay gradient for seamless blending */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30"
                  data-icod-id="src_components_herosection_tsx_2065" />
                <div
                  className="absolute inset-0 bg-gradient-to-l from-background/40 via-transparent to-background/40"
                  data-icod-id="src_components_herosection_tsx_8441" />
              </div>
              {/* Decorative glow behind image */}
              <div
                className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-3xl"
                data-icod-id="src_components_herosection_tsx_5e5f" />
            </div>
          )}
        </div>

        {/* Mobile-only image below content */}
        {imageUrl && (
          <div
            className="mt-12 lg:hidden animate-fade-in"
            style={{ animationDelay: '0.4s' }}
            data-icod-id="src_components_herosection_tsx_c31d">
            <div
              className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl shadow-primary/20"
              data-icod-id="src_components_herosection_tsx_9761">
              <img
                src={imageUrl}
                alt="ScentoraX Signature Fragrance"
                className="h-full w-full object-cover"
                data-icod-id="src_components_herosection_tsx_d6c6" />
              <div
                className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30"
                data-icod-id="src_components_herosection_tsx_0b5c" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
