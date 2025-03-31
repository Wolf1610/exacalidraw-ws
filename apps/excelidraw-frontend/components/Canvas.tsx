
"use client";

import { initDraw } from "@/draw";
import { useEffect, useRef } from "react"

export function Canvas({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if(canvasRef.current) {
            initDraw(canvasRef.current, roomId, socket);
        }
    }, [canvasRef]);

    return (
        <>
            <canvas ref={canvasRef} width={1742} height={842}></canvas>
        </>
    )
}