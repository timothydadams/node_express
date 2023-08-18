import jwt from 'jsonwebtoken';
const { verify } = jwt;

export const verifyJWT = (req, res, next) => {

    const header = req.headers['authorization'];

    if (!header) return res.sendStatus(401);

    const token = header.split(' ')[1];
    
    verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            if (err) return res.status(403).json({error:"forbidden"});
            req.user = decoded.username;
            next();
        }
    );
}