
export default function initDraw(canvas: HTMLCanvasElement) {

    const ctx = canvas.getContext("2d");
            

            if(!ctx) {
                return
            }


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(18, 18, 18)";
    


    let clicked = false;
    let startX = 0, startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    })
    
    
    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        console.log(e.clientX);
        console.log(e.clientY);
    })

    
    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;                    
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "rgb(255, 255, 255)";
            ctx.strokeRect(startX, startY, width, height);
        }
    })

    
}