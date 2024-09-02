import mongoose from 'mongoose';

const blogPostSchema = mongoose.Schema({
  title: String,
  content: String,
  category: [String],
  tags: [String],
  featuredImage: String,
  readingTime: String,
}, { timestamps: true });

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: [blogPostSchema],
}, { timestamps: true });

const Users = mongoose.model("Users", userSchema);
export default Users;
