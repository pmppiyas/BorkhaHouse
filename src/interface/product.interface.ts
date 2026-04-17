export type TProductStatus =
  | 'IN_STOCK'
  | 'OUT_OF_STOCK'
  | 'DISCONTINUED'
  | 'UPCOMING';

export interface IProduct {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  summary?: string;

  price: number;
  discount?: number;
  costPrice?: number;
  solded: number;
  categoryId: string;
  subCategoryId?: string;
  brand?: string;
  isBig?: boolean;
  stock: number;
  sku: string;
  status: TProductStatus;

  images: string[];
  thumbnail: string;
  colors?: string[];
  sizes?: string[];
  material?: string;

  isFeatured: boolean;
  isTodayDeal?: boolean;
  ratings: {
    average: number;
    count: number;
  };

  createdAt?: Date;
  updatedAt?: Date;
}

export type IOptions = {
  page?: string | number;
  limit?: string | number;
  sortBy?: string;
  sortOrder?: string;
};

export type IProductType =
  | 'banner'
  | 'new_arraival'
  | 'best_seller'
  | 'deal_of_the_day'
  | 'just_for_you';

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  parentId?: string;
  children?: ICategory[];
}
