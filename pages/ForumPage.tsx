
// pages/ForumPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { DUMMY_FORUM_POSTS } from '../constants';
import { ForumPost, Comment } from '../types';

const ForumPage: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>(DUMMY_FORUM_POSTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<ForumPost['category']>('General');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  const categories: Array<ForumPost['category'] | 'All'> = [
    'All', 'Homework Help', 'Announcements', 'Events', 'Campus Life', 'General'
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNewPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      alert('Veuillez remplir le titre et le contenu du message.');
      return;
    }
    const newPost: ForumPost = {
      id: `f${posts.length + 1}`,
      title: newPostTitle,
      content: newPostContent,
      author: 'Étudiant Démo', // Placeholder for logged-in user
      category: newPostCategory,
      date: new Date().toISOString(),
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostCategory('General');
    setShowNewPostForm(false);
  };

  const handleNewComment = (postId: string, commentContent: string) => {
    if (!commentContent.trim()) return;
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: `${post.id}c${post.comments.length + 1}`,
                  postId: postId,
                  author: 'Commentateur Démo', // Placeholder
                  content: commentContent,
                  date: new Date().toISOString(),
                },
              ],
            }
          : post
      )
    );
  };

  return (
    <div ref={pageRef} className="pt-24 pb-8 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Forum Communauté</h1>

        {/* Filters and Search */}
        <Card className="mb-8 p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <Input
            id="search-forum"
            label="Rechercher un message"
            type="text"
            placeholder="Titre, contenu, auteur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
            <label htmlFor="category-filter" className="block text-gray-700 text-sm font-medium mb-1">
              Catégorie
            </label>
            <select
              id="category-filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'Toutes les catégories' : c}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={() => setShowNewPostForm(!showNewPostForm)} className="w-full md:w-auto">
            <i className="fas fa-plus mr-2"></i> {showNewPostForm ? 'Annuler' : 'Nouveau Message'}
          </Button>
        </Card>

        {/* New Post Form */}
        {showNewPostForm && (
          <Card className="mb-8 p-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Créer un nouveau message</h2>
            <form onSubmit={handleNewPost} className="space-y-4">
              <Input
                id="new-post-title"
                label="Titre du message"
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                required
              />
              <div>
                <label htmlFor="new-post-content" className="block text-gray-700 text-sm font-medium mb-1">
                  Contenu
                </label>
                <textarea
                  id="new-post-content"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-y"
                  rows={5}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="new-post-category" className="block text-gray-700 text-sm font-medium mb-1">
                  Catégorie
                </label>
                <select
                  id="new-post-category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value as ForumPost['category'])}
                >
                  {categories.filter(c => c !== 'All').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <Button type="submit" className="w-full">
                <i className="fas fa-paper-plane mr-2"></i> Publier le message
              </Button>
            </form>
          </Card>
        )}

        {/* Forum Post List */}
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-700">{post.title}</h2>
                    <p className="text-sm text-gray-500">
                      Par <span className="font-medium">{post.author}</span> le {new Date(post.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{post.content}</p>

                {/* Comments Section */}
                {post.comments.length > 0 && (
                  <div className="mt-6 border-t pt-4 border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Commentaires ({post.comments.length})</h3>
                    <div className="space-y-4">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 p-3 rounded-md border border-gray-100">
                          <p className="font-medium text-gray-800">{comment.author}</p>
                          <p className="text-sm text-gray-600">{comment.content}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(comment.date).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const commentContent = formData.get('commentContent') as string;
                      handleNewComment(post.id, commentContent);
                      e.currentTarget.reset();
                    }}
                    className="flex space-x-2"
                  >
                    <Input
                      id={`comment-${post.id}`}
                      name="commentContent"
                      type="text"
                      placeholder="Ajouter un commentaire..."
                      className="flex-grow"
                      required
                    />
                    <Button type="submit">
                      <i className="fas fa-reply"></i>
                    </Button>
                  </form>
                </div>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-lg">Aucun message trouvé dans cette catégorie ou avec ce terme de recherche.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
