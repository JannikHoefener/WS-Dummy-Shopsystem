import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";

/**
 * A Component that reads JSON file and create the right Form for a new Product or a new User    
 * @returns 
 */
export const ProductUserDynamicForm = () => {
  return (
    <>
      <Stack spacing={5} m={3} direction="row" justifyContent={"center"}>
        <Button variant="contained">Add new Product</Button>
        <Button variant="contained">Create new User</Button>
      </Stack>
      <Box textAlign="center">
        <Button disabled variant="contained">
          Submit
        </Button>
      </Box>
    </>
  );
};
