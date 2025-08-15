import Hero from '@/components/layout/Hero';
import CategorySection from '@/components/layout/CategorySection';
import ProductCard from '@/components/product/ProductCard';
import ProductSlider from '@/components/layout/ProductSlider';
import { products } from '@/data/products';

export default function Home() {
  const featuredProducts = products.filter(product => product.isFeatured);

  return (
    <div className="min-h-screen bg-stone-50">
      <Hero />
      <CategorySection />
      
      {/* Product Slider */}
      <ProductSlider 
        products={products} 
        title="Featured Collection"
        subtitle="Discover our handpicked selection of premium crystals and minerals"
      />
      
      {/* Featured Products Grid */}
      <section className="section-spacing bg-gradient-to-b from-stone-50 to-white grain-overlay">
        <div className="container-luxury">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-stone-900 mb-6">
              The best of our collection
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Carefully selected crystals with exceptional energy and beauty. Each stone is unique and carries its own story.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="section-spacing bg-white grain-overlay">
        <div className="container-luxury">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-stone-900 mb-6">
              Why choose LARIMARITA • MILENA ODA?
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Your trusted partner in the world of crystals and minerals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-24 h-24 bg-gradient-to-br from-stone-800 to-stone-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-luxury group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">✨</span>
              </div>
              <h3 className="text-2xl font-heading font-semibold text-stone-900 mb-4">Premium Quality</h3>
              <p className="text-stone-600 leading-relaxed">
                Hand-selected crystals from trusted sources around the world, ensuring authenticity and high energy vibrations.
              </p>
            </div>
            
            <div className="text-center group animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-24 h-24 bg-gradient-to-br from-stone-800 to-stone-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-luxury group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">🚚</span>
              </div>
              <h3 className="text-2xl font-heading font-semibold text-stone-900 mb-4">Fast Shipping</h3>
              <p className="text-stone-600 leading-relaxed">
                Free shipping on orders over $100. Secure packaging to protect your precious stones during transit.
              </p>
            </div>
            
            <div className="text-center group animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="w-24 h-24 bg-gradient-to-br from-stone-800 to-stone-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-luxury group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">💝</span>
              </div>
              <h3 className="text-2xl font-heading font-semibold text-stone-900 mb-4">Expert Guidance</h3>
              <p className="text-stone-600 leading-relaxed">
                Our crystal experts will help you find the perfect stones for your spiritual journey and healing needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-6 leading-tight">
                  Subscribe to news
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Sign up for our <span className="text-amber-600 font-medium">VIP crystal club</span> and get access to all news and discounts.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-0">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 border border-stone-300 focus:outline-none focus:border-stone-400 text-gray-900 placeholder-gray-500"
                  />
                  <button className="bg-stone-200 hover:bg-stone-300 text-gray-900 font-medium px-8 py-4 transition-colors duration-200">
                    SUBSCRIBE
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  By entering your email you agree to{' '}
                  <a href="#" className="text-amber-600 hover:underline">
                    processing of personal data
                  </a>
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] lg:aspect-[3/4] bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-stone-50 via-amber-50 to-blue-50 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-blue-100/30"></div>
                  <div className="relative z-10 text-center space-y-4">
                    <div className="text-6xl mb-4">🏺</div>
                    <div className="flex justify-center gap-4 text-3xl">
                      <span>💎</span>
                      <span>🌸</span>
                      <span>🌾</span>
                    </div>
                    <div className="text-4xl">📦</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-100/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
