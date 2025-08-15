import { notFound } from 'next/navigation';
import Link from 'next/link';

interface BlogPost {
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
}

const blogPostsData: { [key: string]: BlogPost } = {
  '1': {
    title: 'The Healing Power of Amethyst',
    content: `
      <p>Amethyst is one of the most beloved and powerful crystals in the world of healing and spirituality. This beautiful purple stone has been revered for centuries for its ability to calm the mind, enhance intuition, and provide protection against negative energies.</p>
      
      <h2>Properties of Amethyst</h2>
      <p>Amethyst is a variety of quartz that gets its stunning purple color from iron and aluminum deposits. The crystal is associated with the crown chakra and is known for its ability to:</p>
      <ul>
        <li>Promote mental clarity and focus</li>
        <li>Enhance meditation practices</li>
        <li>Provide protection from negative energies</li>
        <li>Support emotional healing and stress relief</li>
        <li>Improve sleep quality and prevent nightmares</li>
      </ul>
      
      <h2>How to Use Amethyst</h2>
      <p>There are many ways to incorporate amethyst into your daily life and spiritual practice:</p>
      <ul>
        <li><strong>Meditation:</strong> Hold amethyst during meditation to enhance spiritual awareness</li>
        <li><strong>Sleep:</strong> Place under your pillow or on your nightstand for restful sleep</li>
        <li><strong>Jewelry:</strong> Wear amethyst jewelry to keep its energy close to you</li>
        <li><strong>Home decor:</strong> Display amethyst clusters to purify your living space</li>
      </ul>
      
      <h2>Caring for Your Amethyst</h2>
      <p>To maintain the energy and beauty of your amethyst, cleanse it regularly using moonlight, sage smoke, or running water. Avoid prolonged exposure to direct sunlight as it may fade the color.</p>
    `,
    date: '2024-01-15',
    category: 'Healing',
    readTime: '5 min read'
  },
  '2': {
    title: 'How to Cleanse Your Crystals',
    content: `
      <p>Crystal cleansing is an essential practice for maintaining the energy and effectiveness of your crystal collection. Over time, crystals can absorb negative energies and need to be reset to their natural state.</p>
      
      <h2>Why Cleanse Crystals?</h2>
      <p>Crystals work by absorbing, storing, and transmitting energy. When they absorb negative energy, they can become energetically "clogged" and less effective. Regular cleansing helps restore their natural vibrational frequency.</p>
      
      <h2>Methods of Crystal Cleansing</h2>
      <h3>1. Moonlight Cleansing</h3>
      <p>Place your crystals under the full moon overnight. Moonlight is gentle and suitable for all types of crystals.</p>
      
      <h3>2. Sage Smudging</h3>
      <p>Pass your crystals through sage smoke to clear negative energies. This method is quick and effective for most crystals.</p>
      
      <h3>3. Running Water</h3>
      <p>Hold crystals under running water for a few minutes. Note: avoid this method for soft stones like selenite or halite.</p>
      
      <h3>4. Sound Cleansing</h3>
      <p>Use singing bowls, bells, or tuning forks to cleanse crystals with sound vibrations.</p>
      
      <h2>Charging Your Crystals</h2>
      <p>After cleansing, charge your crystals by placing them in sunlight, moonlight, or near other high-energy crystals like clear quartz or selenite.</p>
    `,
    date: '2024-01-12',
    category: 'Care Guide',
    readTime: '4 min read'
  }
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPostsData[params.id];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-stone-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-gray-700">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{post.title}</span>
        </nav>

        <article className="bg-white rounded-lg shadow-sm p-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className="inline-block px-3 py-1 text-xs font-medium text-amber-800 bg-amber-100 rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-500">{post.readTime}</span>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <p className="text-gray-500">
              Published on {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </header>

          {/* Content */}
          <div 
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link 
                href="/blog"
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                ← Back to Blog
              </Link>
              
              <div className="text-sm text-gray-500">
                Share this article
              </div>
            </div>
          </footer>
        </article>

        {/* Related Articles */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif text-gray-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                <Link href="/blog/2" className="hover:text-amber-600">
                  Crystal Meditation for Beginners
                </Link>
              </h3>
              <p className="text-gray-600 text-sm">
                A complete guide to incorporating crystals into your meditation practice.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                <Link href="/blog/3" className="hover:text-amber-600">
                  The Energy of Rose Quartz
                </Link>
              </h3>
              <p className="text-gray-600 text-sm">
                Understanding the love and compassion properties of rose quartz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
