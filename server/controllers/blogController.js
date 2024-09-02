import UsersDB from '../models/userModel.js';

// CREATE NEW BLOG
async function createBlog(req, res) {
    try {
        const { title, content, category, tags, featuredImage, readingTime, userId } = req.body;

        if (!title || !content || !category || !tags || !userId) {
            return res.status(400).send({ message: "Enter all the required fields" });
        }

        const user = await UsersDB.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const newBlog = { title, content, category, tags, featuredImage, readingTime };
        user.blogs.push(newBlog);
        await user.save();

        res.status(201).send({ message: "Blog created successfully", blogs: user.blogs });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// GET ALL BLOGS
async function getAllBlogs(req, res) {
    try {
        const users = await UsersDB.find().select('blogs');
        const blogs = users.flatMap(user => user.blogs);
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// GET BLOGS BY USER ID
async function getUserBlogs(req, res) {
    try {
        const user = await UsersDB.findById(req.params.userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user.blogs);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// UPDATE BLOG BY USER ID AND BLOG ID
async function updateBlog(req, res) {
    try {
        const { userId, blogId } = req.params;
        const { title, content, category, tags, featuredImage, readingTime } = req.body;

        const user = await UsersDB.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const blog = user.blogs.id(blogId);
        if (!blog) {
            return res.status(404).send({ message: "Blog not found" });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.category = category || blog.category;
        blog.tags = tags || blog.tags;
        blog.featuredImage = featuredImage || blog.featuredImage;
        blog.readingTime = readingTime || blog.readingTime;

        await user.save();
        res.status(200).send({ message: "Blog updated successfully", blog });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// DELETE BLOG BY USER ID AND BLOG ID
async function deleteBlog(req, res) {
    try {
        const { userId, blogId } = req.params;

        // Find the user by userId
        const user = await UsersDB.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Check if the blog exists in the user's blogs array
        const blogIndex = user.blogs.findIndex(blog => blog._id.toString() === blogId);
        if (blogIndex === -1) {
            return res.status(404).send({ message: "Blog not found" });
        }

        // Remove the blog from the user's blogs array
        user.blogs.splice(blogIndex, 1);

        // Save the user document
        await user.save();
        
        res.status(200).send({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export { createBlog, getAllBlogs, getUserBlogs, updateBlog, deleteBlog };
