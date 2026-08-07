const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const user = await UserModel.findOne({ email: normalizedEmail });

        // Same generic response whether the email doesn't exist or the
        // password is wrong — was two distinct status codes/messages
        // before, which lets an attacker enumerate registered emails.
        const genericFail = () =>
            res.status(401).json({ message: "Invalid email or password." });

        if (!user) {
            return genericFail();
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return genericFail();
        }

        if (!process.env.SECRET_KEY) {
            // Fails loudly and specifically instead of falling through to
            // jwt.sign throwing and getting swallowed into a generic 500.
            console.error("SECRET_KEY is not set");
            return res.status(500).json({ message: "Server configuration error." });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login successful"
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required." });
        }

        const normalizedEmail = String(email).trim().toLowerCase();

        if (!EMAIL_RE.test(normalizedEmail)) {
            return res.status(400).json({ message: "Enter a valid email address." });
        }

        if (String(password).length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters." });
        }

        const existingUser = await UserModel.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            name: String(name).trim(),
            email: normalizedEmail,
            password: hashPassword
        });

        // Was returning the full `user` doc, which includes the bcrypt
        // hash of the password — no reason for the client to ever see
        // that, hashed or not.
        const safeUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };

        return res.status(201).json({
            message: "User created successfully",
            user: safeUser
        });

    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const getMe = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    Login,
    Register,
    getMe
};
