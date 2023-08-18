import { generateHash } from "../../utils/helper.util.js";
import { prisma } from "../../configs/db.config.js";
import winstonLogger from "../../middleware/logging.middleware.js";
import { v4 as uuidv4 } from 'uuid';

export const register = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) return res.status(400).json({error: 'username and password are required'});

    //check for duplicate usernames
    const existingUser = await prisma.cMS_User.findFirst({
        where: {
            "Email":username,
        }
    });

    if (existingUser) return res.sendStatus(409);

    try {
        //add user to db and capture the new guid
        let date = new Date();

        const { UserGUID } = await prisma.cMS_User.create({
            data: {
                "Email":username,
                "UserName":username,
                "UserGUID":uuidv4(),
                "UserLastModified":date.toISOString().slice(0, 19).replace('T', ' '),
            }
        });

        if (!UserGUID) return res.status(500).json({message:'failed to create user'});

        let hashedPWD = generateHash(password+UserGUID);
        const { UserPassword } = await prisma.cMS_User.update({
            where:{
                UserGUID,
            },
            data: {
                "UserPassword":hashedPWD
            }
        });

        if (!UserPassword) return res.status(500).json({message:'failed to store pwd hash'});

        return res.status(200).json({message:'registration success'});  

    } catch (err) {
        winstonLogger.error(err);
        res.status(500).json({message:'registration failed'})
    }
}