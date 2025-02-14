import * as React from "react"
import { useState } from "react"

import { DeleteIcon } from "@/components/icons/delete";
import { EditIcon } from "@/components/icons/edit";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { AddCharPopover } from "./character_popover";

class Character {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

export function CardWithForm() {
  const LANGS = ["urdu", "french"];
  
  const {toast} = useToast();

  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [addCharOpen, setAddCharOpen] = useState(false);
  
  const handleStartClick = () => {
    if (description != "" && language != "" && characters.length > 0) {
      console.log(description, language, characters);
    }
    else {
      console.log("Please fill out all fields.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter all the fields.",
      });
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Start scene</CardTitle>
        <CardDescription>Choose your scene settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Description</Label>
              <Input id="description" placeholder="coffee shop, bookstore, etc" 
              onChange={(e) => setDescription(e.target.value)} required/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Language</Label>
              <Select onValueChange={setLanguage} value={language}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {LANGS.map((lang, index) => (
                    <SelectItem key={index} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Characters</Label>
              {characters.map((character, index) => (
                <div key={index} className="flex justify-between items-center border p-2 rounded-lg">
                  <div className="flex flex-col">
                    <span className="font-medium">{character.name}</span>
                    <Label className="text-sm text-gray-500">{character.description}</Label>
                  </div>
                  <div className="flex gap-2">
                    <EditIcon />
                    <DeleteIcon onClick={() => setCharacters(characters.filter((_, i) => i !== index))} />
                  </div>
                </div>
              ))}
              
              <AddCharPopover 
                onCharacterAdd={(character: Character) => setCharacters([...characters, character])}
                open={addCharOpen}
                onOpenChange={setAddCharOpen}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleStartClick}>Start</Button>
      </CardFooter>
    </Card>
  )
}
