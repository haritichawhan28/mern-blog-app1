import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    featuredImage: '',
    readingTime: '',
    userId: '', // Initialize empty
  });

  useEffect(() => {
    // Fetch the userId from the backend API
    const fetchUserId = async () => {
      try {
        const username = localStorage.getItem('username'); // Get username from local storage
        if (!username) {
          throw new Error("User is not logged in");
        }
        const response = await axios.get(`http://localhost:8000/authentication/getUserId?username=${username}`);
        setFormData((prevData) => ({ ...prevData, userId: response.data.userId }));
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    fetchUserId();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/blog/create', formData);
      if (response.status === 201) {
        alert('Blog created successfully!');
        setFormData({
          title: '',
          content: '',
          category: '',
          tags: '',
          featuredImage: '',
          readingTime: '',
          userId: formData.userId, // Retain userId
        });
      }
    } catch (err) {
      console.error("Failed to create blog", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your blog content here"
            rows="6"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter categories (comma separated)"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter tags (comma separated)"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Featured Image URL</label>
          <input
            type="text"
            name="featuredImage"
            value={formData.featuredImage}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image URL"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Reading Time</label>
          <input
            type="text"
            name="readingTime"
            value={formData.readingTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Estimated reading time (e.g., 5 min)"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
