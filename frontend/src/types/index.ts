// ... existing imports ...

export interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  categoryId: string;
  inventory: number;
  images: string[];
  vendorId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
}

export interface FlashSaleType {
  id: string;
  productId: string;
  discount: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  product: ProductType;
}
