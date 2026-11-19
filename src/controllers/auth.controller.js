import userModel from "../model/user.schema.js";
import tokenBlacklist from "../model/tokenblacklist.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Controller for register
export async function registerController(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    const isUserExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExist) {
      return res.status(409).json({
        msg: "User already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_KEY,
      { expiresIn: "1d" },
    );

    return res
      .cookie("token", token)
      .status(201)
      .json({
        msg: "Successfully registered",
        user: {
          id: user._id,
          name: user.username,
          email: user.email,
        },
      });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
}
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        msg: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Invalid email or password",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        msg: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_KEY,
      { expiresIn: "1d" },
    );

    return res
      .cookie("token", token)
      .status(200)
      .json({
        msg: "Successfully logged in",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function logoutController(req, res) {
  try {
    const token = req.cookies.token;

    if (token) {
      await tokenBlacklist.create({ token });
    }

    return res.clearCookie("token").status(200).json({
      msg: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export async function getmeController(req, res) {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    return res.status(200).json({
      msg: "Successfully fetched user data",
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      msg: "Internal server error",
    });
  }
}
