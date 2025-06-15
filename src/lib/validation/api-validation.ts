import { z } from "zod";
import {
  Role,
  OrderStatus,
  PaymentStatus,
  AddressType,
  DiscountType,
} from "@prisma/client";

export const idSchema = z.string().cuid();
export const emailSchema = z.string().email();
export const phoneSchema = z.string().min(10).max(15);
export const priceSchema = z.number().positive().max(999999.99);
export const quantitySchema = z.number().int().positive().max(999);

export const createUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: emailSchema,
  password: z.string().min(8).max(100),
  role: z.nativeEnum(Role).optional().default(Role.CUSTOMER),
});

export const updateUserSchema = createUserSchema.partial().extend({
  id: idSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
});

export const createProductSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  price: priceSchema,
  originalPrice: priceSchema,
  stock: z.number().int().min(0).max(999999),
  sku: z.string().min(1).max(100),
  featured: z.boolean(),
  published: z.boolean(),
  categoryIds: z.array(idSchema).min(1),
  images: z.array(
    z.object({
      url: z.string().url(),
      alt: z.string().max(200),
      order: z.number().int().min(0).default(0),
    }),
  ),
});

export const updateProductSchema = createProductSchema.partial().extend({
  id: idSchema,
});

export const productFiltersSchema = z.object({
  categoryId: idSchema.optional(),
  minPrice: priceSchema.optional(),
  maxPrice: priceSchema.optional(),
  inStock: z.boolean().optional(),
  featured: z.boolean().optional(),
  search: z.string().max(100).optional(),
  sortBy: z
    .enum(["name", "price", "rating", "createdAt"])
    .optional()
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
});

export const createCategorySchema = z.object({
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
  description: z.string().max(500).optional(),
  image: z.string().url().optional(),
  parentId: idSchema.optional(),
});

export const updateCategorySchema = createCategorySchema.partial().extend({
  id: idSchema,
});

export const createAddressSchema = z.object({
  name: z.string().min(1).max(100),
  street: z.string().min(1).max(200),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  zipCode: z.string().min(1).max(20),
  country: z.string().min(1).max(100),
  phone: phoneSchema.optional(),
  isDefault: z.boolean().optional().default(false),
  type: z.nativeEnum(AddressType).optional().default(AddressType.SHIPPING),
});

export const updateAddressSchema = createAddressSchema.partial().extend({
  id: idSchema,
});

export const addToCartSchema = z.object({
  productId: idSchema,
  quantity: quantitySchema,
});

export const updateCartItemSchema = z.object({
  cartItemId: idSchema,
  quantity: quantitySchema,
});

export const removeFromCartSchema = z.object({
  cartItemId: idSchema,
});

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: idSchema,
        quantity: quantitySchema,
        price: priceSchema,
      }),
    )
    .min(1),
  shippingAddressId: idSchema,
  billingAddressId: idSchema.optional(),
  subtotal: priceSchema,
  tax: z.number().min(0).max(999999.99),
  shipping: z.number().min(0).max(999999.99),
  total: priceSchema,
  notes: z.string().max(500).optional(),
});

export const updateOrderStatusSchema = z.object({
  id: idSchema,
  status: z.nativeEnum(OrderStatus),
});

export const orderFiltersSchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  minTotal: priceSchema.optional(),
  maxTotal: priceSchema.optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
});

export const createReviewSchema = z.object({
  productId: idSchema,
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
  title: z.string().max(200).optional(),
});

export const updateReviewSchema = createReviewSchema.partial().extend({
  id: idSchema,
});

export const createDiscountSchema = z.object({
  code: z.string().min(1).max(50).toUpperCase(),
  description: z.string().max(200).optional(),
  type: z.nativeEnum(DiscountType),
  value: priceSchema,
  minAmount: priceSchema.optional(),
  maxAmount: priceSchema.optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  usageLimit: z.number().int().positive().optional(),
  active: z.boolean().optional().default(true),
});

export const updateDiscountSchema = createDiscountSchema.partial().extend({
  id: idSchema,
});

export const searchSchema = z.object({
  query: z.string().min(1).max(100),
  category: idSchema.optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(50).optional().default(10),
});

export const paginationSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductFiltersInput = z.infer<typeof productFiltersSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;
export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export type RemoveFromCartInput = z.infer<typeof removeFromCartSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type OrderFiltersInput = z.infer<typeof orderFiltersSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
export type CreateDiscountInput = z.infer<typeof createDiscountSchema>;
export type UpdateDiscountInput = z.infer<typeof updateDiscountSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
