import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/app/header';
import { businesses } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin, Phone, Mail } from 'lucide-react';

type BusinessProfilePageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return businesses.map((business) => ({
    slug: business.slug,
  }))
}

export default function BusinessProfilePage({ params }: BusinessProfilePageProps) {
  const business = businesses.find(b => b.slug === params.slug);

  if (!business) {
    notFound();
  }

  const image = PlaceHolderImages.find(p => p.id === business.imageId);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-8 md:py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="overflow-hidden">
                <div className="relative h-64 md:h-[450px] w-full bg-muted">
                  {image ? (
                    <Image
                      src={image.imageUrl}
                      alt={business.businessName}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">No Image</span>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-primary font-semibold">{business.category}</p>
                      <CardTitle className="text-3xl lg:text-4xl font-headline mt-1">{business.businessName}</CardTitle>
                    </div>
                    {business.isPremium && <Badge className="bg-accent text-accent-foreground text-sm px-3 py-1">Premium</Badge>}
                  </div>
                  <div className="flex items-center gap-1 pt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < business.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">({business.rating}.0 rating)</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Separator className="my-4" />
                  <h3 className="font-semibold text-xl mb-3 font-headline">About {business.businessName}</h3>
                  <p className="text-muted-foreground leading-relaxed">{business.description}</p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-headline">Contact & Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-foreground">{business.businessAddress}, {business.city}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                    <a href={`tel:${business.contactNumber}`} className="text-foreground hover:text-primary">{business.contactNumber}</a>
                  </div>
                   <Separator />
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
                    <a href={`mailto:${business.email}`} className="text-foreground hover:text-primary truncate">{business.email}</a>
                  </div>
                </CardContent>
              </Card>

              {!business.isPremium && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl font-headline">Go Premium!</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">Get more visibility and features by upgrading your profile.</p>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Upgrade to Premium</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
