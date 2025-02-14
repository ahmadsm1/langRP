import * as React from "react"
import { useState } from "react"
import * as PopoverPrimitive from '@radix-ui/react-popover';
const PopoverClose = PopoverPrimitive.Close;

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


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

  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState(LANGS[0]);
  const [characters, setCharacters] = useState<Character[]>([]);


  const handleAddCharacter = () => {
    const name = document.getElementById("character_name") as HTMLInputElement;
    const desc = document.getElementById("character_desc") as HTMLInputElement;
    if (name && desc) {
      const newCharacter = new Character(name.value, desc.value);
      setCharacters([...characters, newCharacter]);
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
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="urdu">Urdu</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Characters</Label>
              <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Add</Button>
              </PopoverTrigger>
                <PopoverContent>
                  Describe your character
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
                    <PopoverClose asChild>
                      <Button onClick={handleAddCharacter}>Add</Button>
                      </PopoverClose>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => console.log(characters)}>Start</Button>
      </CardFooter>
    </Card>
  )
}
