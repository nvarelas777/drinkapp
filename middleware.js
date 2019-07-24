const jwt = require('jsonwebtoken');

const secret = process.env.DB_TOKEN;

const withAuth = function(req, res, next) {
  console.log(secret);
    const token = 
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
  
    if (!token) {
      console.log('Unauthorized: No token provided');
      res.status(401).send('Unauthorized: No token provided');
    } else {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          res.status(401).send('Unauthorized: Invalid token');
          console.log('Unauthorized: Invalid token');
        } else {
          req.email = decoded.email;
          next();
        }
      });
    }
  }
  
module.exports = withAuth;