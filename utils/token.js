import jwt from "jsonwebtoken";

const generateToken = (payload) => {
  return jwt.sign(payload, "secret", {
    expiresIn: "24h",
  });
};

const validateToken = (token) => {
  if (token) {
    const verification = jwt.verify(token, "secret", (error, data) => {
      if (data) {
        return {
          data: data,
        };
      }
      if (error) {
        return {
          error: error,
        };
      }
    });
    return verification;
  }
};

export { generateToken, validateToken };
