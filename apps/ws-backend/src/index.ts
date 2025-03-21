import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT } from "@repo/backend-common/config"
import { client } from "@repo/db/client"; 

const wss = new WebSocketServer({ port: 8080 });

function checkUser (token: string): string | null {
    
    try {
        const decoded = jwt.verify(token, JWT) as JwtPayload;

        console.log(decoded.id);

        if(typeof decoded == "string") {
            return null;
        }

        if (!decoded || !decoded.id) {
            return null;
        }

        return decoded.id;
    } catch (error) {
        return null;    
    }
}


interface User {
    ws: WebSocket;
    rooms: string[];
    userId: string;
}

const users: User[] = []; 

wss.on("connection", function connection(ws, request) {

    const url = request.url;

    // console.log(url);

    if(!url) {
        return;
    }

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    // console.log(token);
    const userId = checkUser(token);    
    console.log(userId);
    
    if (!userId) {
        ws.close();
        return null;
    }

    users.push({
        userId,
        rooms: [],
        ws
    });    
 

    ws.on("message", async function message(data) {

        const parsedData = JSON.parse(data as unknown as string);

        if (parsedData.type === "join_room") {
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parsedData.roomId);
        }

        if (parsedData.type === "leave_room") {
            const user = users.find(x => x.ws === ws);
            if (!user) {
                return;
            }
            // remove that specific roomId from that room
            user.rooms = user.rooms.filter(x => x === parsedData.room);
        }

        if (parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            // Do it -> Better approach
            // msg push it to a queue, through a pieline push it to DB eventually

            // Dumb approach is
            await client.chat.create({
                data: {
                    roomId,
                    message,
                    userId
                }
            })

            users.forEach(user => {
                if (user.rooms.includes(roomId)) {

                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }))

                }
            })
        }

    });

}); 