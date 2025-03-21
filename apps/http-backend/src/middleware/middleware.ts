import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT } from "@repo/backend-common/config";

const middleware = (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.headers.authorization;
        console.log(token);   
        if (!token) {
            return res.status(401).json({ message: "Access Denied: Invalid Token Format" });
        }
        const decoded = jwt.verify(token, JWT as string);
        console.log(decoded);
        if (!decoded || typeof decoded === "string" || !decoded.id) {
            return res.status(403).json({ message: "Invalid Token" });
        } else {
            req.userId = decoded.id;
        }
        next();

    } catch (error) {
        return res.status(403).json({ message: "Error in middleware" });
    }
}

export default middleware;