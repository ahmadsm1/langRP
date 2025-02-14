import { Trash2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
interface DeleteIconProps {
    onClick: () => void;
}

export function DeleteIcon({ onClick }: DeleteIconProps) {
    return (
        <TooltipProvider delayDuration={10}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Trash2 
                        className="h-5 w-5 cursor-pointer" 
                        color="#cb2c2a"
                        onClick={onClick}/>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}