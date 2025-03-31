"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react"
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: {
    roomId: string
}) {

    const [socket, setSocket] = useState<WebSocket | null>(null);

    

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhiMWFiN2M5LWNlMzgtNGUxZC04ZDZjLWJlOGJmYzkxYTI5YyIsImlhdCI6MTc0MzQyMzQzNiwiZXhwIjoxNzQzNTA5ODM2fQ.jSh3WupuQHz6nmJ98sNj_joasQjEk2mxqwVcaF4lY6Y`);
        
        ws.onopen = () => { 
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId  
            }))
        }
    }, []);

    if (!socket) {
        return <>
            <div>
                Connecting to server....
            </div>
        </>
    }

    return (
        <>
            <Canvas roomId={roomId} socket={socket}/>
        </>
    )
}