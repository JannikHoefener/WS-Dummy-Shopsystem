import { ThemeContext } from "@emotion/react";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useContext } from "react";

export default function FunctionContextComponent() {
  const darkTheme = useContext(ThemeContext);

  const themeStyles = {
    backgroundColor: darkTheme ? "#333" : "#CCC",
    color: darkTheme ? "CCC" : "#333",
  };
  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="DarkTheme"
        />
      </FormGroup>
    </div>
  );
}

