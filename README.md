# Crystal Haven - E-commerce Website

A modern, responsive e-commerce website for crystal business built with Next.js and Tailwind CSS.

## Features

✨ **Complete E-commerce Functionality**
- Product catalog with detailed cards showing pricing and offers
- Shopping cart with quantity management
- Wishlist functionality
- User profile and order management
- Multi-step checkout process with payment flow
- Category-based filtering and search

🎨 **Modern UI/UX Design**
- Responsive design for all devices
- Beautiful gradient color scheme (blue/purple theme)
- Smooth animations and transitions
- Clean, modern interface inspired by premium crystal retailers

🛍️ **Product Management**
- Product cards with images, pricing, discounts, and ratings
- Category organization (Raw Crystals, Polished Stones, Jewelry, Home Decor)
- Product properties and origin information
- Stock status and availability

🔧 **Technical Features**
- Built with Next.js 15 and TypeScript
- Styled with Tailwind CSS
- Custom hooks for cart and wishlist management
- Local storage persistence
- SEO optimized

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout flow
│   ├── category/[slug]/   # Dynamic category pages
│   ├── profile/           # User profile page
│   └── wishlist/          # Wishlist page
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   ├── layout/           # Layout components
│   ├── product/          # Product-related components
│   ├── cart/             # Cart components
│   └── auth/             # Authentication components
├── data/                 # Mock data and product catalog
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── types/                # TypeScript type definitions
```

## Key Pages

- **Homepage** - Hero section, featured products, categories
- **Category Pages** - Filtered product listings with advanced filters
- **Shopping Cart** - Cart management with pricing breakdown
- **Wishlist** - Saved products for later
- **Checkout** - Multi-step payment process
- **Profile** - User account management and order history

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons
- **Lucide React** - Additional icon library

## Color Scheme

The website uses a carefully selected 2-3 color palette:
- **Primary**: Blue tones (#0ea5e9 to #0369a1)
- **Secondary**: Purple tones (#d946ef to #a21caf)
- **Accent**: Neutral grays (#f8fafc to #0f172a)

## Demo Features

This is a demo website with mock data. Key features include:
- 8 sample products across 4 categories
- Simulated cart and wishlist functionality
- Mock checkout process
- Sample user profile data

## Future Enhancements

- Backend integration with real API
- User authentication system
- Payment gateway integration
- Product search functionality
- Admin panel for product management
- Order tracking system
- Customer reviews and ratings

## License

This project is created as a demo for educational purposes.
