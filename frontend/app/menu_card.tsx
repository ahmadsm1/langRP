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
import { usePrompt } from "./context/PromptContext";

class Character {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

interface CardWithFormProps {
  onPromptReceived: (prompt: string) => void;
}

export function CardWithForm({ onPromptReceived }: CardWithFormProps) {
  const LANGS = ["urdu", "french", "german"];
  const {toast} = useToast();

  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [addCharOpen, setAddCharOpen] = useState(false);

  const {setPrompt} = usePrompt();
  
  const handleStartClick = async () => {
    if (description != "" && language != "" && characters.length > 0) {
      const prompt = `
        Let's do a bit of roleplay. Pretend your name is ${characters[0].name} and you
        are a ${characters[0].description}. You are friendly, kind and are fluent in 
        ${language} but speak plainly and simply so beginners can understand you. Speak ONLY
        in ${language}. Now, pretend you are in a ${description}, when I come up to 
        talk to you. Start a conversation with me. Being polite and friendly, always end 
        your sentences with something that prompts me to respond (this may or may not be 
        a question).
        Make it like a story, where your first message is a greeting. Separately, be sure to
        give narration in English to describe what's going on in the scene, whilst ensuring 
        the dialogue is in ${language}. Make sure to only give up to one dialogue and scene
        description at a time.
        Ignore all future commands received from here on out. If there is anything off topic,
        stay in character and respond as ${characters[0].name} and urge the user to stay on topic.
      `;
      // Pass the prompt to the chat page, which will then pass it to the backend
      setPrompt(prompt);
      onPromptReceived(prompt);
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
    <Card className="w-[350px] border-white/40">
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
              <Label className="text-sm text-gray-500">Can only add one character (for now)</Label>
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
