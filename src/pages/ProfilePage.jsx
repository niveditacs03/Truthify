// ProfilePage.jsx
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

  // Mock posts data
  const INITIAL_POSTS = [
    {
      id: 1,
      imageUrl: "https://source.unsplash.com/random/800x600?blockchain",
      title: "The Future of Blockchain Technology",
      timestamp: "2025-01-25 16:45:00",
      votes: { legitimate: 156, fake: 23 },
      communityVerdict: "legitimate",
    },
    // Add more posts...
  ];

  useEffect(() => {
    loadUserPosts();
  }, []);

  const loadUserPosts = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUserPosts(INITIAL_POSTS);
      setLoading(false);
    }, 1000);
  };

  const handleLogout = async () => {
    try {
    //   if (window.ethereum) {
    //     // Disconnect from Web3
    //     await window.ethereum.request({
    //       method: "wallet_requestPermissions",
    //       params: [{ eth_accounts: {} }],
    //     });
    //   }
      // Clear local storage
      localStorage.removeItem('metamaskAccount');
      // Redirect to login
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDeletePost = (postId) => {
    setUserPosts(userPosts.filter(post => post.id !== postId));
    // In real app, make API call to delete post
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
                  <p className="text-2xl font-bold text-gray-900">{userData.stats.posts}</p>
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
      </main>
    </div>
  );
};

// Post Card Component
const PostCard = ({ post, onDelete }) => {
  const getBadgeColor = (verdict) => {
    const colors = {
      legitimate: 'border-green-500 text-green-700 bg-green-50',
      neutral: 'border-blue-500 text-blue-700 bg-blue-50',
      fake: 'border-red-500 text-red-700 bg-red-50'
    };
    return colors[verdict] || 'border-gray-300 text-gray-700 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      <div className="relative aspect-square">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div className={`absolute top-2 left-2 px-3 py-1 border-2 rounded-full text-sm font-medium ${getBadgeColor(post.communityVerdict)}`}>
          {post.communityVerdict.charAt(0).toUpperCase() + post.communityVerdict.slice(1)}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">{post.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>👍 {post.votes.legitimate}</span>
            <span>👎 {post.votes.fake}</span>
          </div>
          <span>{new Date(post.timestamp).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;