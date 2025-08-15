export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-gray-900 mb-6">
            About LARIMARITA • MILENA ODA
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Your trusted partner in the world of crystals and spiritual healing
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-serif text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              LARIMARITA • MILENA ODA was founded with a passion for bringing the transformative 
              power of crystals into people&apos;s lives. We believe that crystals are not just beautiful 
              objects, but powerful tools for healing, protection, and spiritual growth.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our journey began with a deep fascination for the natural world and its healing 
              properties. Over the years, we have carefully curated a collection of the finest 
              crystals from around the world, each hand-selected for its quality and energy.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-serif text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To provide authentic, high-quality crystals and spiritual accessories that support 
              your journey towards healing, growth, and inner peace. We are committed to ethical 
              sourcing and ensuring that every crystal carries positive energy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">
                Hand-selected crystals from trusted sources worldwide
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ethical Sourcing</h3>
              <p className="text-gray-600 text-sm">
                Committed to responsible and sustainable practices
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Guidance</h3>
              <p className="text-gray-600 text-sm">
                Professional advice for your spiritual journey
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
