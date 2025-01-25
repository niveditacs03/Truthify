// HomePage.jsx
import React, { useState } from 'react';
import Post from '../component/Posts'; 

const HomePage = () => {
  // Mock data for posts - in real app this would come from an API
  const [posts] = useState([
    {
      id: 1,
      username: "ashiq-firoz",
      imageUrl: "https://source.unsplash.com/random/1",
      title: "Breaking: New Technology Breakthrough",
      timestamp: "2025-01-25 16:56:05",
      votes: {
        legitimate: 156,
        fake: 23
      },
      communityVerdict: "legitimate", // legitimate, neutral, fake
    },
    // Add more mock posts...
  ]);

return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                    Truthify
                </h1>
                <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                        </svg>
                    </button>
                    <a href="/profile" className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center text-white font-medium">
                        AF
                    </a>
                </div>
            </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </main>
    </div>
);
};

export default HomePage;