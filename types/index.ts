
interface Dimensions {
    width: number;
    height: number;
    depth: number;
  }
  
  interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }
  
  interface Meta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  }
  
export interface IProduct {
    id: number;
    title: string;
    description: string;
    category: 'beauty';
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: ('beauty' | 'mascara')[];
    brand: 'Essence';
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: 'Low Stock' | 'In Stock' | 'Out of Stock';
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    thumbnail: string;
    images: string[];
    isBookmarked?: boolean
  }