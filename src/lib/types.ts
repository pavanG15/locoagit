export type Business = {
  id: string;
  slug: string;
  businessName: string;
  ownerName: string;
  businessAddress: string;
  city: 'Pune' | 'Nagpur' | 'Mumbai';
  category: 'Restaurant' | 'Electronics' | 'Medical' | 'Clothing' | 'Services';
  contactNumber: string;
  email: string;
  gstNumber?: string;
  shopRegistrationNumber?: string;
  description: string;
  rating: number;
  isPremium: boolean;
  imageId: string;
};
