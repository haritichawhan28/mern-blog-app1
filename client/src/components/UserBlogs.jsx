import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const UserBlogs = () => {
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

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-white mb-6">My Blogs</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              title={blog.title}
              content={blog.content}
              category={blog.category.join(', ')} 
              tags={blog.tags.join(', ')}
              featuredImage={blog.featuredImage}
              readingTime={blog.readingTime}
            />
          ))
        ) : (
          <p className="text-gray-500">No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default UserBlogs;
