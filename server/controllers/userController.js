import UsersDB from '../models/userModel.js';

// CREATE NEW USER
async function createUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send({ message: "Enter all the required fields" });
        }

        // Check if user already exists
        const existingUser = await UsersDB.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists" });
        }

        const user = new UsersDB({ username, email, password });
        const newUser = await user.save();

        res.status(201).send({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// LOGIN USER
async function loginUser(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({ message: "Enter all the required fields" });
        }

        // Check if user exists
        const user = await UsersDB.findOne({ username, password });
        if (!user) {
            return res.status(400).send({ message: "Invalid username or password" });
        }

        res.status(200).send({ message: "Login successful", user });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// GET USER ID
async function getUserId(req, res) {
    try {
        const { username } = req.query; // Assuming you pass the username as a query parameter
        if (!username) {
            return res.status(400).send({ message: "Username is required" });
        }

        const user = await UsersDB.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ userId: user._id });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export { createUser, loginUser, getUserId };
