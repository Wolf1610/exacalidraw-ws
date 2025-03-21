import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChatRoom } from "../components/ChatRoom";


export default function Home() {

  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div>
        <input 
          type="text" 
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
          placeholder="Enter room name"
        />
        <button
          onClick={() => {
            router.push(`/room/${roomId}`)
          }}
        >Join room</button>
        <ChatRoom id={roomId}/>
    </div>
  );
}
