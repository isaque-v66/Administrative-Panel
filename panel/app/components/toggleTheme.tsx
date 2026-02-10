'use client'

import { Button } from "@/components/ui/button";
import { useTheme } from "../contexts/theme-context";
import { Moon, Sun } from "lucide-react";



export function ToggleTheme() {
    const {theme, toggleTheme} = useTheme()


    return(
        <div className="fixed bottom-4 right-4">

        <Button className="rounded-3xl" onClick={toggleTheme}>
            {theme === "light" ? (<Moon />) : (<Sun />)}
        </Button>
        </div>
    )
}