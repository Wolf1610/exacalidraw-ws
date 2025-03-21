import { useEffect, useState } from "react";
import { WS_URL } from "../config";


export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();
    
    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc4MjE4MThjLTI1NTctNGIwOS04ZTc5LTI2ZjE0MzVlNDRjOSIsImlhdCI6MTc0MjQ5NjE3NywiZXhwIjoxNzQyNTgyNTc3fQ.BiUXugzaef6RhTxW_ATnsNub87Zr-L-tkIr3REWKO5Q`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);


    return {
        socket,
        loading
    }
}