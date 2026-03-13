import { themeContext } from "@/context/ThemeContextProvider";
import { useContext } from "react";

export function useTheme(){
    const context = useContext(themeContext)
    if(!context) throw new Error("useTheme must be used inside ThemeProvider")
    return context
}