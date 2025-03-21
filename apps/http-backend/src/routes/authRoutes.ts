
import express, { Router } from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { client } from "@repo/db/client";

import middleware from "../middleware/middleware";
import { JWT } from "@repo/backend-common/config";
import {createRoomSchema, schemaValidation} from "@repo/common/types";

const authRouter: Router = express.Router();
// const client = new PrismaClient();


type UserRequest = {
    username: string;
    password: string;
}

authRouter.post("/signup", async (req: Request, res: Response): Promise<Response | any> => {
    try {
        const parseDataWithSuccess = schemaValidation.safeParse(req.body);
        if(!parseDataWithSuccess.success) {
            return res.json({
                message: "Incorrect Format"
            })
        }
        
        const { username, password } = req.body as UserRequest;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const existingUser = await client.user.findUnique({
            where: { username }
        });
        
        if(existingUser) {
            return res.status(409).json({
                message: "Username already exist."
            })
        } else {
            await client.user.create({
                data: {
                    username,
                    password: hashedPassword
                }
            })
            res.json({
                message: "you are successfully signed up."
            })
        }
    } catch (error) {
        console.error("Signin Error:", error);
        return res.status(500).json({ message: "Internal server error." });

    } finally {
        await client.$disconnect(); 
    }
});
authRouter.post("/signin", async (req: Request, res: Response): Promise<Response| any> => {
    
    try {
        const { username, password } = req.body as { username: string; password: string; };
        const response = await client.user.findFirst({
            where: {
                username
            }
        });

        console.log(response?.password);

        if(!response) {
            return res.status(403).json({
                message: "User not exist."
            });
        }

        const passwordMatch = await bcrypt.compare(password, response.password);
        if(passwordMatch) {
            const token = jwt.sign({
                id: response.id.toString()
            }, JWT as string, { expiresIn: "1d" });
            res.status(200).json({
                message: "User successfully Signed In.",
                token
            })
        } else {
            res.status(403).json({
                message: "User credential Wrong."
            })
        }

        

    } catch (error) {
        console.error("Signin Error:", error);
        return res.status(500).json({ message: "Internal server error." });

    } finally {
        await client.$disconnect(); 
    }

});

authRouter.post("/room",middleware as any , async (req: Request, res: Response): Promise<Response| any> => {

    try {
        const parsedData = createRoomSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.json({
                message: "Incorrect inputs"
            })
            return
        }    

        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User ID is missing"
            });
        }


       try {
            const room = await client.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })
        return res.json({
            message: "Room created successfully",
            roomId: room.id
        })
       } catch (error) {
            res.json({
                message: "Room already exists with this name"
            })
       }

        
    } catch (error) {
        console.error("Error creating room:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
    
});


authRouter.get("/chat/:roomId", async (req: Request, res: Response): Promise<Response| any> => {
    try {
        const roomId = Number(req.params.roomId);
        const messages = await client.chat.findMany({
            where: {
                roomId: roomId
            }, 
            orderBy: {
                id: "desc"
            },
            take: 50
        });

        res.json({
            messages
        })
    } catch (error) {
        console.log(error);
        res.json({
            message: "Error in /chat/:rooId endpoint."
        })
    }

});

authRouter.get("/room/:slug", async (req: Request, res: Response): Promise<Response| any> => {
    try {
        const slug = req.params.slug;
        const room = await client.room.findFirst({
            where: {
                slug
            }
        })
        res.json({
            room
        })
    } catch (error) {
        res.json({
            message: "Error in /room/:slug endpoint"
        })
    }

})

export default authRouter;

