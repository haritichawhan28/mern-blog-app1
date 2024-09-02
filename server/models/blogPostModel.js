import mongoose from 'mongoose';

const blogPostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  featuredImage: {
    type: String,
  },
  readingTime: {
    type: String,
  },
}, { timestamps: true });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;
