import { prisma } from '../../configs/db.config.js';
import { generateHash } from '../../utils/helper.util.js';
import jwt from 'jsonwebtoken';

const { sign } = jwt;

export const authenticationHandler = async (req, res, next) => {
    const { user, pwd } = req.body;

    if (!user || !pwd ) return res.status(400).json({})
    const foundUser = await prisma.cMS_User.findFirst({
        where: {
            "Email":user,
        }
    });

    if (!foundUser) return res.sendStatus(401);

    const userId = foundUser.UserGUID;
    const hashedPWD = generateHash(pwd + userId);

    if (hashedPWD === foundUser.UserPassword) {

        const accessToken = sign(
            {"username":foundUser.UserName},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'10m'}
        );

        const refreshToken = sign(
            {"username":foundUser.UserName},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'3h'}
        );

        //save refreshToken to db


        //send refresh token via httpOnly token (not accessible via js)
        res.cookie('jwt-ncbm', refreshToken, { httpOnly:true, maxAge: 24*60*60*1000})
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}
