# ShopFlow

A modern, full-featured e-commerce application built with Next.js App Router, featuring a sleek design, powerful admin capabilities, and seamless user experience.

## Features

- 🛍️ **Product Catalog**: Browse products with pagination or infinite scroll
- 🔍 **Search & Filter**: Advanced search functionality with category filtering
- 🛒 **Shopping Cart**: Full cart management with Jotai state management
- 💳 **Secure Checkout**: Robust checkout process with form validation
- 📦 **Order Management**: Complete order tracking, history, and status updates
- 👤 **User Authentication**: Secure login and registration with NextAuth.js
- ⚙️ **Admin Panel**: Comprehensive CRUD operations for product management
- 📊 **Analytics Dashboard**: Sales and order analytics with data visualization
- 🌙 **Theme Support**: Light and dark mode with next-themes
- 📱 **Responsive Design**: Mobile-first design optimized for all devices
- ✨ **Smooth Animations**: Engaging animations powered by Framer Motion
- 🔄 **Loading States**: Enhanced UX with skeleton loaders
- 🌐 **Internationalization**: Multi-language support with next-intl
- 🚀 **SEO Optimized**: SEO-friendly pages with proper metadata

## Tech Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Runtime**: Bun
- **Database**: MongoDB with Prisma ORM
- **Authentication**: Auth.js (NextAuth.js v5)
- **State Management**: Jotai
- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS and Shadcn UI
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Theme**: next-themes
- **API Documentation**: Scalar

## Prerequisites

- [Bun](https://bun.sh/) (latest version)
- MongoDB database
- Node.js 18+ (for compatibility)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/shopflow.git
cd shopflow
```

### 2. Install dependencies

```bash
bun install
```

### 3. Environment Setup

Create a `.env` file in the root directory and copy the contents from `.env.example`:

```bash
cp .env.example .env
```

Then fill in your environment variables in the `.env` file:

```env
DATABASE_URL=mongodb+srv://aymenbachiri99:fQhxuDHtEjafM4JI@cluster0.1xzfuy8.mongodb.net/shopFlow?retryWrites=true&w=majority&appName=Cluster0
AUTH_SECRET="jCmp6XaX/PkuRATrNgqaVhFQM3t3eINbOmxGTVLlzXk="
NEXT_PUBLIC_API_URL="http://localhost:3000"

```

### 4. Database Setup

Generate Prisma client and push schema to database:

```bash
bunx prisma generate
bunx prisma db push
bunx prisma db seed
```

### 5. Run the development server

```bash
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `bun dev` - Start development server
- `bun run build` - Build the application for production
- `bun start` - Start the production server
- `bun lint` - Run ESLint for code linting
- `bunx prisma studio` - Open Prisma Studio for database management
- `bunx prisma generate` - Generate Prisma client
- `bunx prisma db push` - Push schema changes to database

## API Documentation

Interactive API documentation is available at `/reference` when the application is running. Visit [http://localhost:3000/reference](http://localhost:3000/reference) to explore the API endpoints and test them directly in the browser.

## Key Dependencies

### Core Framework

- **next**: React framework with App Router
- **react**: UI library
- **prisma**: Database ORM and client

### Authentication & Security

- **next-auth**: Authentication solution
- **@auth/mongodb-adapter**: MongoDB adapter for NextAuth
- **@auth/prisma-adapter**: Prisma adapter for NextAuth
- **bcryptjs**: Password hashing

### UI & Styling

- **@radix-ui/**: Accessible UI primitives
- **tailwind-merge**: Utility for merging Tailwind classes
- **class-variance-authority**: Styling variants utility
- **lucide-react**: Icon library
- **next-themes**: Theme management

### State Management & Forms

- **jotai**: Atomic state management
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Schema validation

### Animations & UX

- **motion**: Animation library (Framer Motion)
- **lenis**: Smooth scrolling
- **nextjs-toploader**: Loading indicator
- **sonner**: Toast notifications

### Developer Experience

- **@scalar/nextjs-api-reference**: API documentation
- **next-intl**: Internationalization
- **clsx**: Conditional class names
