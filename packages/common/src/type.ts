import { z } from "zod";

export const schemaValidation = z.object({
    username: z.string().min(1, "User name is required"),
    password: z.string()
});


export const createRoomSchema = z.object({
    name: z.string().min(3).max(20)
})

export const JWT="weroii2903r4ierekefpweerkerrwewrfd"