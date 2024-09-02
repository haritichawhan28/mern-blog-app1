import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditBlogForm from './EditBlogForm'; // Ensure you have the correct path for this import

const EditBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          throw new Error("User is not logged in");
        }
        const response = await axios.get(`http://localhost:8000/authentication/getUserId?username=${username}`);
        setUserId(response.data.userId);
      } catch (err) {
        setError('Failed to fetch user ID');
        console.error(err);
      }
    };

    const fetchBlogs = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://localhost:8000/blog/${userId}`);
          setBlogs(response.data || []); // Directly use the response data as an array
        }
      } catch (err) {
        setError('Failed to fetch blogs');
        console.error(err);
      }
    };

    fetchUserId();
    fetchBlogs();
  }, [userId]);

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-white mb-6">Edit Your Blogs</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={blog.featuredImage} alt={blog.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-2">{blog.content}</p>
                <p className="text-gray-500 text-sm mb-2">Category: {blog.category.join(', ')}</p>
                <p className="text-gray-500 text-sm mb-2">Tags: {blog.tags.join(', ')}</p>
                <p className="text-gray-500 text-sm mb-4">{blog.readingTime}</p>
                <button
                  onClick={() => handleEditClick(blog)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No blogs available</p>
        )}
      </div>
      {selectedBlog && <EditBlogForm blog={selectedBlog} />}
    </div>
  );
};

export default EditBlogs;
