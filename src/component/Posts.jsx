import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const Post = ({ post }) => {
  const [userVote, setUserVote] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const getBadgeColor = (verdict) => {
    switch(verdict) {
      case 'legitimate': return 'border-green-500';
      case 'neutral': return 'border-blue-500';
      case 'fake': return 'border-red-500';
      default: return 'border-gray-300';
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <article className="bg-white rounded-2xl shadow-card overflow-hidden animate-fade-in">
      {/* Post Header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center text-white">
            {post.username.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-sm">{post.username}</p>
            <p className="text-xs text-gray-500">
              {new Date(post.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className={`px-3 py-1 border-2 rounded-full text-sm font-medium ${getBadgeColor(post.communityVerdict)}`}>
          {post.communityVerdict.charAt(0).toUpperCase() + post.communityVerdict.slice(1)}
        </div>
      </div>

      {/* Post Image */}
      <div className="relative aspect-[4/3] bg-gray-100">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="p-4 space-y-3">
        <h2 className="font-medium text-lg">{post.title}</h2>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setUserVote('legitimate')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                userVote === 'legitimate' 
                  ? 'bg-green-100 text-green-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>{post.votes.legitimate}</span>
            </button>

            <button 
              onClick={() => setUserVote('fake')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                userVote === 'fake' 
                  ? 'bg-red-100 text-red-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <span>{post.votes.fake}</span>
            </button>

            <button 
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                isLiked 
                  ? 'text-red-500' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Heart
                className={`w-5 h-5 transition-transform ${
                  isLiked ? 'fill-current scale-110' : ''
                }`}
              />
              <span>{likeCount}</span>
            </button>
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default Post;