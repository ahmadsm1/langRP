import { Pencil } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
export function EditIcon() {
    return (
        <TooltipProvider delayDuration={10}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Pencil className="h-5 w-5 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Edit</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}