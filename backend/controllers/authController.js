import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import getToken from "../utils/token.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    if (mobile.length !== 10) {
      return res
        .status(400)
        .json({ message: "Mobile number must be 10 digits long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      role,
    });

    const token = await getToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 10 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(201).json({
      status: "success",
      message: "User Registered Successfully",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Doesn't Exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = await getToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 10 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      message: "User Logged In Successfully",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

export const signOut = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    status: "success",
    message: "User Signed Out Successfully",
  });
};
