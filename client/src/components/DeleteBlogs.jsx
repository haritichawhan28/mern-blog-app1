import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          throw new Error("User is not logged in");
        }

        // Get userId from username
        const userResponse = await axios.get(`http://localhost:8000/authentication/getUserId?username=${username}`);
        const userId = userResponse.data.userId;

        if (!userId) {
          throw new Error("User ID not found");
        }

        // Fetch blogs for the user
        const response = await axios.get(`http://localhost:8000/blog/${userId}`);
        setBlogs(response.data); // Directly use the response data as an array
      } catch (err) {
        setError('Failed to fetch user blogs');
        console.error(err);
      }
    };

    fetchUserBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          throw new Error("User is not logged in");
        }

        // Get userId from username
        const userResponse = await axios.get(`http://localhost:8000/authentication/getUserId?username=${username}`);
        const userId = userResponse.data.userId;

        if (!userId) {
          throw new Error("User ID not found");
        }

        // Perform delete request
        await axios.delete(`http://localhost:8000/blog/${userId}/${blogId}`);
        
        // Remove the deleted blog from the state
        setBlogs(blogs.filter(blog => blog._id !== blogId));
        alert('Blog deleted successfully');
      } catch (err) {
        setError('Failed to delete the blog');
        console.error(err);
      }
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-white mb-6">My Blogs</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-white shadow-md rounded-lg p-4 mb-6">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-600">{blog.content}</p>
              <p className="text-gray-500 mt-2">Category: {blog.category.join(', ')}</p>
              <p className="text-gray-500 mt-1">Tags: {blog.tags.join(', ')}</p>
              <p className="text-gray-500 mt-1">Reading Time: {blog.readingTime}</p>
              <img src={blog.featuredImage} alt={blog.title} className="w-full h-40 object-cover mt-4 rounded" />
              <button
                onClick={() => handleDelete(blog._id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default DeleteBlogs;
