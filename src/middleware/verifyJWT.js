import jwt from 'jsonwebtoken';
const { verify } = jwt;

export const verifyJWT = (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) return res.sendStatus(401);
    console.log(header);
    const token = header.split(' ')[1];
    verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded.username;
            next();
        }
    );
}