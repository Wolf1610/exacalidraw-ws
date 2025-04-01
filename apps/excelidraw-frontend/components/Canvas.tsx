"use client";

import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontal, Triangle } from "lucide-react";

type ShapeType = "rectangle" | "circle" | "pencil" | "triangle";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<ShapeType>("pencil");

  // this is easiest way to share state between react and initDraw(game logic)
  useEffect(() => {
    //@ts-ignore
    window.selectedTool = selectedTool;
  }, [selectedTool]);

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef]);

  return (
    <>
      <TopBar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
      <div
        style={{
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
        ></canvas>
      </div>
    </>
  );
}

function TopBar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: ShapeType;
  setSelectedTool: (s: ShapeType) => void;
}) {
  return (
    <>
      <div
        style={{
        backgroundColor: "black",
          position: "fixed",
          top: 10,
          left: 10,
        }}
      >
        {/* Components */}
        <div className="flex gap-3">
          <IconButton
            activated={selectedTool === "pencil"}
            icon={<Pencil />}
            onClick={() => {
              setSelectedTool("pencil");
            }}
          />
          <IconButton
            activated={selectedTool === "circle"}
            icon={<Circle />}
            onClick={() => {
              setSelectedTool("circle");
            }}
          />
          <IconButton
            activated={selectedTool === "triangle"}
            icon={<Triangle />}
            onClick={() => {
              setSelectedTool("triangle");
            }}
          />
          <IconButton
            activated={selectedTool === "rectangle"}
            icon={<RectangleHorizontal />}
            onClick={() => {
              setSelectedTool("rectangle");
            }}
          />
        </div>
      </div>
    </>
  );
}
