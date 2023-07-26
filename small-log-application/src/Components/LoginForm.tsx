import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { LoginContext } from "../Context/LoginAuthContext";

/**
 * a component allows the users to enter their usernames and passwords
 * @returns
 */
export const LoginForm = () => {
  const { logIn } = useContext(LoginContext);
  const [username, setUsername] = useState("x");
  const [password, setPassword] = useState("y");

  const handleSubmit = (formEvent: React.FormEvent) => {
    console.log("FormEvent", formEvent);
    logIn(username, password);
    formEvent.preventDefault();
  };
  return (
    <Box
      height={"100vh"}
      component="form"
      sx={{
        m: 1,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
      onSubmit={handleSubmit}
    >
      <Stack spacing={4}>
        <h1>Login</h1>
        <TextField
          sx={{ width: "300px" }}
          label="Username"
          autoComplete="on"
          variant="outlined"
          name="User"
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          sx={{ width: "300px" }}
          label="Password"
          variant="outlined"
          autoComplete="off"
          type="password"
          name="Pass"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ m: 1, height: 55, width: 100 }}
        >
          Log In
        </Button>
      </Stack>
    </Box>
  );
};
