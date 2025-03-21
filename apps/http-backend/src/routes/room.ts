
import express, { Router } from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import middleware from "../middleware/middleware";

const roomRouter: Router = express.Router();
const client = new PrismaClient();

// @ts-ignore
roomRouter.post("/", middleware, (req: Request, res:Response) => {
    
    res.json({
        message: "Room id"
    })

});

export default roomRouter;