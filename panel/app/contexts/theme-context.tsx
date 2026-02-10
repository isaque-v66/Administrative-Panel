'use client'

import { createContext, useContext, useEffect, useState } from "react"




type Theme = "dark" | "light"

interface ThemeType {
    theme: Theme
    toggleTheme: () => void
}


const ThemeContext = createContext<ThemeType | null>(null)


export function ThemeProvider({children}: {children: React.ReactNode}) {
    const [theme, setTheme] = useState<Theme>('light')

    function toggleTheme(){
        setTheme(prev => prev === "dark" ? "light" : 'dark')
    }

    useEffect(() => {
        const html = document.documentElement

        if(theme === "dark") {
            html.classList.add("dark")
        } else {
            html.classList.remove("dark")
        }

        localStorage.setItem("theme", theme)

    }, [theme])


    useEffect(() => {
        const getItem = localStorage.getItem("theme")

        if(!getItem) {
            throw new Error("Sem theme")
        }
    }, [])



    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )


}


export function useTheme() {
    const context = useContext(ThemeContext)
    if(!context) throw new Error("Theme precisa ser passado no provider")
        return context
}