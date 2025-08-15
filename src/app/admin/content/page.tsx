'use client';

import { useState, useEffect } from 'react';
import {
  DocumentTextIcon,
  PhotoIcon,
  NewspaperIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

interface ContentPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  type: 'page' | 'blog' | 'faq' | 'legal';
  status: 'draft' | 'published' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: string;
  tags?: string[];
}

interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  dimensions?: { width: number; height: number };
  alt?: string;
  uploadedAt: string;
  usedIn: string[];
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  status: 'draft' | 'published' | 'scheduled';
  publishDate: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  comments: number;
  seoTitle?: string;
  seoDescription?: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState<'pages' | 'blog' | 'media' | 'faq' | 'legal'>('pages');
  const [pages, setPages] = useState<ContentPage[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    // Mock data
    const mockPages: ContentPage[] = [
      {
        id: 'PAGE-001',
        title: 'About Us',
        slug: 'about-us',
        content: '<h1>About LARIMARITA • MILENA ODA</h1><p>We are passionate about crystals and their healing properties...</p>',
        type: 'page',
        status: 'published',
        author: 'Admin',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        seoTitle: 'About Us - Premium Crystal Store',
        seoDescription: 'Learn about our story and passion for authentic healing crystals'
      },
      {
        id: 'PAGE-002',
        title: 'Contact',
        slug: 'contact',
        content: '<h1>Contact Us</h1><p>Get in touch with our crystal experts...</p>',
        type: 'page',
        status: 'published',
        author: 'Admin',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-10T14:20:00Z'
      }
    ];

    const mockBlogPosts: BlogPost[] = [
      {
        id: 'BLOG-001',
        title: 'The Healing Properties of Amethyst',
        slug: 'healing-properties-amethyst',
        excerpt: 'Discover how amethyst can enhance your spiritual journey and promote inner peace.',
        content: '<p>Amethyst is one of the most popular healing crystals...</p>',
        author: 'Milena Oda',
        category: 'Crystal Healing',
        tags: ['amethyst', 'healing', 'spirituality'],
        featuredImage: '/blog/amethyst-healing.jpg',
        status: 'published',
        publishDate: '2024-01-15T09:00:00Z',
        createdAt: '2024-01-14T16:30:00Z',
        updatedAt: '2024-01-15T08:45:00Z',
        views: 1247,
        comments: 23,
        seoTitle: 'Amethyst Healing Properties - Complete Guide',
        seoDescription: 'Learn about the powerful healing properties of amethyst crystal and how to use it for meditation and energy healing.'
      },
      {
        id: 'BLOG-002',
        title: 'How to Cleanse Your Crystals',
        slug: 'how-to-cleanse-crystals',
        excerpt: 'Learn the best methods to cleanse and charge your crystal collection.',
        content: '<p>Proper crystal cleansing is essential for maintaining their energy...</p>',
        author: 'Milena Oda',
        category: 'Crystal Care',
        tags: ['cleansing', 'maintenance', 'energy'],
        status: 'draft',
        publishDate: '2024-01-20T10:00:00Z',
        createdAt: '2024-01-16T11:00:00Z',
        updatedAt: '2024-01-16T15:20:00Z',
        views: 0,
        comments: 0
      }
    ];

    const mockMediaFiles: MediaFile[] = [
      {
        id: 'MEDIA-001',
        filename: 'amethyst-cluster-hero.jpg',
        originalName: 'Amethyst Cluster Hero.jpg',
        url: '/media/amethyst-cluster-hero.jpg',
        type: 'image',
        size: 245760,
        dimensions: { width: 1920, height: 1080 },
        alt: 'Beautiful amethyst cluster with purple crystals',
        uploadedAt: '2024-01-10T14:30:00Z',
        usedIn: ['PAGE-001', 'BLOG-001']
      },
      {
        id: 'MEDIA-002',
        filename: 'crystal-collection.jpg',
        originalName: 'Crystal Collection.jpg',
        url: '/media/crystal-collection.jpg',
        type: 'image',
        size: 189440,
        dimensions: { width: 1600, height: 900 },
        alt: 'Diverse collection of healing crystals',
        uploadedAt: '2024-01-12T09:15:00Z',
        usedIn: ['PAGE-001']
      },
      {
        id: 'MEDIA-003',
        filename: 'crystal-care-guide.pdf',
        originalName: 'Crystal Care Guide.pdf',
        url: '/media/crystal-care-guide.pdf',
        type: 'document',
        size: 1024000,
        uploadedAt: '2024-01-15T16:45:00Z',
        usedIn: []
      }
    ];

    const mockFaqs: FAQ[] = [
      {
        id: 'FAQ-001',
        question: 'How do I choose the right crystal for me?',
        answer: 'Choosing a crystal is often an intuitive process. Visit our store and see which crystals you\'re drawn to. You can also research specific properties that align with your intentions.',
        category: 'General',
        order: 1,
        isPublished: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'FAQ-002',
        question: 'How often should I cleanse my crystals?',
        answer: 'It\'s recommended to cleanse your crystals at least once a month, or more frequently if you use them regularly for healing work.',
        category: 'Crystal Care',
        order: 2,
        isPublished: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'FAQ-003',
        question: 'Do you ship internationally?',
        answer: 'Yes, we offer international shipping to most countries. Shipping rates and delivery times vary by location.',
        category: 'Shipping',
        order: 3,
        isPublished: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ];

    setPages(mockPages);
    setBlogPosts(mockBlogPosts);
    setMediaFiles(mockMediaFiles);
    setFaqs(mockFaqs);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'page':
        return 'bg-blue-100 text-blue-800';
      case 'blog':
        return 'bg-purple-100 text-purple-800';
      case 'faq':
        return 'bg-orange-100 text-orange-800';
      case 'legal':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const ContentEditor = ({ item, type, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(item || {
      title: '',
      slug: '',
      content: '',
      status: 'draft',
      seoTitle: '',
      seoDescription: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({ 
        ...formData, 
        id: item?.id || `${type.toUpperCase()}-${Date.now()}`,
        type: type,
        author: 'Admin',
        createdAt: item?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {item ? 'Edit' : 'Create'} {type.charAt(0).toUpperCase() + type.slice(1)}
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ 
                      ...formData, 
                      title: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                    });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                rows={10}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter your content here..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">SEO Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">SEO Description</label>
              <textarea
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                placeholder="Brief description for search engines..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
              >
                {item ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleSaveContent = (contentData: any) => {
    if (activeTab === 'pages') {
      if (editingItem) {
        setPages(pages.map(p => p.id === editingItem.id ? contentData : p));
      } else {
        setPages([...pages, contentData]);
      }
    } else if (activeTab === 'blog') {
      if (editingItem) {
        setBlogPosts(blogPosts.map(p => p.id === editingItem.id ? contentData : p));
      } else {
        setBlogPosts([...blogPosts, contentData]);
      }
    }
    setShowAddModal(false);
    setEditingItem(null);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage pages, blog posts, media files, and site content
            </p>
          </div>
          <button
            onClick={() => {
              setEditingItem(null);
              setShowAddModal(true);
            }}
            className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Content
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <DocumentTextIcon className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Pages</p>
                <p className="text-2xl font-bold text-gray-900">{pages.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <NewspaperIcon className="h-6 w-6 text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Blog Posts</p>
                <p className="text-2xl font-bold text-gray-900">{blogPosts.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <PhotoIcon className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Media Files</p>
                <p className="text-2xl font-bold text-gray-900">{mediaFiles.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <QuestionMarkCircleIcon className="h-6 w-6 text-orange-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">FAQs</p>
                <p className="text-2xl font-bold text-gray-900">{faqs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Legal Pages</p>
                <p className="text-2xl font-bold text-gray-900">{pages.filter(p => p.type === 'legal').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'pages', label: 'Pages', icon: DocumentTextIcon },
              { id: 'blog', label: 'Blog', icon: NewspaperIcon },
              { id: 'media', label: 'Media Library', icon: PhotoIcon },
              { id: 'faq', label: 'FAQ', icon: QuestionMarkCircleIcon },
              { id: 'legal', label: 'Legal Pages', icon: ShieldCheckIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Pages Tab */}
        {activeTab === 'pages' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pages.map((page) => (
                    <tr key={page.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{page.title}</div>
                          <div className="text-sm text-gray-500">/{page.slug}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(page.type)}`}>
                          {page.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(page.status)}`}>
                          {page.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {page.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(page.updatedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingItem(page);
                              setShowAddModal(true);
                            }}
                            className="text-amber-600 hover:text-amber-900"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publish Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          <div className="text-sm text-gray-500">{post.excerpt.substring(0, 60)}...</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.status)}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {post.views.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(post.publishDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingItem(post);
                              setShowAddModal(true);
                            }}
                            className="text-amber-600 hover:text-amber-900"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Media Library Tab */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Upload Media</h3>
              <p className="mt-1 text-sm text-gray-500">Drag and drop files here, or click to select files</p>
              <button className="mt-4 bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700">
                Choose Files
              </button>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dimensions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used In</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mediaFiles.map((file) => (
                      <tr key={file.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center mr-3">
                              {file.type === 'image' ? '🖼️' : file.type === 'video' ? '🎥' : '📄'}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{file.originalName}</div>
                              <div className="text-sm text-gray-500">{file.filename}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                            {file.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatFileSize(file.size)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {file.dimensions ? `${file.dimensions.width} × ${file.dimensions.height}` : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {file.usedIn.length} location{file.usedIn.length !== 1 ? 's' : ''}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(file.uploadedAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button className="text-amber-600 hover:text-amber-900">
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {faqs.map((faq) => (
                    <tr key={faq.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{faq.question}</div>
                          <div className="text-sm text-gray-500 mt-1">{faq.answer.substring(0, 100)}...</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                          {faq.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {faq.order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          faq.isPublished ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {faq.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(faq.updatedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-amber-600 hover:text-amber-900">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {showAddModal && (activeTab === 'pages' || activeTab === 'blog') && (
          <ContentEditor
            item={editingItem}
            type={activeTab}
            onSave={handleSaveContent}
            onCancel={() => {
              setShowAddModal(false);
              setEditingItem(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
