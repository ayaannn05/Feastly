import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token not found, please login" });
    }

    // 2. Verify token using JWT_SECRET
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(403).json({ message: "Token verification failed" });
    }
    // console.log(decodedToken);
    // 3. Attach userId to request so controllers can use it
    req.userId = decodedToken.id;

    // 4. Continue to the next middleware
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res
      .status(500)
      .json({ message: "Authentication error", error: error.message });
  }
};

export default isAuth;
