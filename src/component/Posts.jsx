import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const Post = ({ post, onDelete }) => {
  const [userVote, setUserVote] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [imageError, setImageError] = useState(false);
  
  // Default image for posts without images or when image fails to load
  const DEFAULT_POST_IMAGE = "https://plus.unsplash.com/premium_photo-1740023685108-a12c27170d51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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

  // Handle image error by showing default image
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <article className="bg-white rounded-2xl shadow-card overflow-hidden animate-fade-in">
      {/* Post Header with Title */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center text-white">
              {post.username.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-sm">{post.username}</p>
              <p className="text-xs text-gray-500">
                {typeof post.timestamp === 'string' 
                  ? new Date(post.timestamp).toLocaleString() 
                  : new Date(post.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className={`px-3 py-1 border-2 rounded-full text-sm font-medium ${getBadgeColor(post.communityVerdict)}`}>
            {post.communityVerdict.charAt(0).toUpperCase() + post.communityVerdict.slice(1)}
          </div>
        </div>
        
        {/* Post Title - Made larger and bolder */}
        <h2 className="font-bold text-xl">{post.title}</h2>
      </div>

      {/* Post Image - Now with default image fallback */}
      <div className="relative aspect-[4/3] bg-gray-100">
        <img 
          src={imageError || !post.imageUrl ? DEFAULT_POST_IMAGE : post.imageUrl} 
          alt={post.title}
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Post content */}
      <div className="p-4 space-y-3">
        {post.body && <p className="text-gray-700">{post.body}</p>}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => {
                if(userVote === 'fake') {
                  post.votes.fake -= 1;
                  post.votes.legitimate += 1;
                }
                if(userVote === null)
                {
                  post.votes.legitimate+=1;
                }
                setUserVote('legitimate');
              }}
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
              onClick={() => {
                if(userVote === 'legitimate') {
                  post.votes.legitimate -= 1;
                  post.votes.fake+=1;
                }
                if(userVote === null)
                {
                  post.votes.fake += 1;
                }
                setUserVote('fake');
              }}
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

          <div className="flex items-center">
            <button 
              onClick={() => onDelete(post.id)}
              className="p-2 hover:bg-red-100 text-red-500 hover:text-red-700 rounded-full mr-2"
              title="Delete post"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;