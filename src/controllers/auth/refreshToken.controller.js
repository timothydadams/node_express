import { prisma } from '../../configs/db.config.js';
import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;

export const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt-ncbm) return res.sendStatus(401);

    const refreshToken = cookies.ncbm-jwt;

    const foundUser = await prisma.cMS_User.findFirst({
        where: {
            refreshToken,
        }
    });

    if (!foundUser) return res.sendStatus(403);

    verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = sign(
                { username: decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"10m"}
            )
            res.json({accessToken});
        }
    )

}
