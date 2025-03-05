import React, { useState, useEffect } from "react";
import Post from "../component/Posts";

const HomePage = () => {
  const initialPosts = [
    {
      id: 1,
      username: "ashiq-firoz",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1681400678259-255b10890b08?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Breaking: New Technology Breakthrough",
      body: "Scientists have made a groundbreaking discovery that could change everything we know about renewable energy.",
      timestamp: "2025-01-25 16:56:05",
      votes: {
        legitimate: 156,
        fake: 23,
      },
      communityVerdict: "legitimate", // legitimate, neutral, fake
    },
  ];

  // Load posts from localStorage if available, otherwise use initialPosts
  const loadSavedPosts = () => {
    const savedPosts = localStorage.getItem("truthifyPosts");
    if (savedPosts) {
      return JSON.parse(savedPosts);
    }
    return initialPosts;
  };

  // State to manage the post list
  const [postList, setPostList] = useState(loadSavedPosts);

  // State to control the visibility of the form popup
  const [showPostForm, setShowPostForm] = useState(false);

  // State to store the new post content
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Save posts to localStorage whenever postList changes
  useEffect(() => {
    localStorage.setItem("truthifyPosts", JSON.stringify(postList));
  }, [postList]);

  // Function to handle image selection
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // For a real app, you'd upload to a server. Here we're just creating a preview URL
      const imageFile = e.target.files[0];
      setNewPostImage(imageFile);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  // Function to add a new post to the list
  const addPost = () => {
    // Only add if title is not empty
    if (newPostTitle.trim() === "") return;

    // Create a new post with auto-generated id and timestamp
    const post = {
      id: Date.now(), // Use timestamp as ID for unique values
      username: "ashiq-firoz", // Assuming current user
      imageUrl:
        imagePreview ||
        "https://source.unsplash.com/random/" + (postList.length + 1),
      title: newPostTitle,
      body: newPostBody,
      timestamp: Date.now(),
      votes: {
        legitimate: 0,
        fake: 0,
      },
      communityVerdict: "neutral", // Default for new posts
    };

    // Add the new post to the list
    setPostList([post, ...postList]); // Add to beginning of the list

    // Reset form and hide it
    setNewPostTitle("");
    setNewPostBody("");
    setNewPostImage(null);
    setImagePreview(null);
    setShowPostForm(false);
  };

  // Function to delete a post
  const deletePost = (postId) => {
    setPostList(postList.filter((post) => post.id !== postId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Truthify
          </h1>
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setShowPostForm(true)}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            <a
              href="/profile"
              className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center text-white font-medium"
            >
              AF
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Post Form Modal */}
        {showPostForm && (
          <div
            className="fixed inset-0 w-full h-full flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Create New Post</h2>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Enter post title"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="body"
                >
                  Body
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  id="body"
                  placeholder="Enter post content"
                  value={newPostBody}
                  onChange={(e) => setNewPostBody(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  Attach Image
                </label>
                <input
                  className="block w-full text-sm text-gray-500
                                       file:mr-4 file:py-2 file:px-4
                                       file:rounded file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-blue-50 file:text-blue-700
                                       hover:file:bg-blue-100"
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-40 rounded border border-gray-200"
                    />
                    <button
                      onClick={() => {
                        setImagePreview(null);
                        setNewPostImage(null);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm mt-1"
                    >
                      Remove image
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => {
                    setShowPostForm(false);
                    setNewPostTitle("");
                    setNewPostBody("");
                    setNewPostImage(null);
                    setImagePreview(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={addPost}
                  disabled={!newPostTitle.trim()}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {postList.map((post) => (
          <Post key={post.id} post={post} onDelete={deletePost} />
        ))}

        {postList.length === 0 && (
          <p className="text-center text-gray-600">Post something :)</p>
        )}
      </main>
    </div>
  );
};

export default HomePage;
