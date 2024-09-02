import React from 'react';
import { FaHome, FaPlus, FaEdit, FaTrash, FaBook } from 'react-icons/fa';

const Sidebar = ({ onSelect }) => {
  return (
    <div className="bg-gray-900 text-white w-64 h-screen p-5">
      <ul className="space-y-6">
        <li
          onClick={() => onSelect('All Blogs')}
          className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-md cursor-pointer"
        >
          <FaBook className="text-xl" />
          <span>All Blogs</span>
        </li>
        <li
          onClick={() => onSelect('Create Blog')}
          className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-md cursor-pointer"
        >
          <FaPlus className="text-xl" />
          <span>Create Blog</span>
        </li>
        <li
          onClick={() => onSelect('My Blogs')}
          className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-md cursor-pointer"
        >
          <FaHome className="text-xl" />
          <span>My Blogs</span>
        </li>
        <li
          onClick={() => onSelect('Edit Blog')}
          className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-md cursor-pointer"
        >
          <FaEdit className="text-xl" />
          <span>Edit Blog</span>
        </li>
        <li
          onClick={() => onSelect('Delete Blog')}
          className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-md cursor-pointer"
        >
          <FaTrash className="text-xl" />
          <span>Delete Blog</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
