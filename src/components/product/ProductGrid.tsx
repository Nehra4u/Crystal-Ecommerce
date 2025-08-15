'use client';

import { useState } from 'react';
import { Product, Filter } from '@/types';
import ProductCard from './ProductCard';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid = ({ products, title = "Products" }: ProductGridProps) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filter>({
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const categories = Array.from(new Set(products.map(p => p.category)));
  const maxPrice = Math.max(...products.map(p => p.price));

  const applyFilters = (newFilters: Filter) => {
    let filtered = [...products];

    // Category filter
    if (newFilters.category) {
      filtered = filtered.filter(p => p.category === newFilters.category);
    }

    // Price range filter
    if (newFilters.priceRange) {
      filtered = filtered.filter(p => 
        p.price >= newFilters.priceRange![0] && p.price <= newFilters.priceRange![1]
      );
    }

    // In stock filter
    if (newFilters.inStock !== undefined) {
      filtered = filtered.filter(p => p.inStock === newFilters.inStock);
    }

    // Rating filter
    if (newFilters.rating) {
      filtered = filtered.filter(p => p.rating >= newFilters.rating!);
    }

    // Sorting
    if (newFilters.sortBy) {
      filtered.sort((a, b) => {
        let aValue: string | number, bValue: string | number;
        
        switch (newFilters.sortBy) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'rating':
            aValue = a.rating;
            bValue = b.rating;
            break;
          case 'newest':
            aValue = a.isNew ? 1 : 0;
            bValue = b.isNew ? 1 : 0;
            break;
          default:
            aValue = a.name;
            bValue = b.name;
        }

        if (newFilters.sortOrder === 'desc') {
          return aValue > bValue ? -1 : 1;
        }
        return aValue < bValue ? -1 : 1;
      });
    }

    setFilteredProducts(filtered);
    setFilters(newFilters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-accent-900">{title}</h2>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          Filters
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg border border-accent-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-accent-700 mb-2">
                Category
              </label>
              <select
                value={filters.category || ''}
                onChange={(e) => applyFilters({ ...filters, category: e.target.value || undefined })}
                className="w-full border border-accent-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-accent-700 mb-2">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  min="0"
                  max={maxPrice}
                  onChange={(e) => {
                    const min = parseInt(e.target.value) || 0;
                    const max = filters.priceRange?.[1] || maxPrice;
                    applyFilters({ ...filters, priceRange: [min, max] });
                  }}
                  className="w-full border border-accent-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  min="0"
                  max={maxPrice}
                  onChange={(e) => {
                    const max = parseInt(e.target.value) || maxPrice;
                    const min = filters.priceRange?.[0] || 0;
                    applyFilters({ ...filters, priceRange: [min, max] });
                  }}
                  className="w-full border border-accent-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-accent-700 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy || 'name'}
                onChange={(e) => applyFilters({ ...filters, sortBy: e.target.value as Filter['sortBy'] })}
                className="w-full border border-accent-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Additional Filters */}
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.inStock === true}
                  onChange={(e) => applyFilters({ 
                    ...filters, 
                    inStock: e.target.checked ? true : undefined 
                  })}
                  className="rounded border-accent-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-accent-700">In Stock Only</span>
              </label>
              
              <div>
                <label className="block text-sm font-medium text-accent-700 mb-1">
                  Min Rating
                </label>
                <select
                  value={filters.rating || ''}
                  onChange={(e) => applyFilters({ 
                    ...filters, 
                    rating: e.target.value ? parseFloat(e.target.value) : undefined 
                  })}
                  className="w-full border border-accent-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="mt-4 pt-4 border-t border-accent-200">
            <Button
              variant="outline"
              onClick={() => {
                setFilters({ sortBy: 'name', sortOrder: 'asc' });
                setFilteredProducts(products);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-accent-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-accent-500 text-lg">No products found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setFilters({ sortBy: 'name', sortOrder: 'asc' });
              setFilteredProducts(products);
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
