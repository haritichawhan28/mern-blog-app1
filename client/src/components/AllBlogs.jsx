import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/blog/');
        setBlogs(response.data); // Directly use the response data as an array
      } catch (err) {
        setError('Failed to fetch blogs');
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-white mb-6">All Blogs</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              title={blog.title}
              content={blog.content}
              category={blog.category.join(', ')} // Convert array to string
              tags={blog.tags.join(', ')} // Convert array to string
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

export default AllBlogs;
