import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import type { Category } from "../types/types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function saltAndHashPassword(password: string): string {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export const productCategories: Category[] = [
  {
    id: "684ed955d04a123e49ea3add",
    name: "Electronics",
    slug: "electronics",
    parentId: null,
    createdAt: new Date("2025-06-15T10:00:00Z"),
    updatedAt: new Date("2025-06-15T10:00:00Z"),
    description: "Electronics and gadgets",
    image: "",
  },
  {
    id: "684edb90d04a123e49ea3ae0",
    name: "Clothing",
    slug: "clothing",
    parentId: null,
    createdAt: new Date("2025-06-15T11:00:00Z"),
    updatedAt: new Date("2025-06-15T11:00:00Z"),
    description: "Clothing and apparel",
    image: "",
  },
  {
    id: "684edc47d04a123e49ea3ae3",
    name: "Books",
    slug: "books",
    parentId: null,
    createdAt: new Date("2025-06-15T12:00:00Z"),
    updatedAt: new Date("2025-06-15T12:00:00Z"),
    description: "Books and literature",
    image: "",
  },
  {
    id: "684edcadd04a123e49ea3ae5",
    name: "Home & Garden",
    slug: "home-garden",
    parentId: null,
    createdAt: new Date("2025-06-15T13:00:00Z"),
    updatedAt: new Date("2025-06-15T13:00:00Z"),
    description: "Home and garden supplies",
    image: "",
  },
];
