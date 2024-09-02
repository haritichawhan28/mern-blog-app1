import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import backgroundImg from '../../assets/bg.jpg';
import AllBlogs from '../../components/AllBlogs';
import CreateBlog from '../../components/CreateBlog';
import UserBlogs from '../../components/UserBlogs';
import EditBlogs from '../../components/EditBlogs';
import DeleteBlogs from '../../components/DeleteBlogs';

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState('All Blogs');

  const renderContent = () => {
    switch (selectedOption) {
      case 'All Blogs':
        return <AllBlogs />;
      case 'Create Blog':
        return <CreateBlog />;
      case 'My Blogs':
        return <UserBlogs />;
      case 'Edit Blog': 
        return <EditBlogs />;
      case 'Delete Blog':
        return <DeleteBlogs />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="fixed top-0 left-0 right-0 z-10 backdrop-blur-md bg-opacity-30 bg-black">
        <Navbar />
      </div>

      <div className="flex flex-grow pt-16"> {/* Added pt-16 to account for fixed Navbar height */}
        <div className="w-64 fixed top-16 bottom-0 z-10 backdrop-blur-md bg-opacity-30 bg-black">
          <Sidebar onSelect={setSelectedOption} />
        </div>

        <div className="flex-grow ml-64 p-8 overflow-auto backdrop-blur-md bg-opacity-30 bg-black">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
