import type {
  User as PrismaUser,
  Product as PrismaProduct,
  Category as PrismaCategory,
  Order as PrismaOrder,
  OrderItem as PrismaOrderItem,
  CartItem as PrismaCartItem,
  Address as PrismaAddress,
  Review as PrismaReview,
  ProductImage as PrismaProductImage,
  WishlistItem as PrismaWishlistItem,
  Discount as PrismaDiscount,
  Analytics as PrismaAnalytics,
  CategoriesOnProducts as PrismaCategoriesOnProducts,
  Role,
  OrderStatus,
  PaymentStatus,
  AddressType,
  DiscountType,
} from "@prisma/client";

export type Locales = "en" | "ar" | "fr";

export type { Role, OrderStatus, PaymentStatus, AddressType, DiscountType };

export type User = PrismaUser;
export type Product = PrismaProduct;
export type Category = PrismaCategory;
export type Order = PrismaOrder;
export type OrderItem = PrismaOrderItem;
export type CartItem = PrismaCartItem;
export type Address = PrismaAddress;
export type Review = PrismaReview;
export type ProductImage = PrismaProductImage;
export type WishlistItem = PrismaWishlistItem;
export type Discount = PrismaDiscount;
export type Analytics = PrismaAnalytics;
export type CategoriesOnProducts = PrismaCategoriesOnProducts;

export interface ProductWithRelations extends Product {
  images: ProductImage[];
  categories: (CategoriesOnProducts & {
    category: Category;
  })[];
  reviews: (Review & {
    user: Pick<User, "id" | "name" | "image">;
  })[];
  _count?: {
    reviews: number;
  };
  averageRating?: number;
}

export interface CategoryWithRelations extends Category {
  subcategories: Category[];
  products: (CategoriesOnProducts & {
    product: ProductWithRelations;
  })[];
  parent?: Category | null;
}

export interface OrderWithRelations extends Order {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customerInfo: any;
  user: Pick<User, "id" | "name" | "email">;
  items: (OrderItem & {
    product: ProductWithRelations;
  })[];
  shippingAddress: Address | null;
  billingAddress: Address | null;
}

export interface CartItemWithRelations extends CartItem {
  product: ProductWithRelations;
}

export interface ReviewWithRelations extends Review {
  user: Pick<User, "id" | "name" | "image">;
  product: Pick<Product, "id" | "name">;
}

export interface UserWithRelations extends User {
  addresses: Address[];
  orders: OrderWithRelations[];
  reviews: ReviewWithRelations[];
  cartItems: CartItemWithRelations[];
  wishlistItems: (WishlistItem & {
    product: ProductWithRelations;
  })[];
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sku?: string;
  featured?: boolean;
  published?: boolean;
  categoryIds: string[];
  images?: {
    url: string;
    alt?: string;
    order?: number;
  }[];
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string;
}

export interface CreateCategoryData {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {
  id: string;
}

export interface CreateOrderData {
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  shippingAddressId: string;
  billingAddressId?: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  notes?: string;
}

export interface CreateAddressData {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
  type: AddressType;
}

export interface UpdateAddressData extends Partial<CreateAddressData> {
  id: string;
}

export interface CreateReviewData {
  productId: string;
  rating: number;
  comment?: string;
  title?: string;
}

export interface UpdateReviewData extends Partial<CreateReviewData> {
  id: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export type ProductsResponse = PaginatedResponse<ProductWithRelations>;
export type OrdersResponse = PaginatedResponse<OrderWithRelations>;
export type CategoriesResponse = PaginatedResponse<CategoryWithRelations>;

export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
  search?: string;
  sortBy?: "name" | "price" | "rating" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface OrderFilters {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  startDate?: Date;
  endDate?: Date;
  minTotal?: number;
  maxTotal?: number;
}

export interface DashboardAnalytics {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  salesByDay: {
    date: Date;
    sales: number;
  }[];
  topProducts: {
    product: ProductWithRelations | null;
    totalSold: number | null;
  }[];
  ordersByStatus: {
    status: OrderStatus;
    count: number;
  }[];
}

export interface SalesAnalytics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  topSellingProducts: {
    product: ProductWithRelations;
    quantitySold: number;
    revenue: number;
  }[];
  salesByCategory: {
    category: Category;
    revenue: number;
    orderCount: number;
  }[];
  salesByMonth: {
    month: string;
    revenue: number;
    orderCount: number;
  }[];
}

export interface CartState {
  items: CartItemWithRelations[];
  total: number;
  itemCount: number;
  isLoading: boolean;
}

export interface WishlistState {
  items: (WishlistItem & {
    product: ProductWithRelations;
  })[];
  isLoading: boolean;
}

export type AuthUser = Pick<User, "id" | "name" | "email" | "image" | "role">;

export interface Session {
  user: AuthUser;
  expires: string;
}

export interface ApiError {
  message: string;
  code?: string;
  field?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface SearchResult {
  products: ProductWithRelations[];
  categories: Category[];
  total: number;
  query: string;
}

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret?: string;
}

export interface ShippingRate {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
}

export interface InventoryItem {
  productId: string;
  quantity: number;
  reserved: number;
  available: number;
  lowStockThreshold: number;
  isLowStock: boolean;
}

export interface AdminStats {
  totalProducts: number;
  totalCategories: number;
  totalUsers: number;
  totalOrders: number;
  lowStockProducts: ProductWithRelations[];
  recentOrders: OrderWithRelations[];
  topCustomers: {
    user: Pick<User, "id" | "name" | "email">;
    totalOrders: number;
    totalSpent: number;
  }[];
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface FormState<T> {
  data: T;
  errors: FormErrors;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  sorting?: {
    column: keyof T;
    direction: "asc" | "desc";
    onSort: (column: keyof T) => void;
  };
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}
