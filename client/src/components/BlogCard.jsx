import React from 'react';

const BlogCard = ({ title, content, category, tags, featuredImage, readingTime }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
      {featuredImage && (
        <img
          src={featuredImage}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-700 mb-4 line-clamp-3">{content}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Category: {category}</span>
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Tags: {tags}</span>
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Reading Time: {readingTime}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
