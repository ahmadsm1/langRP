import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

class Character {
    name: string;
    description: string;
  
    constructor(name: string, description: string) {
      this.name = name;
      this.description = description;
    }
  }

export interface AddCharacterProps {
  onCharacterAdd: (character: Character) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCharPopover({ onCharacterAdd, open, onOpenChange }: AddCharacterProps) {
  const {toast} = useToast();

  const handleAddCharacter = () => {
    const name = document.getElementById("character_name") as HTMLInputElement;
    const desc = document.getElementById("character_desc") as HTMLInputElement;
    
    if (name && desc && name.value != "" && desc.value != "") {
      const newCharacter = new Character(name.value, desc.value);
      onCharacterAdd(newCharacter);
      onOpenChange(false);
      return true;
    }
    else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter both a name and description for the character.",
      });
      return false;
    }
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline">Add</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-2">
          <div>
              <Label htmlFor="character_name">Name</Label>
              <Input
                id="character_name"
                placeholder="e.g: John Doe"
                />
          </div>
          <div>
            <Label htmlFor="character_desc">Description</Label>
            <Input
              id="character_desc"
              placeholder="e.g: A customer waiting in line"
              />
          </div>
              <Button onClick={handleAddCharacter} data-testid="add-character-button" >Add</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}