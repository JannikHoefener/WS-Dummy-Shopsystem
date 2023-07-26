import React from "react";
import { useContext, useState } from "react";

/* !!!!!
vieles macht für mich aktuell kein Sinn
Später erneut versuchen wenn DarkTheme wirklich implementiert werden soll
aktuell nur provisorisch 
!!!!! */

const prop: any = "Test";

// Context erstellen
const ThemeContext = React.createContext(prop);
const ThemeUpdateContext = React.createContext(prop); //neuer Context fürs Update

// Provider Props 
// => props: any

// Provider
export default function ToggleThemeProvider(children: any) {
  const [darkTheme, setDarkTheme] = useState(true);

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
      {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  )
}
