const jwt = require("jsonwebtoken");

const createJWT = ({ payload }: { payload: object }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isJwtTokenValid = ({ token }: { token: string }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// const attachCookiesToResponse = ({ res, user }) => {
//   const token = createJWT({ payload: user });

//   const oneDay = 1000 * 60 * 60 * 24;
//   res.cookie("token", token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === "production",
//     signed: true,
//   });
//   return;
// };

export { createJWT, isJwtTokenValid /*, attachCookiesToResponse */ };
