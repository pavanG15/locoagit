import Header from '@/components/app/header';
import BusinessListings from '@/components/app/business-listings';
import { businesses } from '@/lib/data';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-banner');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-64 md:h-96">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-md">
              Find Your Next Local Favorite
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl text-white/90">
              Discover the best businesses in your city, from cozy cafes to trusted services.
            </p>
          </div>
        </section>

        <BusinessListings initialBusinesses={businesses} />
      </main>
      <footer className="bg-muted text-muted-foreground py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} LocalPulse. All rights reserved.</p>
      </footer>
    </div>
  );
}
