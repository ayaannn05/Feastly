import jwt from "jsonwebtoken";
const getToken = async (userId) => {
  try {
    const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    return token;
  } catch (err) {
    console.log(err);
    res.stsatus(400).json({
      status: "fail",
      message: `err`,
    });
  }
};

export default getToken;
