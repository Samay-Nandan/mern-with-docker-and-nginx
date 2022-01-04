import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    if( token && isCustomAuth ) {

      const decodedInfo = jwt.verify(token, JWT_SECRET);

      req.userId = decodedInfo.id

    } else {

      const decodedInfo = jwt.decode(token);

      req.userId = decodedInfo.sub

    }

    next();
    
  } catch (error) {
    console.log(error);
  }
};

export default auth;
