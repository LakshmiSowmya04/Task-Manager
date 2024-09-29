const User = require("../models/User");

const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const newUser = new User({ email, username, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User not found. Please register.",
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, MY_future_JWT_SECRET_IN_ENV, {
        expiresIn: "2h",
    });

    res.json({ token });
};

module.exports = {
    registerUser,
    loginUser,
};
