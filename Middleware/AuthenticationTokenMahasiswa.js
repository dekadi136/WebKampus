import "dotenv/config";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

export async function authenticationTokenMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  console.log(token);

  if (!token || token.trim() == "") {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const verifiedToken = jwt.verify(token, secret);

    console.log(verifiedToken);

    if (!verifiedToken || !verifiedToken.id) {
      return res.status(500).json({ error: "Invalid token" });
    }

    req.user = {
      id: verifiedToken.id,
      name: verifiedToken.name,
      email: verifiedToken.email,
      type: verifiedToken.type,
      role: verifiedToken.role,
    };

    console.log(req.user);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token expired, please login again" });
    }
    console.log("Error authorize", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export function allowRoles(allowedType = [], allowedRole = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const type = req.user.type;
    const role = req.user.role;

    if (allowedType.length > 0 && !allowedType.includes(type)) {
      return res.status(403).json({ error: "Access denied: wrong type" });
    }

    if (allowedRole.length > 0 && (!role || !allowedRole.includes(role))) {
      return res.status(403).json({ error: "Access denied: wrong role" });
    }

    next();
  };
}
