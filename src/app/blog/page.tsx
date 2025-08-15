import Link from 'next/link';

const blogPosts = [
  {
    id: '1',
    title: 'The Healing Power of Amethyst',
    excerpt: 'Discover how amethyst can help with stress relief, meditation, and spiritual growth.',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Healing'
  },
  {
    id: '2',
    title: 'How to Cleanse Your Crystals',
    excerpt: 'Learn the best methods to cleanse and charge your crystals for optimal energy.',
    date: '2024-01-12',
    readTime: '4 min read',
    category: 'Care Guide'
  },
  {
    id: '3',
    title: 'Crystal Meditation for Beginners',
    excerpt: 'A complete guide to incorporating crystals into your meditation practice.',
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'Meditation'
  },
  {
    id: '4',
    title: 'Choosing Your First Crystal',
    excerpt: 'Tips for selecting the perfect crystal to start your spiritual journey.',
    date: '2024-01-08',
    readTime: '6 min read',
    category: 'Beginner Guide'
  },
  {
    id: '5',
    title: 'The Energy of Rose Quartz',
    excerpt: 'Understanding the love and compassion properties of rose quartz.',
    date: '2024-01-05',
    readTime: '5 min read',
    category: 'Crystal Properties'
  },
  {
    id: '6',
    title: 'Creating a Crystal Grid',
    excerpt: 'Step-by-step instructions for creating powerful crystal grids.',
    date: '2024-01-03',
    readTime: '8 min read',
    category: 'Advanced'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-gray-900 mb-6">
            Crystal Wisdom Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the power of crystals through our expert guides, healing tips, and spiritual insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="aspect-video bg-gradient-to-br from-stone-100 via-amber-50 to-blue-50 flex items-center justify-center">
                <span className="text-4xl">💎</span>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-amber-800 bg-amber-100 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-amber-600 transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-serif text-gray-900 mb-4">
            Stay Updated with Crystal Wisdom
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for the latest articles, crystal guides, and spiritual insights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
