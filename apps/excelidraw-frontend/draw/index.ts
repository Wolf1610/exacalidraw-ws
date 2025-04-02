import { HTTP_BACKEND } from "@/config";
import axios from "axios";


type Shape = {
    type: "rectangle",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "circle",
    centerX: number,
    centerY: number,
    radius: number
} | {
    type: "pencil",
    startX: number,
    startY: number,
    endX: number
}


export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {

    const ctx = canvas.getContext("2d");
            
    let existingShapes: Shape[] = await getExistingShapes(roomId);

    // console.log(existingShapes);


    if(!ctx) {
        return
    }


    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);


        if (message.type == "chat") {
            const parsedShape = JSON.parse(message.message);
            // Similarlly in react like if state varaible (existingShatps) changes then re-render the components 
            existingShapes.push(parsedShape.shape);
            clearCanvas(existingShapes, canvas, ctx); // re-render the new shapes with existing shapes
        }
    }



    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "rgb(18, 18, 18)";
    clearCanvas(existingShapes, canvas, ctx);


    let clicked = false;
    let startX = 0, startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    })
    
    
    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        // @ts-ignore
        const selectedTool = window.selectedTool;
        let shape: Shape | null = null; 
        if (selectedTool === "rectangle") {
            shape = {
                type: "rectangle",
                x: startX,
                y: startY,
                height,
                width
            }
        } else if (selectedTool === "circle") {
            const radius = Math.max(width, height) / 2 ;
            shape = {
                type: "circle",
                radius: radius,
                centerX: startX + radius,
                centerY: startY + radius
            }
            
        }
        if(!shape) return;
        console.log("shape---->>>", shape);
        existingShapes.push(shape);
        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId
        }))

    })

    
    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;                    
            clearCanvas(existingShapes, canvas, ctx);
            ctx.strokeStyle = "rgb(255, 255, 255)";
            // @ts-ignore
            const selectedTool = window.selectedTool;
            if (selectedTool === "rectangle") {
                ctx.strokeRect(startX, startY, width, height);
            }
            else if (selectedTool === "circle") {
                const centerX = startX + width / 2;
                const centerY = startY + height / 2;
                const radius = Math.max(width, height) / 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
                ctx.stroke();
                ctx.closePath();
            }
           
        }
    })

    
}

// first render the all the existing shapes

function clearCanvas (
    existingShapes: Shape[],
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(!existingShapes) {
        return null;
    }

    // console.log(existingShapes);

    existingShapes.map((shape) => {
        if (shape.type === "rectangle") {
            ctx.strokeStyle = "rgba(255, 255, 255)";
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === "circle") {
            ctx.beginPath();
            ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2)
            ctx.stroke();
            ctx.closePath();
        }
    })
}

// getExistingShapes fn is hitting the backend, getting all the existing shapes from thre
// converting them string to object and returning it
async function getExistingShapes(roomId: string): Promise<Shape[]> {
    try {
        const res = await axios.get(`${HTTP_BACKEND}/auth/chat/${roomId}`);
        const messages = res.data.messages || [];

        if (!Array.isArray(messages)) {
            console.error("Invalid messages format:", messages);
            return [];
        }

        return messages
            .map((x: { message: string }) => {
                try {
                    const messageData = JSON.parse(x.message);
                    return messageData.shape || null;
                } catch (err) {
                    console.error("Error parsing message:", x.message, err);
                    return null;
                }
            })
            .filter((shape): shape is Shape => shape !== null); 
    } catch (error) {
        console.error("Error in getExistingShapes function:", error);
        return [];
    }
}

// async function getExistingShapes(roomId: string) {
//     try {
//         const res = await axios.get(`${HTTP_BACKEND}/auth/chat/${roomId}`);
//         // console.log(res);
//         const messages = res.data.messages;
//         const shapes = messages.map((x: { message: string }) => {
//             const messageData = JSON.parse(x.message);
//             console.log(messageData);
//             return messageData.shape;
//         })
//         return shapes;
//     } catch (error) {
//         console.log("Error in getExistingShapes function _-------->> ", error);
//     }
// }