const User = require("../models/User");

//user login controller
exports.login = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ success: false, error: "Username is required", data: null });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "User not found", data: null });
    }
    return res
      .status(200)
      .json({ success: true, message: "Login successful", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Error logging in user", data: null });
  }
};


//user register controller
exports.register = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ success: false, error: "Username is required", data: null });
  }

  try {
    const user = new User({
      username,
      userId: new Date().getTime().toString(),
    });
    await user.save();
    res
      .status(201)
      .json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ success: false, error: "Username already exists", data: null });
    }
    res
      .status(500)
      .json({ success: false, error: "Error registering user", data: null });
  }
};
