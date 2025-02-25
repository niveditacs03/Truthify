import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // User data - In a real app, this would come from your backend
  const userData = {
    username: "ashiq-firoz",
    displayName: "Ashiq Firoz",
    bio: "Blockchain Developer | AI Enthusiast | Building the future of Web3",
    aadharNumber: "XXXX-XXXX-1234",
    profileImage: "https://source.unsplash.com/random/200x200?portrait",
    walletAddress: localStorage.getItem('metamaskAccount'),
    stats: {
      posts: 42,
      truthScore: 95,
      totalVotes: 1256
    }
  };

  useEffect(() => {
    loadUserPosts();
  }, []);

  const loadUserPosts = () => {
    setLoading(true);
    
    // Load posts from localStorage that were created in HomePage
    const savedPosts = localStorage.getItem('truthifyPosts');
    if (savedPosts) {
      try {
        const allPosts = JSON.parse(savedPosts);
        // Filter posts for current user only
        const currentUserPosts = allPosts.filter(post => post.username === userData.username);
        setUserPosts(currentUserPosts);
      } catch (error) {
        console.error('Error parsing posts:', error);
        setUserPosts([]);
      }
    } else {
      setUserPosts([]);
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem('metamaskAccount');
      // Redirect to login
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDeletePost = (postId) => {
    // Remove from local state
    setUserPosts(userPosts.filter(post => post.id !== postId));
    
    // Also remove from localStorage to keep data in sync
    const savedPosts = localStorage.getItem('truthifyPosts');
    if (savedPosts) {
      try {
        const allPosts = JSON.parse(savedPosts);
        const updatedPosts = allPosts.filter(post => post.id !== postId);
        localStorage.setItem('truthifyPosts', JSON.stringify(updatedPosts));
      } catch (error) {
        console.error('Error updating localStorage:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Profile
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Profile Section */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Image */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                <img
                  src={userData.profileImage}
                  alt={userData.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{userData.displayName}</h2>
                  <p className="text-gray-500">@{userData.username}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg hover:opacity-90 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{userData.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-gray-900">{userPosts.length || 0}</p>
                  <p className="text-sm text-gray-500">Posts</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-green-600">{userData.stats.truthScore}%</p>
                  <p className="text-sm text-gray-500">Truth Score</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-gray-900">{userData.stats.totalVotes}</p>
                  <p className="text-sm text-gray-500">Total Votes</p>
                </div>
              </div>

              {/* Sensitive Info */}
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Aadhar Number:</span>
                  <span className="font-medium text-gray-900">{userData.aadharNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Wallet:</span>
                  <span className="font-medium text-gray-900">
                    {userData.walletAddress?.slice(0, 6)}...{userData.walletAddress?.slice(-4)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={() => handleDeletePost(post.id)}
            />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {!loading && userPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts yet. Create some from the home page!</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg hover:opacity-90 transition-colors"
            >
              Go to Home
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

// Post Card Component
const PostCard = ({ post, onDelete }) => {
  const formatDate = (timestamp) => {
    // Handle both string dates and numeric timestamps
    const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      <div className="relative aspect-square">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">{post.title}</h3>
        {post.body && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.body}</p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>👍 {post.votes.legitimate}</span>
            <span>👎 {post.votes.fake}</span>
          </div>
          <span>{formatDate(post.timestamp)}</span>
        </div>
        <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end">
          <button 
            onClick={() => onDelete(post.id)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;