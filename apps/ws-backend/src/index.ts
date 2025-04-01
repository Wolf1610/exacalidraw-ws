import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT } from "@repo/backend-common/config"
import { client } from "@repo/db/client"; 

const wss = new WebSocketServer({ port: 8080 });

function checkUser (token: string): string | null {
    
    try {
        const decoded = jwt.verify(token, JWT) as JwtPayload;

        // console.log(decoded.id);

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
    // console.log(userId);
    
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

        let parsedData;


        if(typeof data !== "string") {
            
            parsedData = JSON.parse(data.toString());
            // console.log(parsedData);
        } else {
            parsedData = JSON.parse(data);
        }

        // console.log(parsedData);

        // let y = JSON.parse(parsedData)
        // let x = y;
        // // let z = JSON.stringify(y);
        // // console.log(JSON.parse(parsedData));
        // // console.log("x type----->>>>>",typeof x);
        // // console.log("x----->>>>>",x.message);
        // // if(!x.message.shape) return  null;
        
        // if(!x.message) return  null;
        
        // let finalDrawData = JSON.parse(x.message);
        // console.log("Final Draw Data ---->>>", finalDrawData.shape);
        // console.log("Final Draw Data ---->>>", JSON.stringify(finalDrawData.shape));

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
            // console.log(Number(roomId));

            console.log(roomId);

            const message = parsedData.message;
            // const message = JSON.stringify(parsedData.message);
            console.log(message);

            // Do it -> Better approach
            // msg push it to a queue, through a pieline push it to DB eventually

            // Dumb approach is
            // First store all msg in the db
            // let drawMessaage = JSON.parse(message.message);
            // console.log("From chat", drawMessaage);


            const room = await client.room.findUnique({
                where: { id: Number(roomId) }
            });
            
            if (!room) {
                console.error("Room does not exist:", roomId);
                return;
            }
            

            try {
                const res = await client.chat.create({
                    data: {
                        roomId: Number(roomId),
                        message,
                        userId
                    }                
                })
    
                console.log("inside res---->>>>", res);
            } catch (error) {
                console.log("Error from client.chat------>>>", error);                
            }
            

            // find that userId, those are subscribe to that roomId, send them all msg from db

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






/*

console.log("parsedData Above---->>>", parsedData);
            let aparse = data.toString();
            let b = JSON.parse(aparse);
            let c = b;
            if(!c.message) return  null;
            let finalDrawData = JSON.parse(c.message);
            console.log("Final Draw Data ---->>>", finalDrawData.shape);
            console.log("Final Draw Data ---->>>", JSON.stringify(finalDrawData.shape));



*/