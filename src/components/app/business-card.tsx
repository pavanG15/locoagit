import Link from 'next/link';
import Image from 'next/image';
import type { Business } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';

type BusinessCardProps = {
  business: Business;
};

export function BusinessCard({ business }: BusinessCardProps) {
  const image = PlaceHolderImages.find(p => p.id === business.imageId);

  return (
    <Link href={`/business/${business.slug}`} className="block group">
      <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 border">
        <div className="relative h-48 w-full">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={business.businessName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={image.imageHint}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No Image</span>
            </div>
          )}
          {business.isPremium && (
            <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground shadow">Premium</Badge>
          )}
        </div>
        <CardContent className="p-4 flex flex-col justify-between flex-1">
          <div>
            <p className="text-sm text-primary font-medium">{business.category}</p>
            <h3 className="font-semibold font-headline text-lg mt-1 truncate group-hover:text-primary">{business.businessName}</h3>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-2">
              <MapPin className="h-4 w-4 shrink-0"/>
              <span className="truncate">{business.businessAddress}, {business.city}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < business.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">({business.rating}.0)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
