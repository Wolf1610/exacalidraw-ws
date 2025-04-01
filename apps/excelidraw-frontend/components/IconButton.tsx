import { ReactNode } from "react";

export function IconButton({
    icon,
    onClick,
    activated
}: {
    icon: ReactNode;
    onClick: () => void
    activated: boolean
}) {    
    
    return (
        <>
            <div 
                className={`cursor-pointer rounded-full border p-2 text-red-600 ${activated ? "text-red-600" : "text-white"}`}
                onClick={onClick}
            >
                {icon}
            </div>
        </>
    )
}