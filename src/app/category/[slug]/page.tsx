'use client';

import { useParams } from 'next/navigation';
import ProductGrid from '@/components/product/ProductGrid';
import { products, categories } from '@/data/products';

const CategoryPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  
  const category = categories.find(cat => cat.slug === slug);
  const categoryProducts = products.filter(product => product.category === slug);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-accent-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-accent-900 mb-4">Category Not Found</h1>
          <p className="text-accent-600">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent-50">
      {/* Category Header */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-accent-900 mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-accent-600 max-w-2xl mx-auto mb-8">
              Explore our collection of {category.name.toLowerCase()} with exceptional quality and energy
            </p>
            
            {/* Subcategories */}
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                {category.subcategories.map((sub) => (
                  <span
                    key={sub.id}
                    className="bg-white text-accent-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    {sub.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products */}
      <ProductGrid products={categoryProducts} title={`${category.name} (${categoryProducts.length})`} />
    </div>
  );
};

export default CategoryPage;
